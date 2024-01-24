import { Injectable } from '@nestjs/common';

@Injectable()
export class CurrencyExchangeService {
  private exchangeRates = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
  };

  calculateExchange(amount: number, fromCurrency: string, toCurrency: string) {
    const exchangeRate =
      this.exchangeRates[toCurrency] / this.exchangeRates[fromCurrency];
    const exchangedAmount = amount * exchangeRate;

    return {
      amount,
      exchangedAmount,
      fromCurrency,
      toCurrency,
      exchangeRate,
    };
  }
}
