import axios from "axios";
import { MarketApiInterface, MarketOrderResponse } from "./MarketApiInterface";

class BudaApi implements MarketApiInterface {
  apiURL: string = "https://www.buda.com/api/v2";
  async getMarketOrders(market: string): Promise<MarketOrderResponse> {
    const response = await axios.get(
      `${this.apiURL}/markets/${market}/order_book`
    );

    return response.data;
  }

  async getAllMarkets(): Promise<string[]> {
    const response = await axios.get(`${this.apiURL}/markets`);

    return response.data.markets.map((market: any) => market.name);
  }
}

export default BudaApi;
