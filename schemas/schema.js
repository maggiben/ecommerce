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

import ProductType from '../Models/Product/ProductType';

import { 
	CategoryType, 
	CategoryMutationAdd, 
	CategoryMutationDelete 
} from '../Models/Product/Category';

import {
  nodeField,
  nodeInterface,
} from '../Models/Product/interfaces';

const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  description: 'Functions to set stuff',
  fields: () => ({
    addCategory: CategoryMutationAdd,
    deleteCategory: CategoryMutationDelete
  })
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    allProducts: {
      type: new GraphQLList(ProductType),
      description: 'Retrieve a List of All Products',
      resolve: (root, args, {loaders}) => loaders.product.loadAll()
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
    productSearch: {
      type: new GraphQLList(ProductType),
      description: 'Returns a range of products based on the various provided search criteria',
      args: {
        id: {
          type: GraphQLID
        },
        title: {
          type: GraphQLString,
          description: 'The Title of the product, must be unique'
        },
        category: {
          type: GraphQLString
        }
      },
      resolve: (root, args, {loaders}) => loaders.product.search(args)
    },
    allCategory: {
      type: new GraphQLList(CategoryType),
      description: 'Retrieve a List of All Categories',
      resolve: (root, args, {loaders}) => loaders.category.loadAll()
    },
    category: {
      type: CategoryType,
      description: 'Retrieve a Single Category by ID',
      args: {
        id: { type: new GraphQLNonNull(GraphQLID)}
      },
      resolve: (root, args, {loaders}) => loaders.category.load(args.id)
    },
    node: nodeField
  })
});

export default new GraphQLSchema({
  query: QueryType,
  mutation: Mutations
});