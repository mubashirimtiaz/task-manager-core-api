import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export const Exception = (error: unknown) => {
  if (error instanceof Error) {
    return new BadRequestException(error.message);
  }
  return new InternalServerErrorException('An unknown server error occurred.');
};
