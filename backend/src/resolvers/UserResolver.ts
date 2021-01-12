import { verify, hash } from 'argon2';
import {
	Resolver,
	Mutation,
	Arg,
	Int,
	Query,
	InputType,
	Field,
	Ctx,
	UseMiddleware,
} from 'type-graphql';
import { getRepository } from 'typeorm';

import { User } from '../entities/UserEntity';
import { MyContext } from '../types/MyContext';
import { isAuth } from '../middlewares/UserMiddlewares';

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
	repo = getRepository(User);

	@Mutation(() => User, { nullable: true })
	async createUser(
		@Arg('fields', () => UserInput) fields: UserInput
	): Promise<User | null> {
		const { username, password, email } = fields;

		const user = await this.repo.findOne({ email });
		if (user) throw new Error('User Already Exists');

		const newUser = new User(username, email, await hash(password));
		await this.repo.save(newUser);

		return newUser;
	}

	@UseMiddleware(isAuth)
	@Mutation(() => Boolean)
	async deleteUser(@Arg('id', () => Int) id: number): Promise<boolean> {
		await this.repo.delete(id);
		return true;
	}

	@UseMiddleware(isAuth)
	@Mutation(() => Boolean)
	async updateUser(
		@Arg('id', () => Int) id: number,
		@Arg('fields', () => UserUpdateInput) fields: UserUpdateInput
	): Promise<boolean> {
		const user = await this.repo.findOne(id);
		if (
			!user ||
			(fields.password && !(await verify(user.password, fields.password)))
		)
			return false;

		delete fields.password;

		await this.repo.remove(user);
		return true;
	}

	@Query(() => [User])
	async Users(): Promise<User[]> {
		const users = await this.repo.find();

		return users || new Array<User>();
	}

	/* @Query(() => User, { nullable: true })
	async cookieUser(@Ctx() ctx: MyContext): Promise<User | null> {
		if (!ctx.req.session.userId) return null;

		const user = await this.repo.findOne(ctx.req.session.userId);
		if (!user) return null;

		return user;
	} */

	@Mutation(() => User, { nullable: true })
	async userLogin(
		@Arg('email', () => String) email: string,
		@Arg('password', () => String) password: string,
		@Ctx() ctx: MyContext
	): Promise<User | null> {
		const user = await this.repo.findOne({ email });
		if (!user || !verify(user.password, password)) return null;

		ctx.req.session.userId = user.id;

		return user;
	}

	@Mutation(() => Boolean)
	async userLogout(@Ctx() ctx: MyContext): Promise<boolean> {
		return new Promise((res, rej) =>
			ctx.req.session.destroy((err: Error) => {
				if (err) return rej(false);

				ctx.res.clearCookie('tdevblog');
				return res(true);
			})
		);
	}
}
