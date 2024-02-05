import axios from "axios";
import { MarketApiInterface, MarketOrderResponse } from "./MarketApiInterface";

class BudaApi implements MarketApiInterface {
  async getMarketOrders(market: string): Promise<MarketOrderResponse> {
    const response = await axios.get(
      `https://www.buda.com/api/v2/markets/${market}/order_book`
    );

    return response.data;
  }
}

export default BudaApi;
