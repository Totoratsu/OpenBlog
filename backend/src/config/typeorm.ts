import { createConnection } from 'typeorm';
import path from 'path';

export default async function connect(): Promise<void> {
	const {
		DB_HOST,
		DB_PORT,
		DB_USER,
		DB_PASS,
		DB_NAME /* , NODE_ENV */,
	} = process.env;

	await createConnection({
		type: 'postgres',
		host: DB_HOST,
		port: parseInt(DB_PORT || '5432'),
		username: DB_USER,
		password: DB_PASS,
		database: DB_NAME,
		entities: [path.join(__dirname, '../entities/**/*.*')],
		synchronize: true,
		// logging: !NODE_ENV || NODE_ENV === 'dev',
	});
	console.log('Database is Connected');
}
