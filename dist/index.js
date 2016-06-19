'use strict';

var _schemaClient = require('schema-client');

var _schemaClient2 = _interopRequireDefault(_schemaClient);

var _dataloader = require('dataloader');

var _dataloader2 = _interopRequireDefault(_dataloader);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _store = require('../schemas/store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var client = new _schemaClient2.default.Client('pirulo123', 'J077KPB3m0urKzUxCSFszlwd3AzhgEmH');

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
  return client.get('/products', { active: true });
}
function getProduct(id) {
  return client.get('/products/' + id);
}

var app = (0, _express2.default)();

app.use((0, _expressGraphql2.default)(function (req) {
  var cacheMap = new Map();
  var productsLoader = new _dataloader2.default(function (keys) {
    return Promise.all(keys.map(getProducts));
  }, { cacheMap: cacheMap });
  var productLoader = new _dataloader2.default(function (keys) {
    return Promise.all(keys.map(getProduct));
  }, {
    cacheKeyFn: function cacheKeyFn(key) {
      return '/products/' + key + '/';
    },
    cacheMap: cacheMap
  });
  //const personByURLLoader = new DataLoader(keys => Promise.all(keys.map(getPersonByURL)), {cacheMap});

  productLoader.loadAll = productsLoader.load.bind(productsLoader, '__all__');
  //productLoader.loadByURL = personByURLLoader.load.bind(personByURLLoader);
  //productLoader.loadManyByURL = personByURLLoader.loadMany.bind(personByURLLoader);

  var loaders = { produc: productLoader };

  return {
    context: { loaders: loaders },
    graphiql: true,
    schema: _store2.default
  };
}));

app.listen(5000, function () {
  return console.log('GraphQL Server running at http://localhost:5000');
});

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