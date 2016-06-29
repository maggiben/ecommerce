import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLSchema,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLFloat
} from 'graphql';

import {
  ProductType,
  ProductMutationAdd,
  ProductMutationUpdate,
  ProductMutationDelete,
  ProductConnection,
  connectionProductArgs
} from '../Product/Product';

import {
  CategoryType,
  CategoryTreeType,
  CategoryMutationAdd,
  CategoryMutationUpdate,
  CategoryMutationDelete,
  CategoryConnection,
  connectionCategoryArgs,
  CategoryViewer
} from '../Category/Category';

import {
  nodeField,
  nodeInterface,
} from '../interfaces';

import {
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
} from 'graphql-relay';

import {
  default as connectionFromMoltinCursor
} from '../ApiConnection';


export const Viewer = new GraphQLObjectType({
  name: 'Viewer',
  description: 'Viewer Root Fields',
  fields: () => ({
    id: globalIdField('Viewer'),
    name: {
      type: GraphQLString,
      resolve: () => 'Viewer!'
    },
    categories: {
      type: CategoryConnection,
      args: connectionCategoryArgs,
      description: 'Retrieve a List of All Categories',
      resolve: (obj, args, {session, loaders}) => {
        return connectionFromMoltinCursor(loaders.category.search, args);
      }
    },
    category: {
      type: CategoryType,
      description: 'Retrieve a Single Category by ID',
      args: {
        id: { type: new GraphQLNonNull(GraphQLID)}
      },
      resolve: (root, args, {loaders}) => loaders.category.load(args.id)
    },
    products: {
      type: ProductConnection,
      args: connectionProductArgs,
      description: 'Retrieve a List of All Products',
      resolve: (obj, args, {session, loaders}) => {
        return connectionFromMoltinCursor(loaders.product.search, args);
      }
    },
    product: {
      type: ProductType,
      description: 'Retrieve a Single Product by ID',
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        },
      },
      resolve: (root, args, {loaders}) => loaders.product.load(args.id)
    },
  }),
  interfaces: [nodeInterface]
});
