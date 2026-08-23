import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from "@nestjs/common";

@Injectable()
export class ParseIntIdPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException(
        `Validation failed. "${value}" is not an integer ID.`,
      );
    }
    if (val <= 0) {
      throw new BadRequestException(
        `Validation failed. ID must be a positive integer.`,
      );
    }
    return val;
  }
}
