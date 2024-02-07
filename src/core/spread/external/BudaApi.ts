import axios from "axios";
import {
  MarketProviderInterface,
  MarketOrderBookResponse,
  MarketResponse,
} from "./MarketProviderInterface";
import { Market } from "../domain/value-objects/SpreadValueObjects";

class BudaApi implements MarketProviderInterface {
  apiURL: string = "https://www.buda.com/api/v2";
  marketCache: Market[] = [];

  async getMarketOrders(market: Market): Promise<MarketOrderBookResponse> {
    market = market.toLowerCase();
    const response = await axios.get(
      `${this.apiURL}/markets/${market}/order_book`
    );

    return response.data;
  }

  async getAllMarkets(): Promise<Market[]> {
    if (this.marketCache.length) {
      return this.marketCache;
    }

    const response = await axios.get(`${this.apiURL}/markets`);
    this.marketCache = response.data.markets.map(
      (market: MarketResponse) => market.name
    );

    return this.marketCache;
  }
}

export default BudaApi;
