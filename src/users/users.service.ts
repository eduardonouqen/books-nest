import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async create(createUserDto: CreateUserDto): Promise<User> {

        createUserDto.password = await this.userHash(createUserDto.password)

        const createdUser = await this.userModel.create(createUserDto);
        return createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().select('-password');
    }

    async findUser(username) {
        return this.userModel.findOne({ username: username });
    }

    private async userHash(pass) {
        const saltOrRounds = 10

        const hashedPass = await bcrypt.hash(pass, saltOrRounds)
        return hashedPass
    }
}