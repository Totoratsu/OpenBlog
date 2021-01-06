import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { config } from 'dotenv-safe';
import cors from 'cors';

import connectDB from './config/typeorm';
import { UserResolver } from './resolvers/UserResolver';
import { PostResolver } from './resolvers/PostResolvers';
import { IndexResolver } from './resolvers/IndexResolvers';

const port = process.env.PORT || 65000;
async function main() {
	const app = express();

	if (process.env.NODE_ENV != 'pro' || !process.env.NODE_ENV)
		config({ allowEmptyValues: true });

	// Middlewares
	app.use(cors());

	await connectDB(); // Connect to Database

	// Init Apollo Server
	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [UserResolver, PostResolver, IndexResolver],
			validate: false,
		}),
		context: ({ req, res }) => ({ req, res }),
	});
	apolloServer.applyMiddleware({ app, path: '/api' });

	app.listen(port, () => {
		console.log(`Server running on port ${port}`);

		if (!process.env.NODE_ENV || process.env.NODE_ENV === 'dev')
			console.log(`\tGraphql server in http://localhost:${port}/api`);
	});
}

main();
