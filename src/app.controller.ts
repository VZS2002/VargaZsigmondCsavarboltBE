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
import { Rendeles } from './rendeles.entity';
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
    const csavarRepo = this.dataSource.getRepository(Csavar);
    return await csavarRepo.find();
  }

  @Post('api/csavar')
  newCsavar(@Body() csavar: Csavar) {
    csavar.id = undefined;
    const csavarRepo = this.dataSource.getRepository(Csavar);
    csavarRepo.save(csavar);
  }

  @Delete('api/csavar/:id')
  deleteCsavar(@Param('id') id: number) {
    const csavarRepo = this.dataSource.getRepository(Csavar);
    csavarRepo.delete(id);
  }

  @Post('api/csavarbolt/:id/rendeles')
  async rendelesCsavar(
    @Body() rendeles: Rendeles,
    @Param('id') csavarId: number,
  ) {
    const rendelesRepo = this.dataSource.getRepository(Rendeles);
    rendeles.id = undefined;
    rendeles.csavar_id = csavarId;
    const csavarRepo = this.dataSource.getRepository(Csavar);
    const megrendelt = await csavarRepo.findOneBy({ id: csavarId });
    megrendelt.keszlet = megrendelt.keszlet - rendeles.db;
    console.log(megrendelt.ar * rendeles.db);
    csavarRepo.save(megrendelt);
    rendelesRepo.save(rendeles);
  }

  @Get('api/csavarbolt/rendeles')
  async listRendeles() {
    const rendelesRepo = this.dataSource.getRepository(Rendeles);
    return await rendelesRepo.find();
  }

  @Delete('api/csavarbolt/rendeles/:id')
  deleteRendeles(@Param('id') id: number) {
    const rendelesRepo = this.dataSource.getRepository(Rendeles);
    rendelesRepo.delete(id);
  }
}
