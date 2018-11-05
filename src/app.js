import express from 'express';
import cors from 'cors';

import jwt from 'express-jwt';
import jsonwebtoken from 'jsonwebtoken';

import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import { ApolloEngine } from 'apollo-engine';

import MovieDataBaseAPI from './datasources/movieDataBase';
import OmdbAPI from './datasources/omdb';
import DataBase from './database';
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

const resolvers = Resolvers({
  dataBaseService: dataBase
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

const jwtCheck = jwt({ secret }); //.unless({ path: ['/graphql'], method: 'GET' }); // change out your secret for each environment
graphQLServer.post('/graphql', jwtCheck);
graphQLServer.use(cors());

//TODO CHANGE TO MODULE
graphQLServer.post('/token', bodyParser.json(), async (req, res) => {
  const { email, password } = req.body;
  const user = await dataBase.getUserByEmailPassword(email, password);
  if (!user) {
    res.status(400).send({ code: 'INVALID_CREDENTIALS' });
  }
  res.send({
    success: true,
    jwt: generateJWT({ userId: user.id })
  });
});

graphQLServer.post('/register', bodyParser.json(), async (req, res) => {
  const { email, password, user } = req.body;

  const [userByEmail, userByNick] = await Promise.all([
    dataBase.getUserByEmail(email),
    dataBase.getUserByUser(user)
  ]);

  if (userByEmail) {
    res.status(400).send({ code: 'INVALID_EMAIL' });
  }

  if (userByNick) {
    res.status(400).send({ code: 'INVALID_USER' });
  }

  const newUser = await dataBase.createUser(email, password, user);

  if (!newUser) {
    res.status(400).send({ code: 'INVALID_CREDENTIALS' });
  }
  res.send({
    success: true,
    jwt: generateJWT({ userId: newUser.id })
  });
});

const server = new ApolloServer({
  typeDefs: schema.typeDefs,
  resolvers: schema.resolvers,
  tracing: true,
  cacheControl: true,
  engine: false,
  dataSources: () => {
    return {
      MovieDataBaseAPI: new MovieDataBaseAPI(),
      OmdbAPI: new OmdbAPI()
    };
  },
  context: ({ req, connection }) => {
    if (connection) {
      return {};
    } else {
      return req.user;
    }
  }
});
server.applyMiddleware({
  app: graphQLServer,
  path: '/graphql',
  gui: {
    endpoint: '/graphql',
    subscriptionEndpoint: `ws://localhost:3001/graphql`
  }
});

export { graphQLServer, engine, schema, server };
