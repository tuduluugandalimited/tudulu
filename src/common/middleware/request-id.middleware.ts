import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const headerName = "x-request-id";
    const requestId = (req.headers[headerName] as string) || randomUUID();

    req.headers[headerName] = requestId;
    res.setHeader(headerName, requestId);

    next();
  }
}
