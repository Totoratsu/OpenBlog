import { MiddlewareFn } from 'type-graphql';
import { getRepository } from 'typeorm';

import { MyContext } from '../types/main';
import { User } from '../entities/UserEntity';

export const isAuth: MiddlewareFn<MyContext> = async (
	{ context: { req } },
	next
) => {
	const repo = getRepository(User);

	if (!req.session.userId) throw new Error('Unauthorized');

	const user = repo.findOne(req.session.userId);
	if (!user) throw new Error('Unauthorized');

	return next();
};
