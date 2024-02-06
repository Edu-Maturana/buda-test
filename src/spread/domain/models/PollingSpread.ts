import { Spread } from "./Spread";

export class PollingSpread {
  public readonly isGreaterThanSavedSpread: boolean;
  public readonly currentSpread: Spread;
  public readonly savedSpread: Spread | null;

  constructor(
    isGreaterThanSavedSpread: boolean,
    currentSpread: Spread,
    savedSpread: Spread | null
  ) {
    this.isGreaterThanSavedSpread = isGreaterThanSavedSpread;
    this.currentSpread = currentSpread;
    this.savedSpread = savedSpread;
  }
}
