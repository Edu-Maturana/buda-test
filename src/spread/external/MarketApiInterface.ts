export interface MarketApiInterface {
  getMarketOrders(market: string): Promise<MarketOrderResponse>;
  getAllMarkets(): Promise<string[]>;
}

export interface MarketOrderResponse {
  order_book: {
    asks: Order[];
    bids: Order[];
  };
}

type Order = [string, string];
