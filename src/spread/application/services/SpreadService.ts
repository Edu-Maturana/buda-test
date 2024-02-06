import { MarketProviderInterface } from "../../external/MarketProviderInterface";
import { Market, Spread } from "../../domain/models/Spread";
import SpreadServiceInterface from "./SpreadServiceInterface";

class SpreadService implements SpreadServiceInterface {
  constructor(
    private readonly marketProvider: MarketProviderInterface,
    // TODO: Tipar
    private readonly alertSpreadRepository: any
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

  async setAlertSpread(alertSpread: number): Promise<void> {
    return;
  }

  async pollAlertSpread(): Promise<boolean> {
    return true;
  }
}

export default SpreadService;
