import { Controller, Get, Param, Delete } from "@nestjs/common";
import { MediaService } from "./media.service";

@Controller("media")
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  async findAll() {
    return this.mediaService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.mediaService.findOne(id);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.mediaService.remove(id);
  }
}
