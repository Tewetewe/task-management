import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { User } from '../users/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { instanceToPlain } from 'class-transformer';
import { localizedResponse } from '../utils/response';



@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private taskRepo: Repository<Task>) {}

  async findAll(user: User) {
    const tasks = await this.taskRepo.find({
      where: { user: { id: user.id } },
      relations: ['user'],
    });
    return localizedResponse(
      tasks.map(t => instanceToPlain(t)),
      'Data tugas berhasil diambil',
      'Tasks retrieved successfully',
    );
  }


  create(dto: CreateTaskDto, user: User) {
    const task = this.taskRepo.create({ ...dto, user });
    this.taskRepo.save(task);
    return localizedResponse(
      instanceToPlain(task),
      'Tugas berhasil dibuat',
      'Task created successfully',
      201,
    );
  }

  async update(id: number, dto: UpdateTaskDto, user: User) {
    const task = await this.taskRepo.findOne({ where: { id, user } });
    if (!task) throw new NotFoundException('Task not found');
    Object.assign(task, dto);
    this.taskRepo.save(task);
    return localizedResponse(
      instanceToPlain(task),
      'Tugas berhasil diperbarui',
      'Task updated successfully',
    );
  }

  async delete(id: number, user: User) {
    const result = await this.taskRepo.delete({ id, user });
    if (!result.affected) throw new NotFoundException('Task not found');
    return localizedResponse(
      null,
      'Tugas berhasil dihapus',
      'Task deleted successfully',
    );
  }
}