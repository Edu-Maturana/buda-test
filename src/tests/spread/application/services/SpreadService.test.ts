import SpreadService from "../../../../core/spread/application/services/SpreadService";
import { MockMarketProvider } from "../../mocks/MockMarketProvider";
import { MockAlertSpreadRepository } from "../../mocks/MockAlertSpreadRepository";

describe("Spread service", () => {
  let spreadService: SpreadService;

  beforeEach(() => {
    const mockMarketProvider = new MockMarketProvider();
    const mockAlertSpreadRepository = new MockAlertSpreadRepository();
    spreadService = new SpreadService(
      mockMarketProvider,
      mockAlertSpreadRepository
    );
  });

  describe("calculateSpread", () => {
    it("should calculate spread", async () => {
      const spread = await spreadService.calculateSpread("btc-clp");
      expect(spread.value).toBe(2);
    });

    it("should handle no bids or asks", async () => {
      const spread = await spreadService.calculateSpread("btc-ars");
      expect(spread.value).toBe(0);
    });

    it("should handle equal bids and asks", async () => {
      const spread = await spreadService.calculateSpread("eth-clp");
      expect(spread.value).toBe(0);
    });
  });

  describe("getAllSpreads", () => {
    it("should call getAllMarkets method of marketProvider", async () => {
      const getAllMarketsSpy = jest.spyOn(
        spreadService.marketProvider,
        "getAllMarkets"
      );

      await spreadService.getAllSpreads();

      expect(getAllMarketsSpy).toHaveBeenCalledTimes(1);
    });

    it("should calculate spread for each market", async () => {
      const markets = await spreadService.marketProvider.getAllMarkets();
      const calculateSpreadSpy = jest.spyOn(spreadService, "calculateSpread");

      await spreadService.getAllSpreads();

      markets.forEach((market) => {
        expect(calculateSpreadSpy).toHaveBeenCalledWith(market);
      });
    });
  });

  describe("setAlertSpread and pollAlertSpread", () => {
    it("should set and poll alert spread", async () => {
      spreadService.setAlertSpread({ value: 1, market: "btc-clp" });

      const alertSpread = await spreadService.pollAlertSpread();
      expect(alertSpread).not.toBeNull();
      expect(alertSpread?.isGreaterThanAlertSpread).toBe(true);

      spreadService.setAlertSpread({ value: 3, market: "btc-clp" });

      const alertSpread2 = await spreadService.pollAlertSpread();
      expect(alertSpread2?.isGreaterThanAlertSpread).toBe(false);
    });

    it("should handle no alert spread", async () => {
      const alertSpread = await spreadService.pollAlertSpread();
      expect(alertSpread).toBeNull();
    });
  });
});
