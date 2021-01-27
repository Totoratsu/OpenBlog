import { GraphQLClient } from 'graphql-request';

const { API_ROOT = 'http://localhost:65000' } = process.env;

const client = new GraphQLClient(`${API_ROOT}/api`);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function sendQuery(
	query: string,
	vars = {},
	token?: string
): Promise<any> {
	const res = await client.request(query, vars, {
		authorization: `Bearer ${token}`,
	});
	if (!res) return false;

	return res;
}
