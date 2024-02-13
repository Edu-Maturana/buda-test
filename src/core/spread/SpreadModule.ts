import express, { Router } from "express";
import SpreadController from "./adapters/controllers/SpreadController";
import SpreadService from "./application/services/SpreadService";
import BudaApi from "./external/market-provider/BudaApi";
import AlertSpreadRepository from "./adapters/repositories/AlertSpreadRepository";
import LogsApi from "./external/logs/LogsApi";
import { LogsApiInterface } from "./external/logs/LogsApiInterface";

class SpreadModule {
  private router: Router;
  private spreadService!: SpreadService;
  private alertSpreadRepository!: AlertSpreadRepository;
  private spreadController!: SpreadController;
  private logsApi!: LogsApiInterface;
  private budaApi!: BudaApi;

  constructor() {
    this.setupDependencies();
    this.router = this.setupRouter();
  }

  private setupDependencies(): void {
    this.logsApi = new LogsApi();
    this.alertSpreadRepository = new AlertSpreadRepository(this.logsApi);
    this.budaApi = new BudaApi();
    this.spreadService = new SpreadService(
      this.budaApi,
      this.alertSpreadRepository
    );
    this.spreadController = new SpreadController(this.spreadService);
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
