import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { NewsletterService } from "./newsletter.service";

@Controller("newsletter")
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Get("subscribers")
  async getAllSubscribers() {
    return this.newsletterService.findAll();
  }

  @Post("subscribers")
  async addSubscriber(@Body("email") email: string) {
    return this.newsletterService.addSubscriber(email);
  }

  @Delete("subscribers/:id")
  async deleteSubscriber(@Param("id") id: string) {
    return this.newsletterService.remove(id);
  }

  @Post("broadcast")
  @HttpCode(HttpStatus.OK)
  async sendBroadcast(
    @Body("subject") subject: string,
    @Body("content") content: string,
  ) {
    return this.newsletterService.sendBroadcast(subject, content);
  }
}
