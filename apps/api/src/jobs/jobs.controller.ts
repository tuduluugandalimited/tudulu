// D:\tudulu\apps\api\src\jobs\jobs.controller.ts
import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
} from "@nestjs/common";
import { JobsService } from "./jobs.service";
import { CreateJobDto } from "./dto/create-job.dto";
import { UpdateJobDto } from "./dto/update-job.dto";

@Controller("jobs")
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  async findAll() {
    return this.jobsService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.jobsService.findOne(id);
  }

  @Post()
  async create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(id, updateJobDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.jobsService.remove(id);
  }
}
