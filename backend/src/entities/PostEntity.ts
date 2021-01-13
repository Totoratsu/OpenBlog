import { ObjectType, Field } from 'type-graphql';
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	JoinColumn,
	ManyToOne,
} from 'typeorm';
import { User } from './UserEntity';

export const Tags = ['js', 'css', 'html', 'python', 'other'];

@ObjectType()
@Entity()
export class Post extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	title!: string;

	@Field()
	@Column()
	description!: string;

	@Field()
	@Column()
	content!: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	tags!: string;

	@Field()
	@ManyToOne(() => User)
	@JoinColumn()
	author!: User;

	constructor(
		title: string,
		description: string,
		content: string,
		author: User,
		tags?: string
	) {
		super();

		this.title = title;
		this.description = description;
		this.content = content;
		this.author = author;
		if (tags) this.tags = tags;
	}
}
