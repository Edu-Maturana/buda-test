import { MarketApiInterface } from "../../external/MarketApiInterface";
import Spread from "../../domain/models/Spread";
import SpreadServiceInterface from "./SpreadServiceInterface";

class SpreadService implements SpreadServiceInterface {
  constructor(
    private readonly marketApi: MarketApiInterface,
    // TODO: Tipar
    private readonly alertSpreadRepository: any
  ) {}

  async calculateSpread(market: string): Promise<Spread> {
    const orders = await this.marketApi.getMarketOrders(market);
    const highestBid = orders.order_book.bids[0][0];
    const lowestAsk = orders.order_book.asks[0][0];
    const spread: number = parseFloat(lowestAsk) - parseFloat(highestBid);

    return new Spread(spread);
  }

  async getAllSpreads(): Promise<Spread[]> {
    const allMarkets = await this.marketApi.getAllMarkets();
    const spreadPromises = allMarkets.map((market) =>
      this.calculateSpread(market)
    );
    const spreads = await Promise.all(spreadPromises);

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
