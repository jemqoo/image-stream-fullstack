import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req,
    UseGuards,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('cards')
export class CardsController {
    constructor(private readonly cardsService: CardsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    createCard(@Req() request: Request, @Body() dto: CreateCardDto) {
        // @ts-ignore
        const email = request.user?.email;

        return this.cardsService.create(email, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getCards() {
        return this.cardsService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteCard(@Req() request: Request, @Param('id') cardId: string) {
        // @ts-ignore
        const email = request.user?.email;

        return this.cardsService.delete(email, cardId);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id/likes')
    putLike(@Req() request: Request, @Param('id') cardId: string) {
        // @ts-ignore
        const email = request.user?.email;

        return this.cardsService.putLike(email, cardId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id/likes')
    deleteLike(@Req() request: Request, @Param('id') cardId: string) {
        // @ts-ignore
        const email = request.user?.email;

        return this.cardsService.deleteLike(email, cardId);
    }
}
