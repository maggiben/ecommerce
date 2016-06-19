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
  nodeField,
  nodeInterface,
} from './interfaces';

import Moltin from '../../services/moltin';

const client = new Moltin({
  publicId: 'Si025LTIJVLnzRv2vZzAU6Vgy5RBim8pdspJQegtN8',
  secretKey: 'qWYmQn7GsrkC7hj3UE0zzVI1u9reE9eT2dZsqpwmgu'
});

export default new GraphQLObjectType({
  name: 'Product',
  description: 'Products are the building blocks of any eCommerce system',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The global unique ID of an object'
    },
    title: {
      type: GraphQLString,
      description: 'The Title of the product, must be unique'
    },
    description: {
      type: GraphQLString,
      description: 'The Description of the product'
    },
    price: {
      type: GraphQLFloat,
      description: 'The Price of the product',
      resolve: obj => {
        return parseFloat(obj.price.data.raw.without_tax, 10);
      }
    },
    slug: {
      type: GraphQLString,
      description: 'The Slug/URI of the product, must be unique'
    },
    sku: {
      type: GraphQLString,
      description: 'The SKU of the product, must be unique'
    },
    stockLevel: {
      type: GraphQLInt,
      description: 'The Stock Level of the product',
      resolve: obj => obj.stock_level,
    }
  }),
  interfaces: [nodeInterface],
});

/*
const ProductMutationAdd = {
  type: ProductType,
  description: 'Add a Product',
  args: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The Title of the product, must be unique'
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The Description of the product'
    },
    price: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: 'The Price of the product'
    },
    slug: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The Slug/URI of the product, must be unique'
    },
    sku: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The SKU of the product, must be unique'
    },
    status: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The Stock Level of the product'
    },
    stock_level: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The Stock Level of the product'
    },
    stock_status: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The Stock Level of the product'
    },
    catalog_only: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The Stock Level of the product'
    }
  },
  resolve: (root, args) => {
    console.log('data', args.title)
    return client.createCategory(args);
  }
};*/