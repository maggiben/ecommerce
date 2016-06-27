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

function Product() {
  const cacheMap = new Map();
  const variationsCacheMap = new Map();
  const modifiersCacheMap = new Map();

  let product = new DataLoader(ids => Promise.all(ids.map(getProduct)), {cacheMap});
  let all = new DataLoader(ids => Promise.all(ids.map(getProducts)), {cacheMap});
  let search = new DataLoader(ids => Promise.all(ids.map(searchProduct)), {cacheMap});
  let variations = new DataLoader(ids => Promise.all(ids.map(getProductsVariations)), {variationsCacheMap});
  let modifiers = new DataLoader(ids => Promise.all(ids.map(getProductsModifiers)), {modifiersCacheMap});
  product.loadAll = all.load.bind(all, '__all__products__');
  product.search = search.load.bind(search);
  product.variations = variations.load.bind(variations);
  product.modifiers = modifiers.load.bind(modifiers);
  return product;
}

function Category() {
  const cacheMap = new Map();
  let category = new DataLoader(ids => Promise.all(ids.map(getCategory)), {cacheMap});
  let all = new DataLoader(ids => Promise.all(ids.map(getCategories)), {cacheMap});
  let search = new DataLoader(ids => Promise.all(ids.map(searchCategory)), {cacheMap});
  category.loadAll = all.load.bind(all, '__all__categories__');
  category.search = search.load.bind(search);
  return category
}

function getProducts() {
  console.log('getProducts')
  return client.Product.Get();
}

function getProduct(id) {
  console.log('getProduct')
  return client.Product.Get(id).then(products => products.result);
}

function getProductsVariations(id) {
  console.log('getProductsVariations');
  return client.Product.Variations(id).then(variations => variations.result);
}

function getProductsModifiers(id) {
  console.log('getProductsModifiers');
  return client.Product.Modifiers(id).then(modifiers => modifiers.result);
}

function searchProduct(terms) {
  console.log('searchProduct', querystring.stringify(terms))
  return client.Product.Search(terms);
}

function getCategories() {
  console.log('getCategories')
  return client.Category.Tree().then(products => products.result);
}

function getCategory(id) {
  console.log('getCategory')
  return client.Category.Get(id).then(category => category.result);
}

function searchCategory(terms) {

  return client.Category.Search(terms);
  console.log('searchCategory', querystring.stringify(terms))
  let url = `${client.endpoint('CATEGORIES')}?${querystring.stringify(terms)}`;
  return client.request(url);
}
