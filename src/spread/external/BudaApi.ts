import axios from "axios";
import MarketApiInterface from "./MarketApiInterface";

class BudaApi implements MarketApiInterface {
  async getMarketOrders(market: string): Promise<any> {
    const response = await axios.get(
      `http://api.buda.com/markets/${market}/order-book`
    );
    return response.data;
  }
}

export default BudaApi;
