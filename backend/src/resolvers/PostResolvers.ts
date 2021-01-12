import {
	Resolver,
	Mutation,
	Arg,
	Int,
	Query,
	InputType,
	Field,
	UseMiddleware,
} from 'type-graphql';
import { getRepository } from 'typeorm';

import { isAuth } from '../middlewares/UserMiddlewares';
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

	@UseMiddleware(isAuth)
	@Mutation(() => Post, { nullable: true })
	async createPost(
		@Arg('fields', () => PostInput) fields: PostInput
	): Promise<Post | null> {
		const { title, description, content, author } = fields;

		const user = await this.userRepo.findOne(author);
		if (!user) throw new Error('Invalid User');

		const post = await this.repo.findOne({ title });
		if (post) throw new Error('Post Already exists');

		const newPost = new Post(title, description, content, user);
		await this.repo.save(newPost);

		return newPost;
	}

	@UseMiddleware(isAuth)
	@Mutation(() => Boolean)
	async deletePost(@Arg('id', () => Int) id: number): Promise<boolean> {
		await this.repo.delete(id);
		return true;
	}

	@UseMiddleware(isAuth)
	@Mutation(() => Boolean, { nullable: true })
	async updatePost(
		@Arg('id', () => Int) id: number,
		@Arg('fields', () => PostUpdateInput) fields: PostUpdateInput
	): Promise<boolean | null> {
		const Post = await this.repo.findOne(id);
		if (!Post) throw new Error('Post not Found');

		//if (fields.author) Post.author = fields.author;
		if (fields.content) Post.content = fields.content;
		if (fields.description) Post.description = fields.description;
		if (fields.title) Post.title = fields.title;

		await Post.save();

		return true;
	}

	@Query(() => [Post])
	async Posts(@Arg('limit', () => Int) limit: number): Promise<Post[]> {
		const posts = await this.repo.find({ relations: ['author'], take: limit });

		return posts || new Array<Post>();
	}

	@Query(() => Post, { nullable: true })
	async Post(@Arg('id', () => Int) id: number): Promise<Post | null> {
		const post = await this.repo.findOne(id, { relations: ['author'] });
		if (!post) throw new Error('Post not Found');

		return post;
	}
}
