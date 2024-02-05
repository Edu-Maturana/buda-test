import axios from "axios";
import MarketApiInterface from "./MarketApiInterface";

class BudaApi implements MarketApiInterface {
  async getMarketOrders(market: string): Promise<any> {
    const response = await axios.get(
      `https://www.buda.com/api/v2/markets/${market}/order_book`
    );

    return response.data.order_book;
  }
}

export default BudaApi;
