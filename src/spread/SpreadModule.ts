import express, { Router } from "express";
import SpreadController from "./adapters/controllers/SpreadController";
import SpreadService from "./application/services/SpreadService";
import BudaApi from "./external/BudaApi";
// Todo: hacer repo

class SpreadModule {
  private readonly router: Router;
  private readonly spreadController: SpreadController;

  constructor() {
    const spreadService = new SpreadService(
      new BudaApi(),
      //   TODO: Inyectar repositorio correcto xd
      new Map<string, number>()
    );
    this.spreadController = new SpreadController(spreadService);
    this.router = this.setupRouter();
  }

  private setupRouter(): Router {
    const router = express.Router();

    router.get(
      "/spread/:market",
      this.spreadController.getSpread.bind(this.spreadController)
    );
    router.get(
      "/spreads",
      this.spreadController.getAllSpreads.bind(this.spreadController)
    );
    router.post(
      "/alert",
      this.spreadController.setAlertSpread.bind(this.spreadController)
    );
    router.get(
      "/poll-alert",
      this.spreadController.pollAlertSpread.bind(this.spreadController)
    );

    return router;
  }

  getRouter(): Router {
    return this.router;
  }
}

export default SpreadModule;
