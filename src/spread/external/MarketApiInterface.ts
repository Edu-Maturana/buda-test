interface MarketApiInterface {
  getMarketOrders(market: string): Promise<any>;
}

export default MarketApiInterface;
