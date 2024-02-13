import { Spread } from "../../domain/models/Spread";
import { LogsApiInterface } from "../../external/logs/LogsApiInterface";
import AlertSpreadRepositoryInterface from "./AlertSpreadRepositoryInterface";

class AlertSpreadRepository implements AlertSpreadRepositoryInterface {
  private alertSpreads: Spread[] = [];
  private autoIncId: number = 0;

  constructor(public readonly logsApi: LogsApiInterface) {}

  setAlertSpread(spread: Spread): void {
    spread.id = this.autoIncId++;
    this.alertSpreads.push(spread);
  }

  getAlertSpread(id: number): Spread | null {
    const alertSpread =
      this.alertSpreads.find((spread) => spread.id === id) || null;
    this.log(alertSpread);
    return alertSpread;
  }

  getAlertSpreads(): Spread[] {
    return this.alertSpreads;
  }

  private log(payload?: any): void {
    this.logsApi.registerCall(payload);
  }
}

export default AlertSpreadRepository;
