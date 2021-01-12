import { Field, InputType } from 'type-graphql';

@InputType()
export class UserInput {
	@Field()
	username!: string;

	@Field()
	email!: string;

	@Field()
	password!: string;
}

@InputType()
export class UserUpdateInput {
	@Field(() => String, { nullable: true })
	password?: string;

	@Field(() => String, { nullable: true })
	newpassword?: string;

	@Field(() => String, { nullable: true })
	email?: string;

	@Field(() => String, { nullable: true })
	username?: string;
}
