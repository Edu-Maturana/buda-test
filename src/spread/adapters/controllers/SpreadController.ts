import { Request, Response } from "express";
import SpreadService from "../../application/services/SpreadService";
import SpreadControllerInterface from "./SpreadControllerInterface";

class SpreadController implements SpreadControllerInterface {
  constructor(private readonly spreadService: SpreadService) {}

  async getSpread(req: Request, res: Response): Promise<void> {
    const market = req.params.market as string;
    const spread = await this.spreadService.calculateSpread(market);
    res.json({ spread: spread.getValue() });
  }

  async getAllSpreads(req: Request, res: Response): Promise<void> {}

  async setAlertSpread(req: Request, res: Response): Promise<void> {}

  async pollAlertSpread(req: Request, res: Response): Promise<void> {}
}

export default SpreadController;
