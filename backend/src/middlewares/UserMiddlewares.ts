import { MiddlewareFn } from 'type-graphql';
import { getRepository } from 'typeorm';
import { verify } from 'jsonwebtoken';

import { MyContext, IUser } from '../types/main';
import { User } from '../entities/UserEntity';

const { JWT_SEED = 'secretJWT' } = process.env;

export const isAuth: MiddlewareFn<MyContext> = async (
	{ context: { req } },
	next
) => {
	const repo = getRepository(User);

	const header = req.get('authorization');
	if (!header) throw new Error('Unauthorized');

	const token = header.split(' ')[1];
	if (!token || token === '') throw new Error('Unauthorized');

	const decodedToken = verify(token, JWT_SEED) as IUser;
	if (!decodedToken) throw new Error('Unauthorized');

	const user = await repo.findOne(decodedToken.id);
	if (!user) throw new Error('Unauthorized');

	return next();
};
