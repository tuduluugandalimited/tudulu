import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { JobsService } from "./jobs.service";
import { CreateJobDto } from "./dto/create-job.dto";
import { UpdateJobDto } from "./dto/update-job.dto";
import { FindJobsQueryDto } from "./dto/find-jobs-query.dto";

@Controller("jobs")
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  findAll(@Query() query: FindJobsQueryDto) {
    return this.jobsService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string, @Query("lang") lang?: string) {
    return this.jobsService.findOne(id, lang);
  }

  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(id, updateJobDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.jobsService.remove(id);
  }
}
