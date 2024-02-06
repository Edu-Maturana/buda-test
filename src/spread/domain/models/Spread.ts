export type SpreadValue = number;
export type Market = string;

export class Spread {
  public readonly value: SpreadValue;
  public readonly market: Market;

  constructor(value: SpreadValue, market: Market) {
    this.value = value;
    this.market = market;
  }
}
