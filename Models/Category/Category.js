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
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
} from 'graphql-relay';

import {
  nodeField,
  nodeInterface,
} from '../interfaces';

import {
  ProductType
} from '../Product/Product';

import MoltinUtil from '../../services/moltin';

const client = new MoltinUtil({
  publicId: 'Si025LTIJVLnzRv2vZzAU6Vgy5RBim8pdspJQegtN8',
  secretKey: 'qWYmQn7GsrkC7hj3UE0zzVI1u9reE9eT2dZsqpwmgu'
});

var {connectionType: productConnection} = connectionDefinitions({name: 'Product', nodeType: ProductType});

function connectionFromPromisedArray(dataPromise, args, options) {
  return dataPromise.then(function (data) {
    return connectionFromArray(data, args, options);
  });
}

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
    order: {
      type: GraphQLInt,
      description: 'The order in which this category appears'
    },
    status: {
      type: GraphQLBoolean,
      description: 'Is the category Live or a Draft'
    },
    description: {
      type: GraphQLString,
      description: 'The Description of the product'
    },
    dateCreated: {
      type: GraphQLString,
      description: 'Creation date',
      resolve: obj => new Date(obj.created_at)
    },
    dateUpdated: {
      type: GraphQLString,
      description: 'Update date',
      resolve: obj => new Date(obj.updated_at)
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
      description: 'Child categories',
      resolve: (obj, args, {loaders}) => {
        return loaders.category.search({
          parent: obj.id
        });
      }
    },
    products: {
      type: productConnection,
      args: connectionArgs,
      description: 'Products that belong to this category',
      resolve: (obj, args, {loaders}) => {
        console.log(args);
        let products = loaders.product.search({
          category: obj.id
        });
        //console.log(JSON.stringify(products, null, 2));
        return connectionFromPromisedArray(products, args);
      }
    },
    /*products: {
      type: new GraphQLList(ProductType),
      description: 'Products that belong to this category',
      resolve: (obj, args, {loaders}) => {
        return loaders.product.search({
          category: obj.id
        });
      }
    },*/
    pagination: {
      type: Pagination,
      description: 'Pagination object'
    }
  }),
  interfaces: [nodeInterface],
});

//curl -X GET https://api.molt.in/v1/categories/tree -H "Authorization: Bearer b43ecfc57deecf930aa7b3df10f90d859ead9f4d"

export const CategoryTreeType = new GraphQLObjectType({
  name: 'CategoryTree',
  description: 'Categories tree hierarchy',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The global unique ID of an object'
    },
    tree: {
      type: new GraphQLList(CategoryType)
    }
  }),
  interfaces: [nodeInterface]
});

const CategoryStatus = new GraphQLEnumType({
  name: 'CategoryStatus',
  description: 'Choices available are DRAFT (0) and LIVE (1)',
  values: {
    DRAFT: { value: 0 },
    LIVE: { value: 1 }
  }
});

const CategoryCreateInput = new GraphQLInputObjectType({
  name: 'CategoryCreateInput',
  description: 'New Category Input Parameters',
  fields: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The Title of the category, must be unique'
    },
    slug: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The Slug/URI of the category, must be unique'
    },
    parent: {
      type: GraphQLString,
      description: 'The parent category that contains this category'
    },
    status: {
      type: new GraphQLNonNull(CategoryStatus),
      description: 'Is the category Live or a Draft'
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The Description of the product'
    }
  }
});

/*
mutation {
  addCategory(category: {title: "Hola", slug: "hola", description: "pepe", status: DRAFT}) {
    id
  }
}
*/
export const CategoryMutationAdd = {
  type: CategoryType,
  name: 'CategoryMutationAdd',
  description: 'Add a Category',
  args: {
    category: {
      type: CategoryCreateInput,
      description: 'Category creation parameters'
    }
  },
  resolve: (root, {category}) => {
    return client.createCategory(category);
  }
};

/*
mutation {
  updateCategory(id: "1279381513485419111" category: {slug: "woot", title: "pee", description: "caca", status: LIVE, parent: "0"}) {
    id
  }
}
*/
const CategoryUpdateInput = new GraphQLInputObjectType({
  name: 'CategoryUpdateInput',
  description: 'New Category Input Parameters',
  fields: {
    title: {
      type: GraphQLString,
      description: 'The Title of the category, must be unique'
    },
    slug: {
      type: GraphQLString,
      description: 'The Slug/URI of the category, must be unique'
    },
    parent: {
      type: GraphQLString,
      description: 'The parent category that contains this category'
    },
    status: {
      type: CategoryStatus,
      description: 'Is the category Live or a Draft'
    },
    description: {
      type: GraphQLString,
      description: 'The Description of the product'
    }
  }
});

export const CategoryMutationUpdate = {
  type: CategoryType,
  name: 'CategoryMutationUpdate',
  description: 'Update a Category',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The global unique ID of an object'
    },
    category: {
      type: CategoryUpdateInput,
      description: 'Category Update Parameters'
    }
  },
  resolve: (root, {id, category}) => {
    return client.updateCategory(id, category);
  }
};

/*
mutation deleteCategory {
  deleteCategory(id: "1277626383194915125") {
    id
  }
}
*/
export const CategoryMutationDelete = {
  type: CategoryType,
  name: 'CategoryMutationDelete',
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
  }
};
