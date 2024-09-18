import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ParseMongoIDPipe } from 'src/common/pipes/mongoid.pipe';
import { PaginationQueryDto } from './dto/paginate-task.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller({
  version: '1',
  path: 'tasks',
})
@ApiTags('Tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Task created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    const task = await this.tasksService.create(createTaskDto);

    return {
      data: task,
      message: 'Task created successfully',
      status: HttpStatus.CREATED,
    };
  }

  @ApiOperation({ summary: 'Get all active tasks' })
  @ApiResponse({ status: 200, description: 'Tasks fetched successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get()
  async findAllActive(@Query() paginationQuery: PaginationQueryDto) {
    const data = await this.tasksService.findAllActive(paginationQuery);

    return {
      data,
      message: 'Tasks fetched successfully',
      statusCode: HttpStatus.OK,
    };
  }

  @Get('archived')
  @ApiOperation({ summary: 'Get all archived tasks' })
  @ApiResponse({ status: 200, description: 'Tasks fetched successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findAllArchive(@Query() paginationQuery: PaginationQueryDto) {
    const data = await this.tasksService.findAllArchived(paginationQuery);

    return {
      data,
      message: 'Tasks fetched successfully',
      statusCode: HttpStatus.OK,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiResponse({ status: 200, description: 'Task fetched successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findOne(@Param('id', ParseMongoIDPipe) id: string) {
    const task = await this.tasksService.findOne(id);
    return {
      data: task,
      message: 'Task fetched successfully',
      statusCode: HttpStatus.OK,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task by ID' })
  @ApiResponse({ status: 200, description: 'Task updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async update(
    @Param('id', ParseMongoIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const task = await this.tasksService.update(id, updateTaskDto);

    return {
      data: task,
      message: 'Task updated successfully',
      statusCode: HttpStatus.OK,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiResponse({ status: 200, description: 'Task deleted successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async remove(@Param('id', ParseMongoIDPipe) id: string) {
    const task = await this.tasksService.remove(id);

    return {
      data: task,
      message: 'Task deleted successfully',
      statusCode: HttpStatus.OK,
    };
  }
}
