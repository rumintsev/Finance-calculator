import { calcDepositProfit, calcFundProfit } from "../src/lib/calc";

describe("calcDepositProfit", () => {
  test("Deposit within the tax-free limit 1 month", () => {
    const options = {
      amount: 100_000,
      rate: 12,
      months: 1,
      taxRate: 10,
      taxFreeAmount: 1000,
      startDate: new Date("2025-01-01"),
      earnedThisYear: 0,
    };

    const result = calcDepositProfit(options);

    expect(Math.round(result)).toBe(101_000);
  });

  test("Deposit within the tax-free limit 10 month", () => {
    const options = {
      amount: 100_000,
      rate: 12,
      months: 10,
      taxRate: 10,
      taxFreeAmount: 11_000,
      startDate: new Date("2025-01-01"),
      earnedThisYear: 0,
    };

    const result = calcDepositProfit(options);

    expect(Math.round(result)).toBe(110_462);
  });

  test("Deposit outside the tax-free limit", () => {
    const options = {
      amount: 100_000,
      rate: 12,
      months: 2,
      taxRate: 10,
      taxFreeAmount: 1000,
      startDate: new Date("2025-01-01"),
      earnedThisYear: 0,
    };

    const result = calcDepositProfit(options);

    expect(Math.round(result)).toBe(101_909);
  });

  test("Resetting the tax-free limit in the new year", () => {
    const options = {
      amount: 100_000,
      rate: 12,
      months: 3,
      taxRate: 10,
      taxFreeAmount: 1000,
      startDate: new Date("2025-10-01"),
      earnedThisYear: 0,
    };

    const result = calcDepositProfit(options);

    expect(Math.round(result)).toBe(102_926);
  });

  test("Something has already been earned on the deposit", () => {
    const options = {
      amount: 100_000,
      rate: 12,
      months: 1,
      taxRate: 13,
      taxFreeAmount: 1000,
      startDate: new Date("2025-01-01"),
      earnedThisYear: 600,
    };

    const result = calcDepositProfit(options);

    expect(Math.round(result)).toBe(100_922);
  });

  test("Boundary case: zero rate", () => {
    const options = {
      amount: 100_000,
      rate: 0,
      months: 12,
      taxRate: 13,
      taxFreeAmount: 500,
      startDate: new Date("2025-01-01"),
      earnedThisYear: 0,
    };

    const result = calcDepositProfit(options);

    expect(result).toBe(100_000);
  });

  test("Boundary case: zero months", () => {
    const options = {
      amount: 100_000,
      rate: 10,
      months: 0,
      taxRate: 13,
      taxFreeAmount: 500,
      startDate: new Date("2025-01-01"),
      earnedThisYear: 0,
    };

    const result = calcDepositProfit(options);

    expect(result).toBe(100_000);
  });
});

describe("calcFundProfit", () => {
  test("Correct calculation of profit from the fund", () => {
    const options = {
      amount: 100_000,
      rate: 17,
      months: 3,
      taxRate: 15,
    };

    const result = calcFundProfit(options);

    expect(Math.round(result)).toBe(103_656);
  });

  test("Boundary case: 100% tax rate", () => {
    const options = {
      amount: 100_000,
      rate: 12,
      months: 17,
      taxRate: 100,
    };

    const result = calcFundProfit(options);

    expect(result).toBe(100_000);
  });
});