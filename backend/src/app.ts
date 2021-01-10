import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { config } from 'dotenv-safe';
import cors from 'cors';
import session from 'express-session';
import connectRedis from 'connect-redis';

import connectDB from './config/typeorm';
import { UserResolver } from './resolvers/UserResolver';
import { PostResolver } from './resolvers/PostResolvers';
import { IndexResolver } from './resolvers/IndexResolvers';
import { redis } from './redis';

const {
	PORT = 65000,
	CORS_ORIGIN = `http://localhost:${PORT}`,
	NODE_ENV = 'dev',
	SESSION_SECRET = 'secret123',
} = process.env;

async function main() {
	const app = express();
	const RedisStore = connectRedis(session);

	if (NODE_ENV != 'pro' || !NODE_ENV) config({ allowEmptyValues: true });

	// Middlewares
	app.use(
		cors({
			credentials: true,
			origin: CORS_ORIGIN,
		})
	);
	app.use(
		session({
			store: new RedisStore({
				client: redis,
			}),
			name: 'tdevblog',
			secret: SESSION_SECRET,
			resave: false,
			saveUninitialized: false,
			cookie: {
				httpOnly: true,
				secure: NODE_ENV === 'pro',
				maxAge: 604800000, // 7 days
			},
		})
	);

	// Init Apollo Server
	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [UserResolver, PostResolver, IndexResolver],
			validate: false,
		}),
		context: ({ req, res }) => ({ req, res }),
	});
	apolloServer.applyMiddleware({ app, path: '/api' });

	app.listen(PORT, async () => {
		console.log(`Server running on port ${PORT}`);

		await connectDB(); // Connect to Database

		if (!NODE_ENV || NODE_ENV === 'dev')
			console.log(`\tGraphql server in http://localhost:${PORT}/api`);
	});
}

main();
