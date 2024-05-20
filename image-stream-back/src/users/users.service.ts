import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/users.model';
import { SetUserDto } from './dto/set-user.dto';
import { SetUserAvatarDto } from './dto/set-user-avatar.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async createUser(dto: CreateUserDto) {
        return await this.userRepository.create(dto);
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({
            where: { email },
            include: { all: true },
        });

        return user;
    }

    async setUserInfo(email: string, dto: SetUserDto) {
        const user = await this.userRepository.findOne({
            where: { email },
            include: { all: true },
        });

        if (!user) {
            throw new HttpException(
                'Пользователь не найден',
                HttpStatus.NOT_FOUND,
            );
        }

        user.name = dto.name;
        user.about = dto.about;

        await user.save();

        return user;
    }

    async setUserAvatar(email: string, dto: SetUserAvatarDto) {
        const user = await this.userRepository.findOne({
            where: { email },
            include: { all: true },
        });

        if (!user) {
            throw new HttpException(
                'Пользователь не найден',
                HttpStatus.NOT_FOUND,
            );
        }

        user.avatar = dto.avatar;

        await user.save();

        return user;
    }
}
