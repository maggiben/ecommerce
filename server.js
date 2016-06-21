import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './Models/schema';
import Loader from './Models/loaders';

const app = express();

app.use(graphqlHTTP(req => {
  const loaders = {
    product: Loader().product,
    category: Loader().category
  };

  return {
    context: {loaders},
    graphiql: true,
    schema,
  };
}));

app.listen(
  5000,
  () => console.log('GraphQL Server running at http://localhost:5000')
);