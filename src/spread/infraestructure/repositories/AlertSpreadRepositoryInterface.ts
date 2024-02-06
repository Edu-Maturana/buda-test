import { Spread } from "../../domain/models/Spread";

interface AlertSpreadRepositoryInterface {
  setAlertSpread(spread: Spread): void;
  getAlertSpread(): Spread | null;
}

export default AlertSpreadRepositoryInterface;
