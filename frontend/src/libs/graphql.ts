import { request } from 'graphql-request';

const URI = 'http://localhost:65000/api';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function sendQuery(query: string): Promise<any> {
	try {
		const res = await request(URI, query);
		if (!res) return false;

		return res;
	} catch (e) {
		console.log(e);
		throw e;
	}
}
