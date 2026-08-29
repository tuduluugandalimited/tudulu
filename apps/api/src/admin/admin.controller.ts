// D:\tudulu\apps\api\src\admin\admin.controller.ts
import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { AdminGuard } from "../auth/guards/admin.guard";

@ApiTags("admin")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, AdminGuard)
@Controller("admin")
export class AdminController {
  @Get("dashboard-stats")
  @ApiOperation({
    summary: "Get high-level platform analytics for administrators",
  })
  getDashboardStats() {
    return {
      message: "Welcome to the Tudulu Admin CMS panel",
      timestamp: new Date().toISOString(),
    };
  }
}
