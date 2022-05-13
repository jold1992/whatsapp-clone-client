import {
    ApolloClient,
    InMemoryCache,
    split,
    HttpLink,
} from '@apollo/client'
import { getMainDefinition } from 'apollo-utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';


const httpUri = process.env.REACT_APP_SERVER_URL + '/graphql';
const wsUri = httpUri.replace(/^https?/, 'ws');

const httpLink = new HttpLink({
    uri: httpUri,
});


const wsLink = new GraphQLWsLink(createClient({
    url: wsUri,
}));

const splitLink = split(
    ({ query }) => {

        const definition = getMainDefinition(query);

        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,

);

export default new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
});


// const httpLink = createUploadLink({
//     uri: httpUri
// });

// const wsLink = new WebSocketLink({
//     uri: wsUri,
//     options: {
//         // Automatic reconnect in case of connection error
//         reconnect: true,
//     },
// });

// export interface Definition {
//     kind: string;
//     operation?: string;
// }
// const terminatingLink = split(
//     ({ query }) => {
//         const { kind, operation }: Definition = getMainDefinition(query);
//         // If this is a subscription query, use wsLink, otherwise use httpLink
//         return kind === 'OperationDefinition' && operation === 'subscription';
//     },
//     wsLink,
//     httpLink as any,
// );

// const link = ApolloLink.from([
//     onError(({ graphQLErrors, networkError }) => {
//         if (graphQLErrors)
//             graphQLErrors.forEach(({ message, locations, path }) =>
//                 console.log(
//                     `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
//                 ),
//             );
//         if (networkError) {
//             console.log(`[Network error]: ${networkError}`)
//             //logoutUser
//         }
//     }),
//     terminatingLink
// ]);

// const inMemoryCache = new InMemoryCache();

// export default new ApolloClient({
//     cache: inMemoryCache,
//     link: link
// });