import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import { SetUserDto } from './dto/set-user.dto';
import { SetUserAvatarDto } from './dto/set-user-avatar.dto';

@Controller('users/me')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    getCurrentUser(@Req() request: Request) {
        // @ts-ignore
        const email = request.user?.email;

        return this.usersService.getUserByEmail(email);
    }

    @UseGuards(JwtAuthGuard)
    @Patch()
    setCurrentUserInfo(@Req() request: Request, @Body() dto: SetUserDto) {
        // @ts-ignore
        const email = request.user?.email;

        return this.usersService.setUserInfo(email, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/avatar')
    setCurrentUserAvatar(
        @Req() request: Request,
        @Body() dto: SetUserAvatarDto,
    ) {
        // @ts-ignore
        const email = request.user?.email;

        return this.usersService.setUserAvatar(email, dto);
    }
}
