import { Field, InputType, ObjectType } from 'type-graphql';

import { User } from '../entities/UserEntity';

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

@ObjectType()
export class UserAuth {
	@Field(() => User)
	user!: User;

	@Field(() => String)
	token!: string;
}
