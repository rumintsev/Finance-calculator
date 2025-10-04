'use client';

import styles from './Calc.module.css';
import { useState } from 'react';
import { calcDepositProfit, calcFundProfit } from '../lib/calc';

export default function Calc() {
  const [amount, setAmount] = useState(100_000);
  const [depositRate, setDepositRate] = useState(15.5);
  const [fundRate, setFundRate] = useState(17);
  const [months, setMonths] = useState(1);
  const [taxFreeAmount, setTaxFreeAmount] = useState(210_000);
  const [earnedThisYear, setEarnedThisYear] = useState(0);
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
    earnedThisYear: earnedThisYear,
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
          <p>Initial amount</p>
          <div className={styles.inputBlock}>
            ${' '}
            <input
              type='text'
              value={amount.toLocaleString('ru-RU', { maximumFractionDigits: 0 })}
              onChange={(e) => {
                const cleanValue = e.target.value.replace(/\s/g, '');
                setAmount(Number(cleanValue))
              }}
            />
          </div>
        </div>
        <div className={styles.field}>
          <p>Start date</p>
          <div className={styles.dateBlock}>
            <input
              type='date'
              value={startDate.toISOString().slice(0, 10)}
              onChange={handleDateChange}
            />
          </div>
        </div>

        <div className={styles.field}>
          <p>Term</p>
          <div className={styles.inputBlock}>
            <input
              type='number'
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
            />
            {' '}months
          </div>
        </div>

        <div className={styles.field}>
          <p>Annual interest rate on deposit</p>
          <div className={styles.inputBlock}>
            <input
              type='number'
              step='0.01'
              value={depositRate}
              onChange={(e) => setDepositRate(Number(e.target.value))}
            />
            {' '}%
          </div>
        </div>

        <div className={styles.field}>
          <p>Annual interest rate on the fund</p>
          <div className={styles.inputBlock}>
            <input
              type='number'
              step='0.01'
              value={fundRate}
              onChange={(e) => setFundRate(Number(e.target.value))}
            />
            {' '}%
          </div>
        </div>

        <div className={styles.field}>
          <p>Tax-free deposit limit per year</p>
          <div className={styles.inputBlock}>
            $ <input
              type='text'
              value={taxFreeAmount.toLocaleString('ru-RU', { maximumFractionDigits: 0 })}
              onChange={(e) => {
                const cleanValue = e.target.value.replace(/\s/g, '');
                setTaxFreeAmount(Number(cleanValue))
              }
              }
            />
          </div>
        </div>

        <div className={styles.field}>
          <p>Earned on deposit this year</p>
          <div className={styles.inputBlock}>
            $ <input
              type='text'
              value={earnedThisYear.toLocaleString('ru-RU', { maximumFractionDigits: 0 })}
              onChange={(e) => {
                const cleanValue = e.target.value.replace(/\s/g, '');
                setEarnedThisYear(Number(cleanValue))
              }}
            />
          </div>
        </div>

        <div className={styles.field}>
          <p>Income tax</p>
          <div className={styles.inputBlock}>
            <input
              type='number'
              step='0.01'
              value={fundTaxRate}
              onChange={(e) => setFundTaxRate(Number(e.target.value))}
            />
            {' '}%
          </div>
        </div>
      </div>

      <div className={styles.results}>
        <p>
          Deposit: <b>$ {depositProfit.toLocaleString('ru-RU', {
            maximumFractionDigits: 0
          })}</b>
        </p>
        <p>
          Fund: <b>$ {fundProfit.toLocaleString('ru-RU', {
            maximumFractionDigits: 0
          })}</b>
        </p>
        <p>
          Difference:{' '}
          <b>$ {Math.abs((fundProfit - depositProfit)).toLocaleString('ru-RU', {
              maximumFractionDigits: 0
            })}{' '}
            {fundProfit - depositProfit >= 0.5 ? '(the fund is more profitable)' : depositProfit - fundProfit >= 0.5 ? '(deposit is more profitable)' : '(same)'}
          </b>
        </p>
      </div>
    </div >
  );
};