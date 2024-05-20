import { Module, forwardRef } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { Card } from './model/cards.model';
import { User } from 'src/users/model/users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    controllers: [CardsController],
    providers: [CardsService],
    imports: [
        SequelizeModule.forFeature([User, Card]),
        forwardRef(() => AuthModule),
    ],
})
export class CardsModule {}
