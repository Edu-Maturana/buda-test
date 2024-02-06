import { Spread } from "../../domain/models/Spread";

interface SpreadServiceInterface {
  calculateSpread(market: string): Promise<Spread>;
  getAllSpreads(): Promise<Spread[]>;
  setAlertSpread(alertSpread: number): Promise<void>;
  pollAlertSpread(): Promise<boolean>;
}

export default SpreadServiceInterface;
