import { Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

import { Tags } from '../entities/PostEntity';

@Service()
@Resolver()
export class IndexResolver {
	@Query(() => [String])
	Tags(): string[] {
		return Tags;
	}
}
