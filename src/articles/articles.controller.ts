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
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ArticleService } from './articles.service';

@Controller('product')
export class ArticlesController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('save-product')
  @ApiOperation({
    description: 'Crea o actualiza un articulo de tipo producto',
  })
  @ApiBadRequestResponse({ description: 'Si la `categoria` no existe' })
  async saveProduct(@Body() request: any): Promise<any> {
    console.log('request', request);
    const qrCodeDataURL = await this.articleService.generateQrCode(
      request.code,
    );
    return `<img src="${qrCodeDataURL}" alt="QR Code" />`;
  }

  @Get('ping')
  @ApiOkResponse({
    description: 'Mensaje para saber si el servicio está ejecutándose',
  })
  pong(): Observable<string> {
    return of(`Pong :: ${new Date().toISOString()} :: Articles`);
  }

  @Get('/')
  async listProduct(@Query() query): Promise<Observable<any>> {
    const data = await this.articleService.listProduct(query);
    data.map((row) => {
      row['item'] = row.id_product;
      row['store'] = row.Store.name;
      row['type'] = row.TypeProduct.description;
      row['mark'] = row.MarkProduct.name;
      row['clasification'] = row.ClasificationProduct.description;
    });
    return data;
  }

  @Post('/')
  async createProduct(@Body() request: any): Promise<Observable<any>> {
    try {
      const data = await this.articleService.createProduct(request);
      const qrCodeDataURL = await this.articleService.generateQrCode(data.uuid);
      await this.articleService.updateProduct(data.id_product, {
        qr_code: qrCodeDataURL,
      });
      return data;
    } catch (error) {
      console.log('error', error);
    }
  }

  @Put('/:id')
  async updateProduct(
    @Body() request: any,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Observable<any>> {
    try {
      const data = await this.articleService.updateProduct(id, request);
      return data;
    } catch (error) {
      console.log('error', error);
    }
  }

  @Delete('/:id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<any> {
    try {
      const data = await this.articleService.removeProduct(id);
      return data;
    } catch (error) {
      console.log('error', error);
    }
  }

  // TYPES PRODUCT CRUD
  @Get('/types_product')
  async listTypesProduct(@Query() query): Promise<Observable<any>> {
    const data = await this.articleService.listTypesProduct(query);
    return data;
  }

  @Post('/types_product')
  async createTypesProduct(@Body() request: any): Promise<Observable<any>> {
    const data = await this.articleService.createTypesProduct(request);
    return data;
  }

  @Put('/types_product/:id')
  async updateTypesProduct(
    @Body() request: any,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Observable<any>> {
    const data = await this.articleService.updateTypesProduct(id, request);
    return data;
  }

  @Delete('/types_product/:id')
  async removeTypesProduct(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    const data = await this.articleService.removeTypesProduct(id);
    return data;
  }

  // MARK PRODUCT CRUD
  @Get('/mark_product')
  async markTypesProduct(@Query() query): Promise<Observable<any>> {
    const data = await this.articleService.listMarkProduct(query);
    return data;
  }

  @Post('/mark_product')
  async createMarkProduct(@Body() request: any): Promise<Observable<any>> {
    const data = await this.articleService.createMarkProduct(request);
    return data;
  }

  @Put('/mark_product/:id')
  async updateMarkProduct(
    @Body() request: any,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Observable<any>> {
    const data = await this.articleService.updateMarkProduct(id, request);
    return data;
  }

  @Delete('/mark_product/:id')
  async removeMarkProduct(@Param('id', ParseIntPipe) id: number): Promise<any> {
    const data = await this.articleService.removeMarkProduct(id);
    return data;
  }

  @Get('/clasification_product')
  async clasificationTypesProduct(@Query() query): Promise<Observable<any>> {
    const data = await this.articleService.listClasificationProduct(query);
    data.map((row) => {
      row['type_product'] = row.TypeProduct.description;
    });
    return data;
  }

  @Post('/clasification_product')
  async createClasificationProduct(
    @Body() request: any,
  ): Promise<Observable<any>> {
    const data = await this.articleService.createClasificationProduct(request);
    return data;
  }

  @Put('/clasification_product/:id')
  async updateClasificationProduct(
    @Body() request: any,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Observable<any>> {
    const data = await this.articleService.updateClasificationProduct(
      id,
      request,
    );
    return data;
  }

  @Delete('/clasification_product/:id')
  async removeClasificationProduct(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    const data = await this.articleService.removeClasificationProduct(id);
    return data;
  }

  @Get('/store')
  async store(@Query() query): Promise<Observable<any>> {
    const data = await this.articleService.listStore(query);
    return data;
  }

  @Post('/store')
  async createStore(@Body() request: any): Promise<Observable<any>> {
    const data = await this.articleService.createStore(request);
    return data;
  }

  @Put('/store/:id')
  async updateStore(
    @Body() request: any,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Observable<any>> {
    const data = await this.articleService.updateStore(id, request);
    return data;
  }

  @Delete('/store/:id')
  async removeStore(@Param('id', ParseIntPipe) id: number): Promise<any> {
    const data = await this.articleService.removeStore(id);
    return data;
  }
}
