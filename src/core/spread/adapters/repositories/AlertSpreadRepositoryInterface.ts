import { Spread } from "../../domain/models/Spread";

interface AlertSpreadRepositoryInterface {
  setAlertSpread(spread: Spread): void;
  getAlertSpread(id: number): Spread | null;
  getAlertSpreads(): Spread[];
}

export default AlertSpreadRepositoryInterface;
