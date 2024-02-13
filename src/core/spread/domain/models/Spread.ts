import { Market, SpreadValue } from "../value-objects/SpreadValueObjects";

export class Spread {
  public readonly value: SpreadValue;
  public readonly market: Market;
  public id?: number;

  constructor(value: SpreadValue, market: Market, id?: number) {
    this.id = id;
    this.value = value;
    this.market = market.toLowerCase();
  }
}
