import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { EventsService } from "./events.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";

@Controller("events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async getAllEvents() {
    return this.eventsService.findAll();
  }

  @Get(":slug")
  async getEventBySlug(@Param("slug") slug: string) {
    return this.eventsService.findBySlug(slug);
  }

  @Post()
  async createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Patch(":id")
  async updateEvent(
    @Param("id") id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeEvent(@Param("id") id: string) {
    return this.eventsService.remove(id);
  }
}
