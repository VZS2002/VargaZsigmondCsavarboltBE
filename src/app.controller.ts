import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { get } from 'http';
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
  @Get('api/csavarwebshop')
  async listCsavar() {
    const webRepos = this.dataSource.getRepository(Csavar);
    return await webRepos.find();
  }
}
