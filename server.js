import express from 'express';
import config from 'config';
import graphqlHTTP from 'express-graphql';
import schema from './Models/schema';
import Loader from './Models/loaders';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
//app.use(express.static(path.join(__dirname, './public')));

app.get('/', function (req, res, next) {
  res.send('hello world');
});

app.use('/graphql', graphqlHTTP(request => {
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

export default app;
