import { Market } from "../../../core/spread/domain/value-objects/SpreadValueObjects";
import { MarketProviderInterface } from "../../../core/spread/external/market-provider/MarketProviderInterface";
import { MarketOrderBookResponse } from "../../../core/spread/external/market-provider/MarketProviderInterface";

export class MockMarketProvider implements MarketProviderInterface {
  async getMarketOrders(market: Market): Promise<MarketOrderBookResponse> {
    const marketOrdersMap: Record<string, MarketOrderBookResponse> = {
      "btc-clp": {
        order_book: {
          asks: [["102", "10"]],
          bids: [["100", "8"]],
        },
      },
      "eth-clp": {
        order_book: {
          asks: [["100", "10"]],
          bids: [["100", "10"]],
        },
      },
      "btc-ars": {
        order_book: {
          asks: [],
          bids: [],
        },
      },
    };

    return marketOrdersMap[market];
  }

  async getAllMarkets(): Promise<Market[]> {
    return ["btc-clp", "eth-clp", "btc-ars"];
  }
}
