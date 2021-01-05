import { verify } from 'argon2';
import {
    Resolver,
    Mutation,
    Arg,
    Int,
    Query,
    InputType,
    Field,
} from 'type-graphql';
import { getRepository } from 'typeorm';
import { User } from '../entities/UserEntity';

@InputType()
class UserInput {
    @Field()
    username!: string;

    @Field()
    email!: string;

    @Field()
    password!: string;
}

@InputType()
class UserUpdateInput {
    @Field(() => String, { nullable: true })
    password?: string;

    @Field(() => String, { nullable: true })
    email?: string;

    @Field(() => String, { nullable: true })
    username?: string;
}

@Resolver()
export class UserResolver {
    //repo = getRepository(User);

    @Mutation(() => User)
    async createUser(
        @Arg('fields', () => UserInput) fields: UserInput
    ): Promise<User> {
        const { username, password, email } = fields;
        const repo = getRepository(User);
        const newUser = new User(username, email, password);
        return await repo.save(newUser);
    }

    @Mutation(() => Boolean)
    async deleteUser(@Arg('id', () => Int) id: number): Promise<boolean> {

        await User.delete(id);
        return true;
    }

    @Mutation(() => Boolean)
    async updateUser(
        @Arg('id', () => Int) id: number,
        @Arg('fields', () => UserUpdateInput) fields: UserUpdateInput
    ): Promise<boolean> {
        const repo = getRepository(User);
        const user = await repo.findOne(id);
        if (!user || (fields.password && !await verify(user.password, fields.password)))
            return false;

        delete fields.password;

        await repo.remove(user);
        return true;
    }

    @Query(() => [User])
    async Users(): Promise<User[]> {
        const repo = getRepository(User);
        return await repo.find();
    }
}
