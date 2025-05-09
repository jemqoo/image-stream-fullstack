import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CardsModule } from './cards/cards.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/model/users.model';
import { Card } from './cards/model/cards.model';
import { Like } from './likes/model/likes.model';

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: '111111',
            database: 'jemqoo',
            models: [User, Card, Like],
            autoLoadModels: true,
        }),
        UsersModule,
        CardsModule,
        AuthModule,
    ],
})
export class AppModule {}
