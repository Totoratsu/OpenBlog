import { MiddlewareFn } from 'type-graphql';
import { getRepository } from 'typeorm';

import { MyContext } from '../types/MyContext';
import { User } from '../entities/UserEntity';

const repo = getRepository(User);

export const isAuth: MiddlewareFn<MyContext> = async (
	{ context: { req } },
	next
) => {
	if (!req.session.userId) throw new Error('Unauthorized');

	const user = repo.findOne(req.session.userId);
	if (!user) throw new Error('Unauthorized');

	return next();
};
