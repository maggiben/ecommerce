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

  console.log(JSON.stringify(args, null, 2));
  const { limit = 10 || args.first, offset = 0 } = args;
  args.limit = args.first;
  delete args.first;
  const response = await inApiCursor(args);
  const { total, offsets } = response.pagination;
  const edges = response.result.map((value, index) => ({
    cursor: (offset + index),
    node: value,
  }));

  /*
  console.log('#####################')
  console.log(JSON.stringify(response.pagination, null, 2));
  console.log('#####################')
  */

  return {
    edges,
    pageInfo: {
      totalCount: total,
      startCursor: edges[0].cursor,
      endCursor: edges[edges.length - 1].cursor,
      hasPreviousPage: offsets.previous === false ? false : true,
      hasNextPage: offsets.next === false ? false : true,
    },
  };
}

