import DataLoader from 'dataloader';
import Moltin from '../services/moltin';
import querystring from 'querystring';

const client = new Moltin({
  publicId: 'Si025LTIJVLnzRv2vZzAU6Vgy5RBim8pdspJQegtN8',
  secretKey: 'qWYmQn7GsrkC7hj3UE0zzVI1u9reE9eT2dZsqpwmgu'
});

module.exports = function () {
  // ensure cached per request...
  return {
    product: Product(),
    category: Category()
  };
};

/*
const cacheMap = new Map();
const productsLoader = new DataLoader(keys => Promise.all(keys.map(getProducts)), {cacheMap});
const productsSearch = new DataLoader(keys => Promise.all(keys.map(searchProduct)), {cacheMap});
const productLoader = new DataLoader(keys => Promise.all(keys.map(getProduct)), {cacheMap});
productLoader.loadAll = productsLoader.load.bind(productsLoader, '__all__products__');
productLoader.search = productsSearch.load.bind(productsSearch);


const categoriesLoader = new DataLoader(keys => Promise.all(keys.map(getCategories)), {cacheMap});
const categoryLoader = new DataLoader(keys => Promise.all(keys.map(getCategory)), {cacheMap});
categoryLoader.loadAll = categoriesLoader.load.bind(categoriesLoader, '__all__categories__');
*/

function Product() {
  const cacheMap = new Map();
  let product = new DataLoader(ids => Promise.all(ids.map(getProduct)), {cacheMap});
  let all = new DataLoader(ids => Promise.all(ids.map(getProducts)), {cacheMap});
  let search = new DataLoader(ids => Promise.all(ids.map(searchProduct)), {cacheMap});
  product.loadAll = all.load.bind(all, '__all__products__');
  product.search = search.load.bind(search);
  return product;
}

function Category() {
  const cacheMap = new Map();
  return new DataLoader(ids => {
    Promise.all(ids.map(getCategory));
  }, {cacheMap});
}

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