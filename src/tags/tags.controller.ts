import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from "@nestjs/common";
import { TagsService } from "./tags.service";

@Controller("tags")
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  async findAll() {
    return this.tagsService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.tagsService.findOne(id);
  }

  @Post()
  async create(@Body() createTagDto: any) {
    return this.tagsService.create(createTagDto);
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() updateTagDto: any) {
    return this.tagsService.update(id, updateTagDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.tagsService.remove(id);
  }
}
