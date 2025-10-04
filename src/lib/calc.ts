type Deposit = {
  amount: number;
  rate: number;
  months: number;
  taxRate: number;
  taxFreeAmount: number;
  startDate: Date;
}

type Fund = {
  amount: number;
  rate: number;
  months: number;
  taxRate: number;
}

export function calcDepositProfit(options: Deposit): number {
  const { amount, rate, months, taxRate, taxFreeAmount, startDate } = options;

  let total = amount;
  let profitGeted = 0;
  let currentDate = new Date(startDate);

  for (let i = 0; i < months; i++) {
    const profit = total * (rate / 100 / 12);
    currentDate.setMonth(currentDate.getMonth() + 1);
    if (currentDate.getFullYear() !== startDate.getFullYear() + Math.floor(i / 12)) {
      profitGeted = 0;
    }
    if (profitGeted > taxFreeAmount) {
      total += profit * (taxRate / 100);
    } else {
      profitGeted += profit;
      if (profitGeted > taxFreeAmount) {
        total += taxFreeAmount + profit - profitGeted;
        total += (profitGeted - taxFreeAmount) * (1 - (taxRate / 100));
        profitGeted = taxFreeAmount;
      } else {
        total += profit;
      }
    }
  }

  return total;
}

export function calcFundProfit(options: Fund): number {
  const { amount, rate, months, taxRate } = options;
  let total = amount;

  for (let month = 1; month <= months; month++) {
    total += total * (rate / 100 / 12) * (1 - taxRate / 100);
  }

  return total;
}