import { Spread } from "../../domain/models/Spread";
import AlertSpreadRepositoryInterface from "./AlertSpreadRepositoryInterface";

class AlertSpreadRepository implements AlertSpreadRepositoryInterface {
  private alertSpread: Spread | null = null;

  setAlertSpread(spread: Spread): void {
    this.alertSpread = spread;
  }

  getAlertSpread(): Spread | null {
    return this.alertSpread;
  }
}

export default AlertSpreadRepository;
