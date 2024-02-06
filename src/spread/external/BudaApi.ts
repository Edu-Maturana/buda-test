import axios from "axios";
import {
  MarketApiInterface,
  MarketOrderBookResponse,
  MarketResponse,
} from "./MarketApiInterface";

class BudaApi implements MarketApiInterface {
  apiURL: string = "https://www.buda.com/api/v2";
  marketCache: string[] = [];

  async getMarketOrders(market: string): Promise<MarketOrderBookResponse> {
    const response = await axios.get(
      `${this.apiURL}/markets/${market}/order_book`
    );

    return response.data;
  }

  async getAllMarkets(): Promise<string[]> {
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
