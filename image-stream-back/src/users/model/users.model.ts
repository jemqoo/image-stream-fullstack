import {
    BelongsToMany,
    Column,
    DataType,
    HasMany,
    Model,
    Table,
} from 'sequelize-typescript';
import { Card } from 'src/cards/model/cards.model';
import { Like } from 'src/likes/model/likes.model';

interface IUserCreationAttributes {
    email: string;
    password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, IUserCreationAttributes> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    avatar: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    about: string;

    @HasMany(() => Card)
    ownedCards: Card[];

    @BelongsToMany(() => Card, () => Like)
    likedCards: Card[];
}
