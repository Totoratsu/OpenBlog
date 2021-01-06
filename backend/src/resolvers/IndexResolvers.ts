import { Query, Resolver } from "type-graphql";

const tags = [
    'js', 'css', 'html', 'python', 'other'
];

@Resolver()
export class IndexResolver {
    @Query(() => [String])
    Tags(): string[] {
        return tags;
    }
}