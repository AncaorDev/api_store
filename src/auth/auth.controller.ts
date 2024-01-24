import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { Observable, of } from 'rxjs';
import { LoginRequest } from './login.request';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('ping')
  pong(): Observable<string> {
    return of(`Pong :: ${new Date().toISOString()}`);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('login')
  async login(
    @Body() { email, password }: LoginRequest,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.validateUser(email, password);
    const token = await this.authService.login(user);
    response.send({ success: true, payload: user, token });
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('create')
  async create(
    @Body() body: LoginRequest,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.createUser(body);
    response.send({ success: true, user });
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Get('rol')
  async rol(@Query() query) {
    const data = await this.authService.listRol(query);
    return data;
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('rol')
  async rolCreate(@Body() body: any) {
    const data = await this.authService.createRol(body);
    return data;
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Put('rol/:id')
  async rolUpdate(@Body() body: any, @Param('id', ParseIntPipe) id: number) {
    const data = await this.authService.updateRol(id, body);
    return data;
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Delete('rol/:id')
  async rolDelete(@Param('id', ParseIntPipe) id: number) {
    const data = await this.authService.deleteRol(id);
    return data;
  }
}
