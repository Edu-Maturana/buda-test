import MarketApiInterface from "../../external/MarketApiInterface";
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
    const bestBid = orders.bids[0][0];
    const bestAsk = orders.asks[0][0];
    const spread = bestAsk - bestBid;

    return new Spread(spread);
  }

  async getAllSpreads(): Promise<Spread[]> {
    return [];
  }

  async setAlertSpread(alertSpread: number): Promise<void> {
    return;
  }

  async pollAlertSpread(): Promise<boolean> {
    return true;
  }
}

export default SpreadService;
