import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { config } from 'dotenv-safe';
import cors from 'cors';
import session from 'express-session';
import connectRedis from 'connect-redis';
import {
	fieldExtensionsEstimator,
	getComplexity,
	simpleEstimator,
} from 'graphql-query-complexity';
import { Container } from 'typedi';

import connectDB from './config/typeorm';
import { UserResolver } from './resolvers/UserResolver';
import { PostResolver } from './resolvers/PostResolvers';
import { IndexResolver } from './resolvers/IndexResolvers';
import { redis } from './redis';

const {
	PORT = 65000,
	CORS_ORIGIN = `http://localhost:3000`, // your frontend domain
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
	const schema = await buildSchema({
		resolvers: [UserResolver, PostResolver, IndexResolver],
		validate: false,
		container: Container,
	});
	const apolloServer = new ApolloServer({
		schema,
		context: ({ req, res }) => ({ req, res }),
		plugins: [
			{
				requestDidStart: () => ({
					didResolveOperation({ request, document }) {
						const complexity = getComplexity({
							schema,
							operationName: request.operationName,
							query: document,
							variables: request.variables,
							estimators: [
								fieldExtensionsEstimator(),
								simpleEstimator({ defaultComplexity: 1 }),
							],
						});
						if (complexity > 20) {
							throw new Error(
								`Sorry, too complicated query! ${complexity} is over 20 that is the max allowed complexity.`
							);
						}
						//console.log('Used query complexity points:', complexity);
					},
				}),
			},
		],
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
