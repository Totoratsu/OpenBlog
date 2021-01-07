import {
	Resolver,
	Mutation,
	Arg,
	Int,
	Query,
	InputType,
	Field,
} from 'type-graphql';
import { getRepository } from 'typeorm';

import { Post } from '../entities/PostEntity';
import { User } from '../entities/UserEntity';

@InputType()
class PostInput {
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
class PostUpdateInput {
	@Field(() => String, { nullable: true })
	title?: string;

	@Field(() => String, { nullable: true })
	description?: string;

	@Field(() => String, { nullable: true })
	content?: string;

	@Field(() => String, { nullable: true })
	author?: User;
}

@Resolver()
export class PostResolver {
	repo = getRepository(Post);
	userRepo = getRepository(User);

	@Mutation(() => Post)
	async createPost(
		@Arg('fields', () => PostInput) fields: PostInput
	): Promise<Post | boolean> {
		const { title, description, content, author } = fields;

		const user = await this.userRepo.findOne(author);
		if (!user) return false;

		const newPost = new Post(title, description, content, user);
		return await this.repo.save(newPost);
	}

	@Mutation(() => Boolean)
	async deletePost(@Arg('id', () => Int) id: number): Promise<boolean> {
		await this.repo.delete(id);
		return true;
	}

	@Mutation(() => Boolean)
	async updatePost(
		@Arg('id', () => Int) id: number,
		@Arg('fields', () => PostUpdateInput) fields: PostUpdateInput
	): Promise<boolean> {
		const Post = await this.repo.findOne(id);
		if (!Post) return false;

		//if (fields.author) Post.author = fields.author;
		if (fields.content) Post.content = fields.content;
		if (fields.description) Post.description = fields.description;
		if (fields.title) Post.title = fields.title;

		await Post.save();

		return true;
	}

	@Query(() => [Post])
	async Posts(@Arg('limit', () => Int) limit: number): Promise<Post[]> {
		return await this.repo.find({ relations: ['author'], take: limit });
	}

	@Query(() => Post)
	async Post(@Arg('id', () => Int) id: number): Promise<Post | boolean> {
		const post = await this.repo.findOne(id, { relations: ['author'] });
		if (!post) return false;

		return post;
	}
}
