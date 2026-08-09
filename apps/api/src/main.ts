import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = [
    "http://localhost:3000",
    "http://192.168.1.4:3000",
    "http://localhost:3001",
    "http://192.168.1.4:3001",
    process.env.FRONTEND_URL, // Add your production frontend domain variable here
  ].filter(Boolean);

  app.enableCors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });

  app.setGlobalPrefix("api/v1");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Default to port 3000 to align with fly.toml internal_port
  const port = process.env.PORT || 3000;

  // Bind to '0.0.0.0' for Docker / Fly.io container networking
  await app.listen(port, "0.0.0.0");
  console.log(`Application is running on: http://0.0.0.0:${port}`);
}
bootstrap();
