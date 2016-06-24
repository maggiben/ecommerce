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
  nodeField,
  nodeInterface,
} from '../interfaces';

import {
  fromGlobalId,
  toGlobalId,
  globalIdField
} from 'graphql-relay';

import uuid from 'node-uuid';

import Moltin from '../../services/moltin';

const client = new Moltin({
  publicId: 'Si025LTIJVLnzRv2vZzAU6Vgy5RBim8pdspJQegtN8',
  secretKey: 'qWYmQn7GsrkC7hj3UE0zzVI1u9reE9eT2dZsqpwmgu'
});

const ProductStatus = new GraphQLEnumType({
  name: 'ProductStatus',
  description: 'Choices available are DRAFT (0) and LIVE (1)',
  values: {
    DRAFT: { value: 0 },
    LIVE: { value: 1 }
  }
});

const ImageUrl = new GraphQLObjectType({
  name: 'ImageUrl',
  description: 'Image URI',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The global unique ID of an object',
      resolve: obj => {
        return toGlobalId('image', uuid.v1());
      }
    },
    http: {
      type: GraphQLString,
      description: 'Image HTTP resource'
    },
    https: {
      type: GraphQLString,
      description: 'Image HTTPS resource'
    }
  }),
  interfaces: [nodeInterface]
});

const ImageDetails = new GraphQLObjectType({
  name: 'ImageDetails',
  description: 'Image properties',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The global unique ID of an object',
      resolve: obj => {
        return toGlobalId('image', uuid.v1());
      }
    },
    size: {
      type: GraphQLInt,
      description: 'Image size'
    },
    width: {
      type: GraphQLInt,
      description: 'Image width'
    },
    height: {
      type: GraphQLInt,
      description: 'Images height'
    }
  }),
  interfaces: [nodeInterface]
});

const Image = new GraphQLObjectType({
  name: 'Image',
  description: 'Product images',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The global unique ID of an object'
    },
    name: {
      type: GraphQLString,
      description: 'The Title of the product, must be unique'
    },
    url: {
      type: ImageUrl,
      description: 'Product Images'
    },
    details: {
      type: ImageDetails,
      description: 'Product Images'
    }
  }),
  interfaces: [nodeInterface]
});


/*
{
  productSearch(category: "1275721208867848276") {
    title
    price
  }
}
*/
export const ProductType = new GraphQLObjectType({
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
    images: {
      type: new GraphQLList(Image),
      description: 'Returns an array of assigned images for this product'
    },
    stockLevel: {
      type: GraphQLInt,
      description: 'The Stock Level of the product',
      resolve: obj => obj.stock_level
    },
    status: {
      type: ProductStatus,
      description: 'Is the product Live or a Draft'
    }
  }),
  interfaces: [nodeInterface],
});

const ProductCreateInput = new GraphQLInputObjectType({
  name: 'ProductCreateInput',
  description: 'New Category Input Parameters',
  fields: {
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
      type: new GraphQLNonNull(ProductStatus),
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
  }
});

export const ProductMutationAdd = {
  type: ProductType,
  name: 'ProductMutationAdd',
  description: 'Add a Product',
  args: {
    category: {
      type: ProductCreateInput,
      description: 'Product creation parameters'
    }
  },
  resolve: (root, {product}) => {
    console.log('data', args.product)
    return client.createProduct(product);
  }
};
