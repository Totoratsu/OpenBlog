import { ObjectType, Field } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    email!: string;

    @Field()
    @Column()
    username!: string;

    @Field()
    @Column()
    password!: string;

    constructor(username: string, email: string, password: string) {
        super();

        this.username = username;
        this.email = email;
        this.password = password;
    }
}
