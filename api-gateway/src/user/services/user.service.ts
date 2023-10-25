import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUserService } from './interfaces/service.interface';
import { UserCreateRequestDTO } from '../dtos/requests/create.request.dto';
import { UserUpdateRequestDTO } from '../dtos/requests/update.request.dto';
import { IUser } from '../interfaces/user.interface';
import { UserRepository } from '../repositories/user.repository';
import { hashPassword } from '../../common/utils/hash.utils';
import * as fs from 'fs';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async store(userCreateRequestDTO: UserCreateRequestDTO): Promise<IUser> {
    const user: IUser | null = await this.userRepository.show(
      userCreateRequestDTO.email,
    );

    if (user != null) {
      throw new ConflictException('E-mail already exists');
    }

    if (userCreateRequestDTO.password != userCreateRequestDTO.confirmPassword) {
      throw new BadRequestException('Passwords is different');
    }

    const hash: string = await hashPassword(userCreateRequestDTO.password);

    return await this.userRepository.store(userCreateRequestDTO, hash);
  }

  async show(email: string): Promise<IUser> {
    return await this.userRepository.show(email);
  }

  async update(
    email: string,
    userUpdateRequestDTO: UserUpdateRequestDTO,
  ): Promise<IUser> {
    if (userUpdateRequestDTO.password != userUpdateRequestDTO.confirmPassword) {
      throw new BadRequestException('Passwords is different');
    }

    const hash: string = await hashPassword(userUpdateRequestDTO.password);

    return await this.userRepository.update(email, userUpdateRequestDTO, hash);
  }

  async upload(email: string, avatar: Express.Multer.File): Promise<IUser> {
    const user: IUser = await this.userRepository.show(email);

    if (user.avatar != '') {
      fs.unlink(`./uploads/${user.avatar}`, (err) => {
        if (err) {
          throw new NotFoundException('File not found');
        }
      });
    }

    return await this.userRepository.upload(email, avatar.filename);
  }

  async getFile(email: string): Promise<string> {
    const user: IUser = await this.userRepository.show(email);
    return user.avatar;
  }
}
