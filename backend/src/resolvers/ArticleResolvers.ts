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

import { Article } from '../entities/ArticleEntity';
import { User } from '../entities/UserEntity';

@InputType()
class ArticleInput {
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
class ArticleUpdateInput {
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
export class ArticleResolver {
	repo = getRepository(Article);
	userRepo = getRepository(User);

	@Mutation(() => Article)
	async createArticle(
		@Arg('fields', () => ArticleInput) fields: ArticleInput
	): Promise<Article | boolean> {
		const { title, description, content, author } = fields;

		const user = await this.userRepo.findOne(author);
		if (!user) return false;

		const newArticle = new Article(title, description, content, user);
		return await this.repo.save(newArticle);
	}

	@Mutation(() => Boolean)
	async deleteArticle(@Arg('id', () => Int) id: number): Promise<boolean> {
		await this.repo.delete(id);
		return true;
	}

	@Mutation(() => Boolean)
	async updateArticle(
		@Arg('id', () => Int) id: number,
		@Arg('fields', () => ArticleUpdateInput) fields: ArticleUpdateInput
	): Promise<boolean> {
		const article = await this.repo.findOne(id);
		if (!article) return false;

		if (fields.author) article.author = fields.author;
		if (fields.content) article.content = fields.content;
		if (fields.description) article.description = fields.description;
		if (fields.title) article.title = fields.title;

		await article.save();

		return true;
	}

	@Query(() => [Article])
	async Articles(): Promise<Article[]> {
		return await this.repo.find();
	}
}
