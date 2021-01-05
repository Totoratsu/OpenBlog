import { ObjectType, Field } from 'type-graphql';
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	OneToOne,
	JoinColumn,
	ManyToOne,
} from 'typeorm';
import { User } from './UserEntity';

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

	@Field()
	@ManyToOne(() => User)
	@JoinColumn()
	author!: User;

	constructor(
		title: string,
		description: string,
		content: string,
		author: User
	) {
		super();

		this.title = title;
		this.description = description;
		this.content = content;
		this.author = author;
	}
}
