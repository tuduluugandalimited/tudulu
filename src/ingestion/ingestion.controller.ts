import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('ingestion')
export class IngestionController {
  @Get()
  async getStatus() {
    return { status: 'Ingestion service active' };
  }

  @Post()
  async ingestData(@Body() payload: any) {
    return { message: 'Data received', data: payload };
  }
}