import { Controller, Get, Param, Post, Body } from "@nestjs/common";
import { EventsService } from "./events.service";

@Controller("events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async findAll() {
    return this.eventsService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.eventsService.findOne(id);
  }

  @Post()
  async create(@Body() createEventDto: any) {
    return this.eventsService.create(createEventDto);
  }
}
