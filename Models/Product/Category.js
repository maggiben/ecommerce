import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLInputObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLFloat
} from 'graphql';

import {
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
} from 'graphql-relay';

import {
  nodeField,
  nodeInterface,
} from './interfaces';


import MoltinUtil from '../../services/moltin';
const client = new MoltinUtil({
  publicId: 'Si025LTIJVLnzRv2vZzAU6Vgy5RBim8pdspJQegtN8',
  secretKey: 'qWYmQn7GsrkC7hj3UE0zzVI1u9reE9eT2dZsqpwmgu'
});

const Pagination = new GraphQLObjectType({
  name: 'Pagination',
  description: 'Pagination object',
  fields: () => ({
    total: {
      type: GraphQLInt,
      description: 'The total number of items that could be returned'
    },
    current: {
      type: GraphQLInt,
      description: 'The number of items returned as part of this call'
    },
    limit: {
      type: GraphQLInt,
      description: 'The maximum number of items allowed to be returned in this call. Set using the limit data field with the selected endpoint. Limit can be set from 1 to 100'
    },
    offset: {
      type: GraphQLInt,
      description: 'The position in the total list of items of the first item in the returned array'
    },
    from: {
      type: GraphQLInt,
      description: 'The ordinal number in the total list of items of the first item in this array'
    },
    to: {
      type: GraphQLInt,
      description: 'The ordinal number in the total list of items of the last item in this array'
    }
  })
});

export const CategoryType = new GraphQLObjectType({
  name: 'Category',
  description: 'Categories allow you to organize your products into hierarchical groups',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The global unique ID of an object'
    },
    title: {
      type: GraphQLString,
      description: '  The Title of the category, must be unique'
    },
    slug: {
      type: GraphQLString,
      description: 'The Slug/URI of the category, must be unique'
    },
    parent: {
      type: GraphQLInt,
      description: 'The Stock Level of the product'
    },
    status: {
      type: GraphQLBoolean,
      description: 'Is the category Live or a Draft'
    },
    description: {
      type: GraphQLString,
      description: 'The Description of the product'
    },
    parent: {
      type: CategoryType,
      description: 'The parent category that contains this category',
      resolve: (obj, args, {loaders}) => {
        return obj.parent ? obj.parent.data : null;
      }
    },
    children: {
      type: new GraphQLList(CategoryType),
      description: 'Child categories'
    },
    pagination: {
      type: Pagination,
      description: 'Pagination object'
    }
  }),
  interfaces: [nodeInterface],
});

/*
export const CategoryMutation = new GraphQLObjectType({
  name: 'Mutations',
  description: 'Functions to set Categories',
  fields: () => ({
    addCategory: {
      type: CategoryType,
      description: 'Add a Category',
      args: {
        title: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The Title of the category, must be unique'
        },
        slug: {
          type: GraphQLString,
          description: 'The Slug/URI of the category, must be unique'
        },
        parent: {
          type: GraphQLInt,
          description: 'The Stock Level of the product',
          resolve: obj => obj.stock_level,
        },
        status: {
          type: GraphQLBoolean,
          description: 'The Slug/URI of the category, must be unique'
        },
        description: {
          type: GraphQLString,
          description: 'The Description of the product'
        }
      },
      resolve: (root, args, {title}) => {
        return {
          id: '1abc'
        };
      }
    }
  })
});

*/

/*
mutation addCategory {
  addCategory(title: "Hola" slug: "hola" description: "pepe" status: 1) {
    id
  }
}
*/
export const CategoryMutationAdd = {
  type: CategoryType,
  description: 'Add a Category',
  args: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The Title of the category, must be unique'
    },
    slug: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The Slug/URI of the category, must be unique'
    },
    parent: {
      type: GraphQLInt,
      description: 'The parent category that contains this category'
    },
    status: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Is the product Live or a Draft'
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The Description of the product'
    }
  },
  resolve: (root, args) => {
    console.log('data', args.title)
    return client.createCategory(args);
  }
};

/*
mutation deleteCategory {
  deleteCategory(id: "1274723649219199833") {
    id
  }
}
*/

export const CategoryMutationDelete = {
  type: CategoryType,
  description: 'Delete a Single Category',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The global unique ID of an object'
    }
  },
  resolve: (root, {id}) => {
    return client.deleteCategory(id).then(result => {
      return {
        id: id
      };
    });
    return {
      id: '1abc',
      title: title,
      slug: slug,
      parent: parent,
      status: status,
      description: description
    };
  }
};