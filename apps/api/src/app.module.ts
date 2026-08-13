import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { AdminModule } from "./admin/admin.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { OrganizationsModule } from "./organizations/organizations.module";
import { GrantsModule } from "./grants/grants.module";
import { NewsModule } from "./news/news.module";
import { ContentModule } from "./content/content.module";
import { SearchModule } from "./search/search.module";
import { NotificationsModule } from "./notifications/notifications.module";
import { SourcesModule } from "./sources/sources.module";
import { TagsModule } from "./tags/tags.module";
import { TaxonomyModule } from "./taxonomy/taxonomy.module";
import { ContactModule } from "./contact/contact.module";
import { JobsModule } from "./jobs/jobs.module";
import { LoggerMiddleware } from "./common/middleware/logger.middleware";
import { RequestIdMiddleware } from "./common/middleware/request-id.middleware";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
    PrismaModule,
    AdminModule,
    AuthModule,
    UsersModule,
    OrganizationsModule,
    GrantsModule,
    NewsModule,
    ContentModule,
    SearchModule,
    NotificationsModule,
    SourcesModule,
    TagsModule,
    TaxonomyModule,
    ContactModule,
    JobsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware, LoggerMiddleware).forRoutes("*");
  }
}
