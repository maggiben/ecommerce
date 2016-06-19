import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLSchema,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt
} from 'graphql';

import {
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
} from 'graphql-relay';

import ProductType from './ProductType';

import Schema from 'schema-client';

const client = new Schema.Client('pirulo123', 'J077KPB3m0urKzUxCSFszlwd3AzhgEmH');

const {
  nodeField,
  nodeInterface,
} = nodeDefinitions(
  // A method that maps from a global id to an object
  (globalId, {loaders}) => {
    const {id, type} = fromGlobalId(globalId);
    if (type === 'Product') {
      return loaders.product.load(id);
    }
  },
  // A method that maps from an object to a type
  (obj) => {
    if (obj.hasOwnProperty('id')) {
      return ProductType;
    }
  }
);

export default new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    allProducts: {
      type: new GraphQLList(ProductType),
      description: 'Everything, everywhere',
      resolve: (root, args, {loaders}) => client.get('/products', {active: true}).then(products => products.results)
    },
    node: nodeField,
    product: {
      type: ProductType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
      },
      resolve: (root, args, {loaders}) => client.get(`/categories/${args.id}`)
    },
  }),
});