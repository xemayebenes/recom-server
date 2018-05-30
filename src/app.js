import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import { ApolloEngine } from 'apollo-engine';

import schema from './schema';

const ENGINE_API_KEY = 'service:xemayebenes-5525:pUrFWPsXjneQ0AM-fG9JMw'; // TODO

const engine = new ApolloEngine({
    apiKey: ENGINE_API_KEY,
    stores: [{
        name: 'inMemEmbeddedCache',
        inMemory: {
            cacheSize: 20971520 // 20 MB
        }
    }],
    queryCache: {
        publicFullQueryStore: 'inMemEmbeddedCache'
    }
});

const graphQLServer = express();

graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({
    schema,
    tracing: true,
    cacheControl: true
}));
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// graphQLServer.listen(GRAPHQL_PORT, () =>
//     console.log(
//         `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
//     )
// );



export { graphQLServer, engine };