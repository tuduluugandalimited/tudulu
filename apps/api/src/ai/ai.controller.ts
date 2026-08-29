import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { AiService } from "./ai.service";

@Controller("ai")
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post("generate")
  async generate(@Body() promptDto: any) {
    return this.aiService.generateContent(promptDto);
  }

  @Get("status/:id")
  async getStatus(@Param("id") id: string) {
    return this.aiService.getTaskStatus(id);
  }
}
