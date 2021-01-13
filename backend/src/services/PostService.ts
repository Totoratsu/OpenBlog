/* eslint-disable @typescript-eslint/no-explicit-any */
import { Service, Inject } from 'typedi';
import { getRepository } from 'typeorm';

import { Post } from '../entities/PostEntity';
import { PostInput, PostUpdateInput } from '../types/PostTypes';
import { User } from '../entities/UserEntity';

@Service()
export class PostService {
	@Inject('POST_REPO')
	private readonly repo = getRepository(Post);
	private readonly userRepo = getRepository(User);

	async createOne(fields: PostInput): Promise<Post | null> {
		const { title, description, content, author } = fields;

		const user = await this.userRepo.findOne(author);
		if (!user) throw new Error('Invalid User');

		const post = await this.repo.findOne({ title });
		if (post) throw new Error('Post Already exists');

		const newPost = new Post(title, description, content, user);
		await this.repo.save(newPost);

		return newPost;
	}

	async deleteOne(id: number): Promise<boolean> {
		await this.repo.delete(id);
		return true;
	}

	async updateOne(
		id: number,
		fields: PostUpdateInput
	): Promise<boolean | null> {
		const Post = await this.findOne(id);
		if (!Post) throw new Error('Post not Found');

		if (fields.content) Post.content = fields.content;
		if (fields.description) Post.description = fields.description;
		if (fields.title) Post.title = fields.title;

		await Post.save();

		return true;
	}

	async find(limit: number): Promise<Post[]> {
		const posts = await this.repo.find({ relations: ['author'], take: limit });

		return posts || new Array<Post>();
	}

	async findOne(id: number): Promise<Post | null> {
		const post = await this.repo.findOne(id, { relations: ['author'] });
		if (!post) return null;

		return post;
	}
}
