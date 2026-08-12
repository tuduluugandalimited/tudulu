import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enforces /api/v1 route prefix matching your request endpoint
  app.setGlobalPrefix("api/v1");

  app.enableCors({
    origin: "*",
    credentials: true,
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
