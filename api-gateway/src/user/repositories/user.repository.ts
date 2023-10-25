import { Injectable } from '@nestjs/common';
import { IUserRepository } from './interfaces/repository.interface';
import { UserCreateRequestDTO } from '../dtos/requests/create.request.dto';
import { UserUpdateRequestDTO } from '../dtos/requests/update.request.dto';
import { IUser } from '../interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from '../../common/models/user.model';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel(USER.name) private model: Model<IUser>) {}

  async store(
    { name, email }: UserCreateRequestDTO,
    hash: string,
  ): Promise<IUser> {
    const user = new this.model({ name, email, password: hash, avatar: '' });
    await user.save();

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      avatar: user.avatar,
    };
  }

  async show(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({ email });

    if (user != null) {
      return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        password: user.password,
        avatar: user.avatar,
      };
    }

    return null;
  }

  async update(
    email: string,
    { name }: UserUpdateRequestDTO,
    hash: string,
  ): Promise<IUser> {
    await this.model.findOneAndUpdate(
      { email },
      { name: name, password: hash },
    );

    const user = await this.model.findOne({ email });

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      avatar: user.avatar,
    };
  }

  async upload(email: string, avatar: string): Promise<IUser> {
    await this.model.findOneAndUpdate({ email }, { avatar: avatar });
    const user = await this.model.findOne({ email });

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      avatar: user.avatar,
    };
  }
}
