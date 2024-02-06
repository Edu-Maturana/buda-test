import { Request, Response } from "express";
import SpreadService from "../../application/services/SpreadService";
import SpreadControllerInterface from "./SpreadControllerInterface";
import { Market } from "../../domain/models/Spread";

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

  async setAlertSpread(req: Request, res: Response): Promise<void> {}

  async pollAlertSpread(req: Request, res: Response): Promise<void> {}
}

export default SpreadController;
