import { PollingSpread } from "../../domain/models/PollingSpread";
import { Spread } from "../../domain/models/Spread";

interface SpreadServiceInterface {
  calculateSpread(market: string): Promise<Spread>;
  getAllSpreads(): Promise<Spread[]>;
  setAlertSpread(alertSpread: Spread): void;
  pollAlertSpread(id: number): Promise<PollingSpread | null>;
  getAlertSpreads(): Spread[];
}

export default SpreadServiceInterface;
