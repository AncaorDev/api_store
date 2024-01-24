import { Module } from '@nestjs/common';
import { CurrencyExchangeController } from './currency-exchange.controller';
import { CurrencyExchangeService } from './currency-exchange.service';

@Module({
  controllers: [CurrencyExchangeController],
  providers: [CurrencyExchangeService],
})
export class CurrencyExchangeModule {}
