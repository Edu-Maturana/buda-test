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
  });

  describe("getAllSpreads", () => {
    it("should get all spreads", async () => {
      const spreads = await spreadService.getAllSpreads();
      expect(spreads).toHaveLength(2);
    });
  });

  describe("setAlertSpread", () => {
    it("should set alert spread", () => {
      spreadService.setAlertSpread({ value: 2, market: "btc-clp" });
      const alertSpread = spreadService.pollAlertSpread();
      expect(alertSpread).not.toBeNull();
    });
  });

  describe("pollAlertSpread", () => {
    it("should poll alert spread", async () => {
      spreadService.setAlertSpread({ value: 1, market: "btc-clp" });
      const alertSpread = await spreadService.pollAlertSpread();
      expect(alertSpread?.isGreaterThanAlertSpread).toBe(true);

      spreadService.setAlertSpread({ value: 3, market: "btc-clp" });
      const alertSpread2 = await spreadService.pollAlertSpread();
      expect(alertSpread2?.isGreaterThanAlertSpread).toBe(false);
    });
  });
});
