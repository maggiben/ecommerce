import express from 'express';
import config from 'config';
import graphqlHTTP from 'express-graphql';
import schema from './Models/schema';
import Loader from './Models/loaders';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import favicon from 'serve-favicon';

const app = express();
// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// use sessions
app.use(session({
    secret: 'secret',
    name: 'cookie_name',
    cookie: { maxAge: 60000 },
    //store: sessionStore, // connect-mongo session store
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
// disable 'X-Powered-By' header in response
app.disable('x-powered-by');
// use cookie
app.use(cookieParser());
// enable CORS - Cross Origin Resource Sharing
app.use(cors());
// serve favicon
app.use(favicon(__dirname + '/public/favicon.png'));
//app.use(express.static(path.join(__dirname, './public')));

app.get('/', function (request, response, next) {
  response.send('GQL endpoint is => /graphql\n' + JSON.stringify(request.session, null, 2));
});

app.use('/graphql', graphqlHTTP(request => {
  const loaders = {
    product: Loader().product,
    category: Loader().category
  };

  return {
    context: {
      session: request.session,
      loaders: loaders
    },
    pretty: true,
    graphiql: true,
    rootValue: request,
    schema,
  };
}));

export default app;
