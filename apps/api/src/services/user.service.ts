import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor() { /* empty */ }

  async findAll() {
    return { message: 'This action returns all users' };
  }

  async findOne(id: number) {
    return { message: `This action returns user #${id}` };
  }

  async create(createUserDto: CreateUserDto) {
    return { message: 'This action adds a new user', data: createUserDto };
  }

  async update(id: number, updateUserDto: CreateUserDto) {
    return { message: `This action updates user #${id}`, data: updateUserDto };
  }

  async remove(id: number) {
    return { message: `This action removes user #${id}` };
  }
}