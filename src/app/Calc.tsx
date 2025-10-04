"use client";

import styles from "./Calc.module.css";
import { useState } from "react";
import { calcDepositProfit, calcFundProfit } from "../lib/calc";

export default function Calc() {
  const [amount, setAmount] = useState(100_000);
  const [depositRate, setDepositRate] = useState(15.5);
  const [fundRate, setFundRate] = useState(17);
  const [months, setMonths] = useState(1);
  const [taxFreeAmount, settaxFreeAmount] = useState(210_000);
  const [fundTaxRate, setFundTaxRate] = useState(13);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    if (!isNaN(newDate.getTime())) {
      setStartDate(newDate);
    }
  };

  const deposit = {
    amount: amount,
    rate: depositRate,
    months: months,
    taxRate: fundTaxRate,
    taxFreeAmount: taxFreeAmount,
    startDate: startDate,
  };

  const fund = {
    amount: amount,
    rate: fundRate,
    months: months,
    taxRate: fundTaxRate,
  };

  const depositProfit = calcDepositProfit(deposit);
  const fundProfit = calcFundProfit(fund);

  return (
    <div className={styles.calc}>
      <div className={styles.fields}>
        <div className={styles.field}>
          Начальная сумма:{" "}
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          ₽
        </div>
        <div className={styles.field}>
          <input
            type="date"
            value={startDate.toISOString().slice(0, 10)}
            onChange={handleDateChange}
          />
        </div>

        <div className={styles.field}>
          Ставка вклада (годовая):{" "}
          <input
            type="number"
            step="0.01"
            value={depositRate}
            onChange={(e) => setDepositRate(Number(e.target.value))}
          />
          %
        </div>

        <div className={styles.field}>
          Ставка фонда (годовая):{" "}
          <input
            type="number"
            step="0.01"
            value={fundRate}
            onChange={(e) => setFundRate(Number(e.target.value))}
          />
          %
        </div>

        <div className={styles.field}>
          Срок:{" "}
          <input
            type="number"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
          />
          мес
        </div>

        <div className={styles.field}>
          Налоговый лимит в год:{" "}
          <input
            type="number"
            value={taxFreeAmount}
            onChange={(e) => settaxFreeAmount(Number(e.target.value))}
          />
          ₽
        </div>

        <div className={styles.field}>
          Налог на прибыль:{" "}
          <input
            type="number"
            step="0.01"
            value={fundTaxRate}
            onChange={(e) => setFundTaxRate(Number(e.target.value))}
          />
          %
        </div>
      </div>

      <hr />

      <p>
        Итог вклада: <b>{depositProfit.toFixed(2)} ₽</b>
      </p>
      <p>
        Итог фонда: <b>{fundProfit.toFixed(2)} ₽</b>
      </p>
      <p>
        Разница:{" "}
        <b>
          {Math.abs((fundProfit - depositProfit)).toFixed(2)} ₽{" "}
          {fundProfit > depositProfit ? "(фонд выгоднее)" : "(вклад выгоднее)"}
        </b>
      </p>
    </div >
  );
};