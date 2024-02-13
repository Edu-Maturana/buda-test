import express, { Router } from "express";
import SpreadController from "./adapters/controllers/SpreadController";
import SpreadService from "./application/services/SpreadService";
import BudaApi from "./external/market-provider/BudaApi";
import AlertSpreadRepository from "./adapters/repositories/AlertSpreadRepository";
import LogsApi from "./external/logs/LogsApi";
import { LogsApiInterface } from "./external/logs/LogsApiInterface";

class SpreadModule {
  private readonly router: Router;
  private readonly spreadController: SpreadController;
  private readonly logsApi: LogsApiInterface;
  private readonly alertSpreadRepository: AlertSpreadRepository;

  constructor() {
    this.logsApi = new LogsApi();
    this.alertSpreadRepository = new AlertSpreadRepository(this.logsApi);
    const spreadService = new SpreadService(
      new BudaApi(),
      this.alertSpreadRepository
    );
    this.spreadController = new SpreadController(spreadService);
    this.router = this.setupRouter();
  }

  private setupRouter(): Router {
    const router = express.Router();

    router.get(
      "/alerts",
      this.spreadController.getAlertSpreads.bind(this.spreadController)
    );
    router.get(
      "/:market",
      this.spreadController.getSpread.bind(this.spreadController)
    );
    router.get(
      "/",
      this.spreadController.getAllSpreads.bind(this.spreadController)
    );
    router.post(
      "/alert",
      this.spreadController.setAlertSpread.bind(this.spreadController)
    );
    router.get(
      "/alert/poll/:id",
      this.spreadController.pollAlertSpread.bind(this.spreadController)
    );

    return router;
  }

  getRouter(): Router {
    return this.router;
  }
}

export default SpreadModule;
