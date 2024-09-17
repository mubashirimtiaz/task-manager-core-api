import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';

const MONGODB_ID_REGEX = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

@Injectable()
export class ParseMongoIDPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (!MONGODB_ID_REGEX.test(value)) {
      throw new BadRequestException(
        `Invalid Mongo ID ${value} provided in ${metadata.type}`,
      );
    }
    return value;
  }
}
