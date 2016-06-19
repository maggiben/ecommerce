import Schema from 'schema-client';
import DataLoader from 'dataloader';
import express from 'express';
import fetch from 'node-fetch';
import graphqlHTTP from 'express-graphql';
import schema from './schemas/products';
import categories from './schemas/categories';
import MoltinUtil from 'moltin-util';
import Moltin from './services/moltin';
import querystring from 'querystring';

// Import loader DataLoader
import Loader from './schemas/loader';

/*
var client = MoltinUtil({
  publicId: 'Si025LTIJVLnzRv2vZzAU6Vgy5RBim8pdspJQegtN8',
  secretKey: 'qWYmQn7GsrkC7hj3UE0zzVI1u9reE9eT2dZsqpwmgu'
})
*/

/*
client.request(client.endpoints.PRODUCTS + '/1274063630890959609')
  .then(resp => console.log(resp))
  .catch(err => console.log('err', err))
;
*/

const client = new Moltin({
  publicId: 'Si025LTIJVLnzRv2vZzAU6Vgy5RBim8pdspJQegtN8',
  secretKey: 'qWYmQn7GsrkC7hj3UE0zzVI1u9reE9eT2dZsqpwmgu'
});
/*
client.request(client.endpoint('PRODUCTS'))
  .then(resp => console.log(resp))
  .catch(err => console.log('err', err))
;
*/

/*
client.createCategory({
  title: 'hello world',
  slug: 'hello-world',
  status: 1,
  description: 'my new category'
})
.then(resp => console.log('new category:', resp))
.catch(err => console.log('err', err));
*/

/*
client.get('/products', {active: true}).then(function(products) {
  console.log(products);
}).catch(function(err) {
  // handle error
});

client.get('/products:variants?parent_id=575e0adfd17cafe158943b44', {active: true}).then(function(variants) {
  console.log(variants);
}).catch(function(err) {
  // handle error
});

client.put('/products:variants/575e0b22d17cafe158943b47', {
    image_id: '575e0adfd17cafe158943b44'
}).then(function(result){
   console.log(result)
}).catch(function(error){
    console.log('error', error);
})
*/

function getProducts() {
  console.log('getProducts')
  return client.request(client.endpoint('PRODUCTS')).then(products => products.result);
}

function getProduct(id) {
  console.log('getProduct')
  return client.request(`${client.endpoint('PRODUCTS')}/${id}`).then(products => products.result);
}

function searchProduct(params) {
  console.log('searchProduct', querystring.stringify(params))
  return client.request(`${client.endpoint('SEARCH')}?${querystring.stringify(params)}`).then(products => products.result);
}

function getCategories() {
  console.log('getCategories')
  return client.request(client.endpoint('TREE')).then(products => products.result);
}

function getCategory(id) {
  console.log('getCategory')
  return client.request(`${client.endpoint('CATEGORIES')}/${id}`).then(products => products.result);
}


const app = express();

app.use(graphqlHTTP(req => {
  const cacheMap = new Map();
  const productsLoader = new DataLoader(keys => Promise.all(keys.map(getProducts)), {cacheMap});
  const productsSearch = new DataLoader(keys => Promise.all(keys.map(searchProduct)), {cacheMap});
  const productLoader = new DataLoader(keys => Promise.all(keys.map(getProduct)), {cacheMap});
  productLoader.loadAll = productsLoader.load.bind(productsLoader, '__all__products__');
  productLoader.search = productsSearch.load.bind(productsSearch);


  const categoriesLoader = new DataLoader(keys => Promise.all(keys.map(getCategories)), {cacheMap});
  const categoryLoader = new DataLoader(keys => Promise.all(keys.map(getCategory)), {cacheMap});
  categoryLoader.loadAll = categoriesLoader.load.bind(categoriesLoader, '__all__categories__');

  const loaders = {
    product: Loader().product,
    category: categoryLoader
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