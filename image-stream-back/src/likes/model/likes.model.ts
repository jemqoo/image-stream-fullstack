import { Model, Column, Table, ForeignKey } from 'sequelize-typescript';
import { Card } from 'src/cards/model/cards.model';
import { User } from 'src/users/model/users.model';

@Table({
    tableName: 'likes',
})
export class Like extends Model<Like> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @ForeignKey(() => Card)
    @Column
    cardId: number;
}
