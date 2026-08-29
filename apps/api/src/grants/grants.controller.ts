import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { GrantsService } from "./grants.service";
import { CreateGrantDto } from "./dto/create-grant.dto";
import { UpdateGrantDto } from "./dto/update-grant.dto";
import { FindGrantsQueryDto } from "./dto/find-grants-query.dto";

@Controller("grants")
export class GrantsController {
  constructor(private readonly grantsService: GrantsService) {}

  @Get()
  findAll(@Query() query: FindGrantsQueryDto) {
    return this.grantsService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string, @Query("lang") lang?: string) {
    return this.grantsService.findOne(id, lang);
  }

  @Post()
  create(@Body() createGrantDto: CreateGrantDto) {
    return this.grantsService.create(createGrantDto);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateGrantDto: UpdateGrantDto) {
    return this.grantsService.update(id, updateGrantDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.grantsService.remove(id);
  }
}
