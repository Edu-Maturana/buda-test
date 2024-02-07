import { Market } from "../../../core/spread/domain/value-objects/SpreadValueObjects";
import { MarketProviderInterface } from "../../../core/spread/external/MarketProviderInterface";
import { MarketOrderBookResponse } from "../../../core/spread/external/MarketProviderInterface";

export class MockMarketProvider implements MarketProviderInterface {
  async getMarketOrders(market: Market): Promise<MarketOrderBookResponse> {
    return {
      order_book: {
        bids: [
          ["100", "10"],
          ["99", "20"],
        ],
        asks: [
          ["102", "15"],
          ["103", "25"],
        ],
      },
    };
  }

  async getAllMarkets(): Promise<Market[]> {
    return ["btc-clp", "eth-clp"];
  }
}
