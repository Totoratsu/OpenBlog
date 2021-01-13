import { Field, InputType } from 'type-graphql';

import { User } from '../entities/UserEntity';

@InputType()
export class PostInput {
	@Field()
	title!: string;

	@Field()
	description!: string;

	@Field()
	content!: string;

	@Field()
	author!: number;
}

@InputType()
export class PostUpdateInput {
	@Field(() => String, { nullable: true })
	title?: string;

	@Field(() => String, { nullable: true })
	description?: string;

	@Field(() => String, { nullable: true })
	content?: string;

	@Field(() => String, { nullable: true })
	author?: User;
}
