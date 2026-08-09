import { Controller, Get, Param, Post, Body } from "@nestjs/common";
import { GrantsService } from "./grants.service";
import { CreateGrantDto } from "./dto/create-grant.dto";

@Controller("grants")
export class GrantsController {
  constructor(private readonly grantsService: GrantsService) {}

  @Get()
  async findAll() {
    return this.grantsService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.grantsService.findOne(id);
  }

  @Post()
  async create(@Body() createGrantDto: CreateGrantDto) {
    return this.grantsService.create(createGrantDto);
  }
}
