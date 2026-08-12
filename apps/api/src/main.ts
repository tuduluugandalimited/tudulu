import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enforces /api/v1 route prefix
  app.setGlobalPrefix("api/v1");

  app.enableCors({
    origin: "*",
    credentials: true,
  });

  const port = Number(process.env.PORT) || 3000;

  await app.listen(port, "0.0.0.0");

  console.log(`Tudulu API listening on port ${port}`);
}

bootstrap();
