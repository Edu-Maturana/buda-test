import { Request, Response } from "express";
import SpreadService from "../../application/services/SpreadService";
import SpreadControllerInterface from "./SpreadControllerInterface";
import { Market } from "../../domain/value-objects/SpreadValueObjects";
import { Spread } from "../../domain/models/Spread";

class SpreadController implements SpreadControllerInterface {
  constructor(private readonly spreadService: SpreadService) {}

  async getSpread(req: Request, res: Response): Promise<void> {
    const market = req.params.market as Market;
    const spread = await this.spreadService.calculateSpread(market);
    res.json(spread);
  }

  async getAllSpreads(req: Request, res: Response): Promise<void> {
    const spreads = await this.spreadService.getAllSpreads();
    res.json(spreads);
  }

  async setAlertSpread(req: Request, res: Response): Promise<void> {
    const spread = new Spread(req.body.value, req.body.market);
    this.spreadService.setAlertSpread(spread);
    res.json({ message: "Alert spread set" });
  }

  async pollAlertSpread(req: Request, res: Response): Promise<void> {
    const alertSpread = await this.spreadService.pollAlertSpread();

    if (!alertSpread) {
      res.status(404).json({ message: "No alert spread set" });
      return;
    }

    res.json(alertSpread);
  }
}

export default SpreadController;
