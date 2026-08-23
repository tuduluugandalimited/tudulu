import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from "@nestjs/common";
import { SourcesService } from "./sources.service";

@Controller("sources")
export class SourcesController {
  constructor(private readonly sourcesService: SourcesService) {}

  @Get()
  async findAll() {
    return this.sourcesService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.sourcesService.findOne(id);
  }

  @Post()
  async create(@Body() createSourceDto: any) {
    return this.sourcesService.create(createSourceDto);
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() updateSourceDto: any) {
    return this.sourcesService.update(id, updateSourceDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.sourcesService.remove(id);
  }
}
