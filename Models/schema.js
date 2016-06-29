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
} from './Product/Product';

import {
  CategoryType,
  CategoryTreeType,
  CategoryMutationAdd,
  CategoryMutationUpdate,
  CategoryMutationDelete,
  CategoryConnection,
  connectionCategoryArgs,
  CategoryViewer
} from './Category/Category';

import {
  nodeField,
  nodeInterface,
} from './interfaces';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray
} from 'graphql-relay';

import {
  default as connectionFromMoltinCursor
} from './ApiConnection';

import {
  Viewer
} from './Viewer/Viewer'

function connectionFromPromisedArray(dataPromise, args, options) {
  return dataPromise.then(function (data) {
    return connectionFromArray(data, args, options);
  });
}

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
    products: {
      type: ProductConnection,
      args: connectionProductArgs,
      description: 'Retrieve a List of All Products',
      resolve: (obj, args, {session, loaders}) => {
        console.log(JSON.stringify(session, null, 2));
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
    /*allCategories: {
      type: categoryConnection,
      args: connectionApiArgs,
      resolve: (root, args, {loaders}) => {
        return connectionFromMoltinCursor(loaders.category.loadAll, args);
      }
    },*/
    categories: {
      type: CategoryConnection,
      args: connectionCategoryArgs,
      description: 'Retrieve a List of All Products',
      resolve: (obj, args, {loaders}) => {
        return connectionFromMoltinCursor(loaders.category.search, args);
      }
    },
    categoriesViewer: {
      type: CategoryViewer,
      resolve: (obj, args, {loaders}) => {
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
  query: Viewer,
  mutation: Mutations
});
