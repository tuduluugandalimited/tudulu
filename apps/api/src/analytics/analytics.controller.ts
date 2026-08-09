import { Controller, Get, Query, Post, Body } from "@nestjs/common";
import { AnalyticsService } from "./analytics.service";

@Controller("analytics")
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get("summary")
  async getSummary(@Query() query: any) {
    return this.analyticsService.getSummary(query);
  }

  @Post("track")
  async trackEvent(@Body() eventDto: any) {
    return this.analyticsService.trackEvent(eventDto);
  }
}
