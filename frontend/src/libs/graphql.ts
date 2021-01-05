import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: 'http://localhost:65000/api'
});

export async function sendQuery(query: any) {
    try {
        const res = await client.query({ query });
        if (!res) return false;

        return res.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
}