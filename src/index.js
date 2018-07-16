import { graphQLServer, engine } from './app';

const GRAPHQL_PORT = process.env.PORT || 3001;

engine.listen(
  {
    port: GRAPHQL_PORT,
    graphqlPaths: ['/graphql'],
    expressApp: graphQLServer,
    launcherOptions: {
      startupTimeout: 3000
    }
  },
  () => {
    console.log(`Listening on port ${GRAPHQL_PORT}`);
  }
);
