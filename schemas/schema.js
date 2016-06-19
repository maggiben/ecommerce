import {
  GraphQLSchema
} from 'graphql';

import ProductQuery from '../Models/Product/ProductQuery';
import ProductType from '../Models/Product/ProductType';

console.log('ProductQuery: ', ProductQuery)

export default new GraphQLSchema({
  query: ProductQuery,
});