import { Request, Response } from "express";

interface SpreadControllerInterface {
  getSpread(req: Request, res: Response): Promise<void>;
  getAllSpreads(req: Request, res: Response): Promise<void>;
  setAlertSpread(req: Request, res: Response): Promise<void>;
  pollAlertSpread(req: Request, res: Response): Promise<void>;
  getAlertSpreads(req: Request, res: Response): Promise<void>;
}

export default SpreadControllerInterface;
