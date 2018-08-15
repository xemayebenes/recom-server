import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import { graphQLServer, engine, schema } from './app';

const { createServer } = require('http');

const server = createServer(graphQLServer);

const GRAPHQL_PORT = process.env.PORT || 3001;

engine.listen(
  {
    port: GRAPHQL_PORT,
    graphqlPaths: ['/graphql'],
    httpServer: server,
    launcherOptions: {
      startupTimeout: 3000
    }
  },
  () => {
    console.log(`Listening on port ${GRAPHQL_PORT}`);
    new SubscriptionServer(
      {
        execute,
        subscribe,
        schema
      },
      {
        server,
        path: '/subscriptions'
      }
    );
  }
);
