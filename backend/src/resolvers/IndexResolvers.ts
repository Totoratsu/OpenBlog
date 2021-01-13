import { Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

const tags = ['js', 'css', 'html', 'python', 'other'];

@Service()
@Resolver()
export class IndexResolver {
	@Query(() => [String])
	Tags(): string[] {
		return tags;
	}
}
