import {
	Resolver,
	Mutation,
	Arg,
	Int,
	Query,
	Ctx,
	UseMiddleware,
} from 'type-graphql';
import { Service } from 'typedi';

import { User } from '../entities/UserEntity';
import { MyContext } from '../types/main';
import { isAuth } from '../middlewares/UserMiddlewares';
import { UserService } from '../services/UserService';
import { UserAuth, UserInput, UserUpdateInput } from '../types/UserTypes';

@Service()
@Resolver(() => User)
export class UserResolver {
	constructor(private readonly userService: UserService) { }

	@Mutation(() => User, { nullable: true })
	async createUser(
		@Arg('fields', () => UserInput) fields: UserInput
	): Promise<User | null> {
		const { username, password, email } = fields;

		return await this.userService.createOne({ username, password, email });
	}

	@UseMiddleware(isAuth)
	@Mutation(() => Boolean)
	async deleteUser(@Arg('id', () => Int) id: number): Promise<boolean> {
		return await this.userService.deleteOne(id);
	}

	@UseMiddleware(isAuth)
	@Mutation(() => Boolean)
	async updateUser(
		@Arg('id', () => Int) id: number,
		@Arg('fields', () => UserUpdateInput) fields: UserUpdateInput
	): Promise<boolean> {
		return await this.userService.updateOne(id, fields);
	}

	@Query(() => [User])
	async Users(@Arg('limit', () => Int) limit: number): Promise<User[]> {
		return await this.userService.find(limit);
	}

	@Query(() => User)
	async User(@Arg('id', () => Int) id: number): Promise<User | null> {
		return await this.userService.findOne(id);
	}

	/* @Query(() => User, { nullable: true })
	async cookieUser(@Ctx() ctx: MyContext): Promise<User | null> {
		if (!ctx.req.session.userId) return null;

		const user = await this.userService.findOne(ctx.req.session.userId);
		if (!user) return null;

		return user;
	} */

	@Mutation(() => UserAuth, { nullable: true })
	async userLogin(
		@Arg('email', () => String) email: string,
		@Arg('password', () => String) password: string
		//@Ctx() ctx: MyContext
	): Promise<UserAuth | null> {
		return await this.userService.userLogin(email, password /* , ctx */);
	}

	@Mutation(() => Boolean)
	async userLogout(@Ctx() ctx: MyContext): Promise<boolean> {
		return await this.userService.userLogout(ctx);
	}
}
