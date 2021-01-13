import {
	Resolver,
	Mutation,
	Arg,
	Int,
	Query,
	UseMiddleware,
} from 'type-graphql';

import { isAuth } from '../middlewares/UserMiddlewares';
import { Post } from '../entities/PostEntity';
import { PostInput, PostUpdateInput } from '../types/PostTypes';
import { PostService } from '../services/PostService';

@Resolver()
export class PostResolver {
	constructor(private readonly postService: PostService) { }

	@UseMiddleware(isAuth)
	@Mutation(() => Post, { nullable: true })
	async createPost(
		@Arg('fields', () => PostInput) fields: PostInput
	): Promise<Post | null> {
		return await this.postService.createOne(fields);
	}

	@UseMiddleware(isAuth)
	@Mutation(() => Boolean)
	async deletePost(@Arg('id', () => Int) id: number): Promise<boolean> {
		return await this.postService.deleteOne(id);
	}

	@UseMiddleware(isAuth)
	@Mutation(() => Boolean, { nullable: true })
	async updatePost(
		@Arg('id', () => Int) id: number,
		@Arg('fields', () => PostUpdateInput) fields: PostUpdateInput
	): Promise<boolean | null> {
		return await this.postService.updateOne(id, fields);
	}

	@Query(() => [Post])
	async Posts(@Arg('limit', () => Int) limit: number): Promise<Post[]> {
		return await this.postService.find(limit);
	}

	@Query(() => Post, { nullable: true })
	async Post(@Arg('id', () => Int) id: number): Promise<Post | null> {
		return await this.postService.findOne(id);
	}
}
