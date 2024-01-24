import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { ApiOkResponse } from '@nestjs/swagger';
import { MovementsService } from './movements.service';

@Controller('movements')
export class MovementsController {
  constructor(private readonly movements: MovementsService) {}

  @Get('ping')
  @ApiOkResponse({
    description: 'Mensaje para saber si el servicio está ejecutándose',
  })
  pong(): Observable<string> {
    return of(`Pong :: ${new Date().toISOString()} :: Movements`);
  }

  @Get('/')
  async listMovements(@Query() query): Promise<Observable<any>> {
    const data = await this.movements.listMovements(query);
    data.map((row) => {
      row['guide_code'] = 'GR' + row.guide_remition.toString().padStart(6, 0);
      row['product'] = row.Product.description;
      row['item'] = row.Product.id_product;
      row['store'] = row.Product.Store.name;
      row['type'] = row.Product.TypeProduct.description;
      row['mark'] = row.Product.MarkProduct.name;
      row['unit'] = row.Product.unit;
      row['measure'] = row.Product.measure;
      row['qr_code'] = row.Product.qr_code;
      row['clasification'] = row.Product.ClasificationProduct.description;
    });
    return data;
  }

  @Post('/')
  async createMovements(@Body() request: any): Promise<Observable<any>> {
    console.log('request', request);
    const data = await this.movements.createMovements(request.form);
    return data;
  }

  @Put('/:id')
  async updateMovements(
    @Body() request: any,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Observable<any>> {
    const data = await this.movements.updateMovements(id, request);
    return data;
  }

  @Delete('/:id')
  async removeMovements(@Param('id', ParseIntPipe) id: number): Promise<any> {
    const data = await this.movements.removeMovements(id);
    return data;
  }

  @Get('/dashboard')
  async dashbaord(@Query() query): Promise<any> {
    const data = await this.movements.dashboardMovements(query);
    return data;
  }

  @Get('/dashboard2')
  async dashboard2(@Query() query): Promise<any> {
    const data = await this.movements.dashboardMovements2(query);
    return data;
  }
}
