import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/user.dto';
// import { HttpService } from '@nestjs/axios';
import { HttpClient, InjectHttpClient } from '@pepa/http-client';

@Injectable()
export class UserService {
constructor(// private readonly httpService: HttpService,
   @InjectHttpClient('SERVICE_API') private readonly httppepa: HttpClient
) {}

  async findAll() {
    try {
      // console.log('START Fetched Pokemon data:');
      // const response = await this.httpService.axiosRef.get('https://pokeapi.co/api/v2/pokemon-color/1');
      // const pokes = response.data.data;
      // console.log('Fetched Pokemon data:', pokes);
      // return pokes;
      const response = await this.httppepa.get('https://pokeapi.co/api/v2/pokemon-color/1');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch Pokemon data: ${error.message}`);
    }
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