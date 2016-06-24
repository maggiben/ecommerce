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

const ModifierVariation = new GraphQLObjectType({
  name: 'ModifierVariation',
  description: 'Product Modifier',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The global unique ID of an object'
    },
    title: {
      type: GraphQLString,
      description: 'The Title of the product, must be unique'
    },
    mod_price: {
      type: GraphQLString,
      description: 'The Title of the product, must be unique'
    }
  }),
  interfaces: [nodeInterface]
})
/*
curl -X GET https://api.molt.in/v1/products/1279009237539750439/variations -H "Authorization: Bearer d419b8887cf6857d5c445896ccb310e8341bd1b7"
*/
const ProductModifier = new GraphQLObjectType({
  name: 'ProductModifier',
  description: 'Product Modifier',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The global unique ID of an object'
    },
    title: {
      type: GraphQLString,
      description: 'The Title of the product, must be unique'
    },
    type: {
      type: GraphQLString,
      description: 'The Title of the product, must be unique'
    },
    variations: {
      type: new GraphQLList(ModifierVariation),
      description: 'Child-product variations for a product'
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
    },
    modifiers: {
      type: new GraphQLList(ProductModifier),
      description: 'Product modifiers',
      resolve: (obj, args, {loaders}) => {
        return loaders.product.modifiers(obj.id);
      }
    },
    variations: {
      type: new GraphQLList(ProductType),
      description: 'Child-product variations for a product',
      resolve: (obj, args, {loaders}) => {
        return loaders.product.variations(obj.id);
      }
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
      description: 'Is the product Live or a Draft'
    },
    stock_level: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The Stock Level of the product'
    },
    stock_status: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The Stock Status of the product'
    },
    catalog_only: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Indicates whether this product is only listed in the catalog and not for sale'
    },
    category: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The Category of the product'
    }
  }
});

/*
mutation {
  addProduct(product: {title: "new product", price: 110.50, description: "A brand new Product", slug: "a-brand-new-product", sku: "DEADBEEF", status: LIVE, category: "0", stock_level: "1", stock_status: 1, requires_shipping: 1, catalog_only: 0, tax_band: "1275562953474572346"}) {
    id
  }
}
*/
export const ProductMutationAdd = {
  type: ProductType,
  name: 'ProductMutationAdd',
  description: 'Add a Product',
  args: {
    product: {
      type: ProductCreateInput,
      description: 'Product creation parameters'
    }
  },
  resolve: (root, {product}) => {
    console.log('data', args.product)
    return client.createProduct(product);
  }
};
