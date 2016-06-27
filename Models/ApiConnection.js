import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLFloat
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions
} from 'graphql-relay';

import {
  ProductType,
  StockStatus
} from './Product/Product';

import {
  CategoryType
} from './Category/Category';

export const {connectionType: productConnection} = connectionDefinitions({name: 'Product', nodeType: ProductType});

/**
 * Accepts a api loader and connection arguments, and returns a connection
 * object for use in GraphQL. It uses array offsets as pagination, so pagiantion
 * will work only if the data set is satic.
 */
export default async function connectionFromMoltinCursor(inApiCursor, args = {}, mapper) {

  const response = await inApiCursor(args);
  const { limit, offset } = args;
  const { total, offsets } = response.pagination;
  const edges = response.result.map((value, index) => ({
    cursor: offset + index,
    node: value,
  }));

  console.log(JSON.stringify(response.pagination, null, 2));

  return {
    edges,
    pageInfo: {
      startCursor: '0',
      endCursor: (total - 1).toString(),
      hasPreviousPage: offsets.previous === false ? false : true,
      hasNextPage: offsets.next === false ? false : true,
    },
  };
}

export const connectionApiArgs = {
  title: {
    type: GraphQLString,
    description: 'The Title of the product, must be unique'
  },
  price: {
    type: GraphQLFloat,
    description: 'The Price of the product'
  },
  category: {
    type: GraphQLString,
    description: 'The Category of the product'
  },
  stock_status: {
    type: StockStatus,
    description: 'The Stock Status of the product'
  },
  /*
    Pagination Arguments
  */
  limit: {
    type: GraphQLInt,
    description: 'The maximum number of products to return, up to 100 entries can be returned per request'
  },
  offset: {
    type: GraphQLInt,
    description: 'The number of products to skip from the beginning of the list'
  },
  ...connectionArgs
};
