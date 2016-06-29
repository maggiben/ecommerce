import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

import {
  GraphQLFieldConfigArgumentMap,
  GraphQLFieldConfigMap
} from 'graphql';

/**
 * The common page info type used by all connections.
 */
var pageInfoType = new GraphQLObjectType({
  name: 'ApiPageInfo',
  description: 'Information about pagination in a connection.',
  fields: () => ({
    hasNextPage: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'When paginating forwards, are there more items?'
    },
    hasPreviousPage: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'When paginating backwards, are there more items?'
    },
    startCursor: {
      type: GraphQLString,
      description: 'When paginating backwards, the cursor to continue.'
    },
    endCursor: {
      type: GraphQLString,
      description: 'When paginating forwards, the cursor to continue.'
    },
    totalCount: {
      type: GraphQLInt,
      description: 'The total number of items that could be returned.'
    }
  })
});

function resolveMaybeThunk(thingOrThunk) {
  return typeof thingOrThunk === 'function' ? thingOrThunk() : thingOrThunk;
}

export default function connectionApiDefinitions(config) {
  var {
    nodeType,
    name = config.name,
    edgeFields = {},
    connectionFields = {},
    resolveNode, resolveCursor
  } = config;

  var edgeType = new GraphQLObjectType({
    name: name + 'Edge',
    description: 'An edge in a connection.',
    fields: () => ({
      node: {
        type: nodeType,
        resolve: resolveNode,
        description: 'The item at the end of the edge',
      },
      cursor: {
        type: new GraphQLNonNull(GraphQLString),
        resolve: resolveCursor,
        description: 'A cursor for use in pagination'
      },
      ...(resolveMaybeThunk(edgeFields))
    }),
  });

  var connectionType = new GraphQLObjectType({
    name: name + 'Connection',
    description: 'A connection to a list of items.',
    fields: () => ({
      pageInfo: {
        type: new GraphQLNonNull(pageInfoType),
        description: 'Information to aid in pagination.'
      },
      edges: {
        type: new GraphQLList(edgeType),
        description: 'A list of edges.'
      },
      ...(resolveMaybeThunk(connectionFields))
    }),
  });

  return { edgeType: edgeType, connectionType: connectionType };
}
