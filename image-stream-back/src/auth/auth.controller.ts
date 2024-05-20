import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signup')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto);
    }

    @Post('/signin')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto);
    }
}
