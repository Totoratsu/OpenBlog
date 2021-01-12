/* eslint-disable @typescript-eslint/no-explicit-any */
import { hash, verify } from 'argon2';
import { Service, Inject } from 'typedi';
import { getRepository } from 'typeorm';

import { IUser, MyContext } from '../types/main';
import { UserUpdateInput } from '../types/UserTypes';
import { User } from '../entities/UserEntity';

@Service()
export class UserService {
	@Inject('USER_REPO')
	private readonly repo = getRepository(User);

	async createOne({ username, email, password }: IUser): Promise<User | null> {
		const user = await this.findOne({ email });
		if (user) throw new Error('User Already Exists');

		const newUser = new User(username, email, await hash(password));
		await this.repo.save(newUser);

		return newUser;
	}

	async deleteOne(id: number): Promise<boolean> {
		await this.repo.delete(id);
		return true;
	}

	async updateOne(id: number, fields: UserUpdateInput): Promise<boolean> {
		const { email, username, newpassword } = fields;
		const user = await this.findOne(id);
		if (
			!user ||
			(fields.password && !(await verify(user.password, fields.password)))
		)
			return false;

		if (email) user.email = email;
		if (username) user.username = username;
		if (newpassword) user.password = newpassword;

		await this.repo.save(user);

		return true;
	}

	async find(): Promise<User[]> {
		return (await this.repo.find()) || new Array<User>();
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	async findOne(dat: any): Promise<User | null> {
		const user = await this.repo.findOne(dat);
		if (!user) return null;

		return user;
	}

	// Custom Services
	async userLogin(
		email: string,
		password: string,
		ctx: MyContext
	): Promise<User | null> {
		const user = await this.findOne({ email });
		if (!user || !verify(user.password, password)) return null;

		ctx.req.session.userId = user.id;

		return user;
	}

	async userLogout(ctx: MyContext): Promise<boolean> {
		return new Promise((res, rej) =>
			ctx.req.session.destroy((err: Error) => {
				if (err) return rej(false);

				ctx.res.clearCookie('tdevblog');
				return res(true);
			})
		);
	}
}
