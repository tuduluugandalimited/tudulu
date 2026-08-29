import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from "@nestjs/common";
import { VolunteeringService } from "./volunteering.service";
import { CreateVolunteeringDto } from "./dto/create-volunteering.dto";
import { UpdateVolunteeringDto } from "./dto/update-volunteering.dto";

@Controller("volunteering")
export class VolunteeringController {
  constructor(private readonly volunteeringService: VolunteeringService) {}

  @Post()
  async create(@Body() dto: CreateVolunteeringDto) {
    return this.volunteeringService.create(dto);
  }

  @Get()
  async findAll() {
    return this.volunteeringService.findAll();
  }

  @Get(":idOrSlug")
  async findOne(@Param("idOrSlug") idOrSlug: string) {
    return this.volunteeringService.findOne(idOrSlug);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() dto: UpdateVolunteeringDto) {
    return this.volunteeringService.update(id, dto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.volunteeringService.remove(id);
  }
}
