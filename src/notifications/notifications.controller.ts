import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from "@nestjs/common";
import { NotificationsService } from "./notifications.service";

@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async findAll() {
    return this.notificationsService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.notificationsService.findOne(id);
  }

  @Post()
  async send(@Body() createNotificationDto: any) {
    return this.notificationsService.send(createNotificationDto);
  }

  @Patch(":id/read")
  async markAsRead(@Param("id") id: string) {
    return this.notificationsService.markAsRead(id);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.notificationsService.remove(id);
  }
}
