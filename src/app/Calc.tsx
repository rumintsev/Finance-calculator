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
          <p>Начальная сумма</p>
          <div className={styles.inputBlock}>
            <input
              type='text'
              value={amount.toLocaleString('ru-RU', { maximumFractionDigits: 0 })}
              onChange={(e) => {
                const cleanValue = e.target.value.replace(/\s/g, '');
                setAmount(Number(cleanValue))
              }}
            />
            {' '}₽
          </div>
        </div>
        <div className={styles.field}>
          <p>Дата начала</p>
          <div className={styles.dateBlock}>
            <input
              type='date'
              value={startDate.toISOString().slice(0, 10)}
              onChange={handleDateChange}
            />
          </div>
        </div>

        <div className={styles.field}>
          <p>Срок</p>
          <div className={styles.inputBlock}>
            <input
              type='number'
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
            />
            {' '}мес
          </div>
        </div>

        <div className={styles.field}>
          <p>Ставка вклада (годовая)</p>
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
          <p>Ставка фонда (годовая)</p>
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
          <p>Безналоговый лимит вклада в год</p>
          <div className={styles.inputBlock}>
            <input
              type='text'
              value={taxFreeAmount.toLocaleString('ru-RU', { maximumFractionDigits: 0 })}
              onChange={(e) => {
                const cleanValue = e.target.value.replace(/\s/g, '');
                setTaxFreeAmount(Number(cleanValue))
              }
              }
            />
            {' '}₽
          </div>
        </div>

        <div className={styles.field}>
          <p>Заработано на вкладе в этом году</p>
          <div className={styles.inputBlock}>
            <input
              type='text'
              value={earnedThisYear.toLocaleString('ru-RU', { maximumFractionDigits: 0 })}
              onChange={(e) => {
                const cleanValue = e.target.value.replace(/\s/g, '');
                setEarnedThisYear(Number(cleanValue))
              }}
            />
            {' '}₽
          </div>
        </div>

        <div className={styles.field}>
          <p>Налог на прибыль</p>
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
          Вклад: <b>{depositProfit.toLocaleString('ru-RU', {
            maximumFractionDigits: 0
          })} ₽</b>
        </p>
        <p>
          Фонд: <b>{fundProfit.toLocaleString('ru-RU', {
            maximumFractionDigits: 0
          })} ₽</b>
        </p>
        <p>
          Разница:{' '}
          <b>
            {Math.abs((fundProfit - depositProfit)).toLocaleString('ru-RU', {
              maximumFractionDigits: 0
            })} ₽{' '}
            {fundProfit - depositProfit >= 0.5 ? '(фонд выгоднее)' : depositProfit - fundProfit >= 0.5 ? '(вклад выгоднее)' : '(одинаково)'}
          </b>
        </p>
      </div>
    </div >
  );
};