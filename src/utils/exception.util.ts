import { InternalServerErrorException } from '@nestjs/common';

export const Exception = (error: unknown) => {
  if (error instanceof Error) {
    throw error;
  }
  return new InternalServerErrorException('An unknown server error occurred.');
};
