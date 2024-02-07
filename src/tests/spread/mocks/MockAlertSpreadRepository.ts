import AlertSpreadRepositoryInterface from "../../../core/spread/adapters/repositories/AlertSpreadRepositoryInterface";
import { Spread } from "../../../core/spread/domain/models/Spread";

export class MockAlertSpreadRepository
  implements AlertSpreadRepositoryInterface
{
  private alertSpread: Spread | null = null;

  setAlertSpread(alertSpread: Spread): void {
    this.alertSpread = alertSpread;
  }

  getAlertSpread(): Spread | null {
    return this.alertSpread;
  }
}
