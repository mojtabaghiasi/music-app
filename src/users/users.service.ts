import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(userDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const salt = await bcrypt.genSalt(10);
    userDto.password = await bcrypt.hash(userDto.password, salt);
    userDto.apiKey = uuid4();
    const user = await this.userRepo.save(userDto);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safeUser } = user;
    return safeUser;
  }

  async findOne(data: Partial<User>): Promise<User> {
    const user = await this.userRepo.findOneBy({ email: data.email });
    if (!user) {
      throw new UnauthorizedException('Could not find user!');
    }
    return user;
  }

  async findById(id: number): Promise<User | null> {
    return await this.userRepo.findOneBy({ id: id });
  }

  async updateSecretKey(userId: number, secretKey: string) {
    return await this.userRepo.update(userId, {
      twoFASecret: secretKey,
      enable2FA: true,
    });
  }

  async update(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.userRepo.update(userId, updateUserDto);
  }

  async findByApiKey(apiKey: string) {
    return this.userRepo.findOneBy({ apiKey });
  }
}
