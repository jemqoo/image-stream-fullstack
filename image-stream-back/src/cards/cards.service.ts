import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Card } from './model/cards.model';
import { User } from 'src/users/model/users.model';
import { Like } from 'src/likes/model/likes.model';

@Injectable()
export class CardsService {
    constructor(
        @InjectModel(Card) private cardRepository: typeof Card,
        @InjectModel(User) private userRepository: typeof User,
    ) {}

    async create(email: string, dto: CreateCardDto) {
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

        const card = await this.cardRepository.create({
            ...dto,
            ownerId: user.id,
        });

        await card.reload({
            include: [
                { model: User, as: 'owner' },
                { model: User, as: 'likes', through: { attributes: [] } },
            ],
        });

        return card;
    }

    async getAll() {
        const cards = await this.cardRepository.findAll({
            include: { all: true },
        });

        return cards;
    }

    async delete(email: string, cardId: string) {
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

        const card = await this.cardRepository.findOne({
            where: { id: cardId },
            include: { all: true },
        });

        if (!card) {
            throw new HttpException('Пост не найден', HttpStatus.NOT_FOUND);
        }

        if (card.ownerId !== user.id) {
            throw new HttpException(
                'Нельзя удалить чужой пост',
                HttpStatus.FORBIDDEN,
            );
        }

        await card.destroy();

        return {
            message: 'Пост удален',
        };
    }

    async putLike(email: string, cardId: string) {
        const user = await this.userRepository.findOne({
            where: { email },
        });

        if (!user) {
            throw new HttpException(
                'Пользователь не найден',
                HttpStatus.NOT_FOUND,
            );
        }

        const card = await this.cardRepository.findOne({
            where: { id: cardId },
        });

        if (!card) {
            throw new HttpException('Пост не найден', HttpStatus.NOT_FOUND);
        }

        const likeExists = await Like.findOne({
            where: { userId: user.id, cardId: card.id },
        });

        if (likeExists) {
            throw new HttpException(
                'Пользователь уже поставил лайк этому посту',
                HttpStatus.BAD_REQUEST,
            );
        }

        await Like.create({ userId: user.id, cardId: card.id });

        await card.reload({
            include: [
                { model: User, as: 'likes', through: { attributes: [] } },
            ],
        });

        return card;
    }

    async deleteLike(email: string, cardId: string) {
        const user = await this.userRepository.findOne({
            where: { email },
        });

        if (!user) {
            throw new HttpException(
                'Пользователь не найден',
                HttpStatus.NOT_FOUND,
            );
        }

        const card = await this.cardRepository.findOne({
            where: { id: cardId },
        });

        if (!card) {
            throw new HttpException('Пост не найден', HttpStatus.NOT_FOUND);
        }

        const like = await Like.findOne({
            where: { userId: user.id, cardId: card.id },
        });

        if (!like) {
            throw new HttpException('Лайк не найден', HttpStatus.NOT_FOUND);
        }

        await like.destroy();

        await card.reload({
            include: [
                { model: User, as: 'likes', through: { attributes: [] } },
            ],
        });

        return card;
    }
}
