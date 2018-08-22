import express from 'express';
import cors from 'cors';

import jwt from 'express-jwt';
import jsonwebtoken from 'jsonwebtoken';

import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import { ApolloEngine } from 'apollo-engine';

import MovieDataBaseService from './connectors/movieDataBase';
import OmdbService from './connectors/omdb';
import DataBase from './connectors/database';
import Connectors from './connectors';
import Resolvers from './resolvers';
import Schema from './schema';

const generateJWT = ({ userId }) =>
  jsonwebtoken.sign({ userId }, 'xema2018', {
    expiresIn: 172800 // 2 days if not set
  });

const dataBase = DataBase({
  dbAddress: 'mongodb://localhost/recom'
});

dataBase.connect();

const movieDataBaseService = MovieDataBaseService({
  //apiKey:''
});
const omdbService = OmdbService({
  //apiKey: ''
});
const connectors = Connectors({
  movieDataBaseService,
  omdbService,
  dataBaseService: dataBase
});

const resolvers = Resolvers({
  connectors
});

const schema = Schema({
  resolvers
});

const ENGINE_API_KEY = 'service:xemayebenes-5525:pUrFWPsXjneQ0AM-fG9JMw'; // TODO

const engine = new ApolloEngine({
  apiKey: ENGINE_API_KEY,
  stores: [
    {
      name: 'inMemEmbeddedCache',
      inMemory: {
        cacheSize: 20971520 // 20 MB
      }
    }
  ],
  queryCache: {
    publicFullQueryStore: 'inMemEmbeddedCache'
  }
});

const secret = process.env.JWT_SECRET || 'xema2018';
const graphQLServer = express();

const jwtCheck = jwt({ secret }); // change out your secret for each environment
//graphQLServer.use(jwtCheck);
graphQLServer.use(cors());

//TODO CHANGE TO MODULE
graphQLServer.post('/token', bodyParser.json(), async (req, res) => {
  const { email, password } = req.body;
  const user = await dataBase.getUserByEmailPassword(email, password);
  if (!user) {
    res.send({
      success: false,
      jwt: null
    });
  }
  res.send({
    success: true,
    jwt: generateJWT({ userId: user.id })
  });
});

graphQLServer.use(
  '/graphql',
  bodyParser.json(),
  jwtCheck,
  graphqlExpress(req => ({
    context: req.user,
    schema,
    tracing: true,
    cacheControl: true
  }))
);

graphQLServer.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://localhost:3001/subscriptions`
  })
);

export { graphQLServer, engine, schema };
