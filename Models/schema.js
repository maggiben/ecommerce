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
  ProductMutationDelete
} from '../Models/Product/Product';

import {
	CategoryType,
  CategoryTreeType,
	CategoryMutationAdd,
	CategoryMutationUpdate,
  CategoryMutationDelete
} from '../Models/Category/Category';

import {
  nodeField,
  nodeInterface,
} from './interfaces';

import { globalIdField } from 'graphql-relay';

const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  description: 'Functions to set stuff',
  fields: () => ({
    addProduct: ProductMutationAdd,
    updateProduct: ProductMutationUpdate,
    deleteProduct: ProductMutationDelete,
    addCategory: CategoryMutationAdd,
    updateCategory: CategoryMutationUpdate,
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
      type: CategoryTreeType,
      resolve: (root, args, {loaders}) => {
        return loaders.category.loadAll().then(tree => {
          return {
            id: 'tree',
            tree: tree
          }
        })
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
    categorySearch: {
      type: new GraphQLList(CategoryType),
      description: 'Get single category by criteria',
      args: {
        id: {
          type: GraphQLID,
          description: 'Select by ID'
        },
        title: {
          type: GraphQLString,
          description: 'Select by Title'
        },
        slug: {
          type: GraphQLString,
          description: 'Select by Slug'
        },
        parent: {
          type: GraphQLString,
          description: 'Select by Parent ID'
        }
      },
      resolve: (root, args, {loaders}) => loaders.category.search(args)
    },
    node: nodeField
  })
});

export default new GraphQLSchema({
  query: QueryType,
  mutation: Mutations
});
