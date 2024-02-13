import { Spread } from "../../domain/models/Spread";
import AlertSpreadRepositoryInterface from "./AlertSpreadRepositoryInterface";

class AlertSpreadRepository implements AlertSpreadRepositoryInterface {
  private alertSpreads: Spread[] = [];
  private autoIncId: number = 0;

  setAlertSpread(spread: Spread): void {
    spread.id = this.autoIncId++;
    this.alertSpreads.push(spread);
  }

  getAlertSpread(id: number): Spread | null {
    return this.alertSpreads.find((spread) => spread.id === id) || null;
  }

  getAlertSpreads(): Spread[] {
    return this.alertSpreads;
  }
}

export default AlertSpreadRepository;
