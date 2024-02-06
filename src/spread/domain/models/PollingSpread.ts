import { Spread } from "./Spread";

export class PollingSpread {
  public readonly currentSpread: Spread;
  public readonly savedSpread: Spread | null;
  public readonly isGreaterThanAlertSpread: boolean;

  constructor(
    currentSpread: Spread,
    savedSpread: Spread | null,
    isGreaterThanAlertSpread: boolean
  ) {
    this.currentSpread = currentSpread;
    this.savedSpread = savedSpread;
    this.isGreaterThanAlertSpread = isGreaterThanAlertSpread;
  }
}
