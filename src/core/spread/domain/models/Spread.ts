import { Market, SpreadValue } from "../value-objects/SpreadValueObjects";

export class Spread {
  public readonly value: SpreadValue;
  public readonly market: Market;

  constructor(value: SpreadValue, market: Market) {
    this.value = value;
    this.market = market;
  }
}
