import { Controller, Get, Param, Put, Body } from "@nestjs/common";
import { ConfigService } from "./config.service";

@Controller("config")
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  async findAll() {
    return this.configService.findAll();
  }

  @Get(":key")
  async findOne(@Param("key") key: string) {
    return this.configService.findOne(key);
  }

  @Put(":key")
  async update(@Param("key") key: string, @Body() updateConfigDto: any) {
    return this.configService.update(key, updateConfigDto);
  }
}
