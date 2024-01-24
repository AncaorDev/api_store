import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CurrencyExchangeService } from './currency-exchange.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('currency-exchange')
export class CurrencyExchangeController {
  constructor(
    private readonly currencyExchangeService: CurrencyExchangeService,
  ) {}

  @Get('calculate')
  @UseGuards(JwtAuthGuard)
  calculateExchange(
    @Query('amount') amount: number,
    @Query('fromCurrency') fromCurrency: string,
    @Query('toCurrency') toCurrency: string,
  ) {
    return this.currencyExchangeService.calculateExchange(
      amount,
      fromCurrency,
      toCurrency,
    );
  }
}
