import { Spread } from "../../domain/models/Spread";

interface AlertSpreadRepositoryInterface {
  setAlertSpread(spread: Spread): void;
  getAlertSpread(id: number): Spread | null;
}

export default AlertSpreadRepositoryInterface;
