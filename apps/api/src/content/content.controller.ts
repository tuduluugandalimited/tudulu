import { Controller, Get, Param, Query } from "@nestjs/common";
import { ContentService } from "./content.service";

@Controller("content")
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get()
  async findAll(@Query("search") search?: string) {
    return this.contentService.findAll({ search });
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.contentService.findOne(id);
  }
}
