import { Request, Response } from "express";
import SpreadService from "../../application/services/SpreadService";
import SpreadControllerInterface from "./SpreadControllerInterface";
import { Market } from "../../domain/value-objects/SpreadValueObjects";
import { Spread } from "../../domain/models/Spread";

class SpreadController implements SpreadControllerInterface {
  constructor(private readonly spreadService: SpreadService) {}

  async getSpread(req: Request, res: Response): Promise<void> {
    try {
      const market = req.params.market as Market;
      const spread = await this.spreadService.calculateSpread(market);
      res.json(spread);
    } catch (error: any) {
      res.status(404).json({ message: "Market not found" });
    }
  }

  async getAllSpreads(req: Request, res: Response): Promise<void> {
    try {
      const spreads = await this.spreadService.getAllSpreads();
      res.json(spreads);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async setAlertSpread(req: Request, res: Response): Promise<void> {
    try {
      const { market, value } = req.body;
      const spread = new Spread(value, market);
      this.spreadService.setAlertSpread(spread);
      res.json({ message: "Alert spread set" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async pollAlertSpread(req: Request, res: Response): Promise<void> {
    try {
      const alertId = parseInt(req.params.id);
      const alertSpread = await this.spreadService.pollAlertSpread(alertId);

      if (!alertSpread) {
        res.status(404).json({ message: "No alert spread set" });
        return;
      }

      res.json(alertSpread);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAlertSpreads(req: Request, res: Response): Promise<void> {
    try {
      const alertSpreads = this.spreadService.getAlertSpreads();
      res.json(alertSpreads);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default SpreadController;
