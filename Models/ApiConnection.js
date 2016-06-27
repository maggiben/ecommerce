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

/**
 * Accepts a api loader and connection arguments, and returns a connection
 * object for use in GraphQL. It uses array offsets as pagination, so pagiantion
 * will work only if the data set is satic.
 */
export default async function connectionFromMoltinCursor(inApiCursor, args = {}, mapper) {

  const response = await inApiCursor(args);
  const { limit = 10, offset = 0 } = args;
  const { total, offsets } = response.pagination;
  const edges = response.result.map((value, index) => ({
    cursor: (offset + index),
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

