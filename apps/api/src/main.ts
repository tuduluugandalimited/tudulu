// D:\tudulu\apps\api\src\main.ts
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
    "https://tudulu-ruddy.vercel.app",
    "https://tudulu.org",
    "https://www.tudulu.org",
    process.env.FRONTEND_URL,
  ].filter(Boolean) as string[];

  app.enableCors({
    origin: (origin, callback) => {
      // Allow non-browser requests (Postman, curl, server-to-server)
      if (!origin) return callback(null, true);

      // Allow exact matches from allowedOrigins array
      if (allowedOrigins.includes(origin)) return callback(null, true);

      // Allow any vercel deployment domain (*.vercel.app)
      if (/\.vercel\.app$/.test(origin)) return callback(null, true);

      return callback(new Error(`CORS blocked for origin: ${origin}`), false);
    },
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

  const port = process.env.PORT || 3000;
  await app.listen(port, "0.0.0.0");
  console.log(`Application is running on: http://0.0.0.0:${port}`);
}
bootstrap();
