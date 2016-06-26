import {
  connectionArgs,
  connectionDefinitions
} from 'graphql-relay';

import {
  ProductType
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

/*
{ after:
   { type:
      GraphQLScalarType {
        name: 'String',
        description: 'The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.',
        _scalarConfig: [Object] } },
  first:
   { type:
      GraphQLScalarType {
        name: 'Int',
        description: 'The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. ',
        _scalarConfig: [Object] } },
  before:
   { type:
      GraphQLScalarType {
        name: 'String',
        description: 'The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.',
        _scalarConfig: [Object] } },
  last:
   { type:
      GraphQLScalarType {
        name: 'Int',
        description: 'The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. ',
        _scalarConfig: [Object] } } }
*/
