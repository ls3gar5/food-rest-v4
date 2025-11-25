import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/user.dto';
// import { HttpService } from '@nestjs/axios';
import { HttpClient, InjectHttpClient } from '@pepa/http-client';
import { CryptoService } from '@pepa/crypto';
import { InjectCacheStore, CacheStore } from "@pepa/cache";

@Injectable()
export class UserService {
constructor(// private readonly httpService: HttpService,
   @InjectHttpClient('SERVICE_API') private readonly httppepa: HttpClient,
   private readonly cryptoService: CryptoService,
   @InjectCacheStore('checkout-login') private readonly cacheStore: CacheStore
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
    const encrypted = await this.cryptoService.hash('mySensitiveData');

    await this.cacheStore.set('1', encrypted);
    console.log('Cache set response:');
    const data = await this.cacheStore.get('1');
    console.log('Encrypted data:', data);
    return { message: `This action returns user # ${data}` };
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

  async findPokeNames() {
    try {
      const response = await this.httppepa.get('http://localhost:3010/health-check-poke');
      console.log('Fetched Pokemon names data:', JSON.stringify(response.data));
      return response.data?.data;
    } catch (error) {
      throw new Error(`Failed to fetch Pokemon data: ${error.message}`);
    }
  }
}


