import { Controller, Get, Param, Query } from "@nestjs/common";
import { NewsService } from "./news.service";

@Controller("news")
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async findAll(
    @Query("isTrending") isTrending?: string,
    @Query("search") search?: string,
  ) {
    const trendingBool =
      isTrending !== undefined ? isTrending === "true" : undefined;
    return this.newsService.findAll({ isTrending: trendingBool, search });
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.newsService.findOne(id);
  }
}
