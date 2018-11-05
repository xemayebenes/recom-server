import { graphQLServer, engine, server as apolloServer } from './app';

const { createServer } = require('http');

const server = createServer(graphQLServer);
apolloServer.installSubscriptionHandlers(server);
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
    console.log(`Subscription on port ${apolloServer.subscriptionsPath}`);
  }
);
