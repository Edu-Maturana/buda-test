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
    const spreadValue = orders.buy - orders.sell;
    return new Spread(spreadValue);
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
