import Schema from 'schema-client';
import DataLoader from 'dataloader';
import express from 'express';
import fetch from 'node-fetch';
import graphqlHTTP from 'express-graphql';
import schema from './schemas/products';
import categories from './schemas/categories';
import MoltinUtil from 'moltin-util';


var client = new Schema.Client('pirulo123', 'J077KPB3m0urKzUxCSFszlwd3AzhgEmH');
const moltin = require('moltin')({
  publicId: 'Si025LTIJVLnzRv2vZzAU6Vgy5RBim8pdspJQegtN8',
  secretKey: 'qWYmQn7GsrkC7hj3UE0zzVI1u9reE9eT2dZsqpwmgu'
});

moltin.Authenticate(function() {
  console.log('moltin authenticated')
});

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
  return client.get('/products', {active: true});
}

function getProduct(id) {
  //console.log(`getProduct: ${id}`)
  return client.get(`/products/${id}`);
}

function getCategory(id) {
  //console.log(`getCategory: ${id}`)
  return client.get(`/categories/${id}`);
}


const app = express();

app.use(graphqlHTTP(req => {
  const cacheMap = new Map();
  const productsLoader = new DataLoader(keys => Promise.all(keys.map(getProducts)), {cacheMap});
  /*const productLoader = new DataLoader(keys => Promise.all(keys.map(getProduct)), {
    cacheKeyFn: key => `/products/${key}/`,
    cacheMap,
  });*/

  const productLoader = new DataLoader(keys => Promise.all(keys.map(getProduct)), {cacheMap});
  const categoryLoader = new DataLoader(keys => Promise.all(keys.map(getCategory)), {cacheMap});

  //const personByURLLoader = new DataLoader(keys => Promise.all(keys.map(getPersonByURL)), {cacheMap});
  
  productLoader.loadAll = productsLoader.load.bind(productsLoader, '__all__');
  //productLoader.loadByURL = personByURLLoader.load.bind(personByURLLoader);
  //productLoader.loadManyByURL = personByURLLoader.loadMany.bind(personByURLLoader);
  
  const loaders = {
    product: productLoader,
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

/*

client.put('/:models/products', {
    fields: {
        my_custom_field: {
            type: 'string',
            default: 'Hello World'
        }
    }
}).then(function(result){
   console.log(result)
}).catch(function(error){
    console.log('error', error);
})

client.get('/:models/products', function(productModel) {
    console.log(productModel);
});
*/