// D:\tudulu\apps\api\src\organizations\organizations.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
} from "@nestjs/common";
import { OrganizationsService } from "./organizations.service";

@Controller("organizations")
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Get()
  async findAll(
    @Query("search") search?: string,
    @Query("region") region?: string,
    @Query("type") type?: string,
    @Query("sectorId") sectorId?: string,
    @Query("countryId") countryId?: string,
    @Query("isVerified") isVerified?: string,
  ) {
    return this.organizationsService.findAll({
      search,
      region,
      type,
      sectorId,
      countryId,
      isVerified:
        isVerified === "true"
          ? true
          : isVerified === "false"
            ? false
            : undefined,
    });
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.organizationsService.findOne(id);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.organizationsService.remove(id);
  }
}
