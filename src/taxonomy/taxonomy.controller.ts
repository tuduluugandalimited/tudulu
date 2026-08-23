import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from "@nestjs/common";
import { TaxonomyService } from "./taxonomy.service";

@Controller("taxonomy")
export class TaxonomyController {
  constructor(private readonly taxonomyService: TaxonomyService) {}

  @Get()
  async findAll() {
    return this.taxonomyService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.taxonomyService.findOne(id);
  }

  @Post()
  async create(@Body() createTaxonomyDto: any) {
    return this.taxonomyService.create(createTaxonomyDto);
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() updateTaxonomyDto: any) {
    return this.taxonomyService.update(id, updateTaxonomyDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.taxonomyService.remove(id);
  }
}
