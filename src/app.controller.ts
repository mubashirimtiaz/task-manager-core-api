import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller({
  version: '1',
})
@ApiTags('General')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Get the health of the application' })
  @ApiResponse({ status: 200, description: 'Application is healthy' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get('health')
  getHealth() {
    const message = this.appService.getHealth();
    return {
      message,
      statusCode: HttpStatus.OK,
    };
  }
}
