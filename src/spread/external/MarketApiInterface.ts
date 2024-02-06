export interface MarketApiInterface {
  getMarketOrders(market: string): Promise<MarketOrderBookResponse>;
  getAllMarkets(): Promise<string[]>;
}

export interface MarketOrderBookResponse {
  order_book: {
    asks: Order[];
    bids: Order[];
  };
}

export interface MarketResponse {
  name: string;
}

type Order = [string, string];
