import express from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import models from './models';

const app = express();

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.use(
  '/graphql',
  bodyParser.json(),
  cors(),
  graphqlExpress(req => ({
    schema,
    context: {
      models,
    },
  })),
);

const graphqlEndpoint = '/graphql';

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: graphqlEndpoint,
  }),
);

models.sequelize.sync().then(() => {
  console.log('LISTENING...')
  return app.listen(4000)
})