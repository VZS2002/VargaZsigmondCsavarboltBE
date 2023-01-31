import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Delete,
  Param,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Csavar } from './csavar.entity';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }
  @Get('api/csavar')
  async listCsavar() {
    const aruhazRepo = this.dataSource.getRepository(Csavar);
    return await aruhazRepo.find();
  }

  @Post('api/csavar')
  newCsavar(@Body() csavar: Csavar) {
    csavar.id = undefined;
    const aruhazRepo = this.dataSource.getRepository(Csavar);
    aruhazRepo.save(csavar);
  }

  @Delete('api/csavar/:id')
  deleteCsavar(@Param('id') id: number) {
    const aruhazRepo = this.dataSource.getRepository(Csavar);
    aruhazRepo.delete(id);
  }
}
