import {
    BelongsTo,
    BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { Like } from 'src/likes/model/likes.model';
import { User } from 'src/users/model/users.model';

interface ICardCreationAttributes {
    name: string;
    link: string;
    likes: User[];
    owner: User;
    ownerId: number;
}

@Table({ tableName: 'cards' })
export class Card extends Model<Card, ICardCreationAttributes> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
    })
    name: string;

    @Column({ type: DataType.STRING })
    link: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
    })
    ownerId: number;

    @BelongsTo(() => User)
    owner: User;

    @BelongsToMany(() => User, () => Like)
    likes: User[];
}
