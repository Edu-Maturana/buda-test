import { MarketProviderInterface } from "../../external/MarketProviderInterface";
import { Market } from "../../domain/value-objects/SpreadValueObjects";
import { Spread } from "../../domain/models/Spread";
import SpreadServiceInterface from "./SpreadServiceInterface";
import AlertSpreadRepositoryInterface from "../../adapters/repositories/AlertSpreadRepositoryInterface";
import { PollingSpread } from "../../domain/models/PollingSpread";

class SpreadService implements SpreadServiceInterface {
  constructor(
    public readonly marketProvider: MarketProviderInterface,
    public readonly alertSpreadRepository: AlertSpreadRepositoryInterface
  ) {}

  async calculateSpread(market: Market): Promise<Spread> {
    const orders = await this.marketProvider.getMarketOrders(market);

    if (!orders.order_book.bids.length || !orders.order_book.asks.length) {
      return new Spread(0, market);
    }

    const highestBid = orders.order_book.bids[0][0];
    const lowestAsk = orders.order_book.asks[0][0];

    const spread: number = parseFloat(lowestAsk) - parseFloat(highestBid);

    return new Spread(spread, market);
  }

  async getAllSpreads(): Promise<Spread[]> {
    const allMarkets = await this.marketProvider.getAllMarkets();
    const spreads = await Promise.all(
      allMarkets.map((market: Market) => this.calculateSpread(market))
    );

    return spreads;
  }

  setAlertSpread(alertSpread: Spread): void {
    this.alertSpreadRepository.setAlertSpread(alertSpread);
  }

  async pollAlertSpread(id: number): Promise<PollingSpread | null> {
    const alertSpread = this.alertSpreadRepository.getAlertSpread(id);

    if (!alertSpread) {
      return null;
    }

    const currentSpread = await this.calculateSpread(alertSpread.market);
    const currentSpreadIsGreater = currentSpread.value > alertSpread.value;

    return new PollingSpread(
      currentSpread,
      alertSpread,
      currentSpreadIsGreater
    );
  }
}

export default SpreadService;
