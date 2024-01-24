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
import { PermissionService } from './permission.service';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permission: PermissionService) {}

  @Get('ping')
  @ApiOkResponse({
    description: 'Mensaje para saber si el servicio está ejecutándose',
  })
  pong(): Observable<string> {
    return of(`Pong :: ${new Date().toISOString()} :: Movements`);
  }

  @Get('/')
  async listPermission(@Query() query): Promise<Observable<any>> {
    const data = await this.permission.listPermission(query);
    return data;
  }

  @Post('/')
  async createPermission(@Body() request: any): Promise<Observable<any>> {
    console.log('request', request);
    const data = await this.permission.createPermission(request);
    return data;
  }

  @Put('/:id')
  async updatePermission(
    @Body() request: any,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Observable<any>> {
    const data = await this.permission.updatePermission(id, request);
    return data;
  }

  @Delete('/:id')
  async removePermission(@Param('id', ParseIntPipe) id: number): Promise<any> {
    const data = await this.permission.removePermission(id);
    return data;
  }
}
