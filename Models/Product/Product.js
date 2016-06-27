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

const GraphQLLong = new GraphQLScalarType({
  name: 'BigInt',
  description: '64-bit integral numbers',
  // TODO: Number is only 52-bit
  serialize: Number,
  parseValue: Number,
  parseLiteral: ast => {
    if (ast.kind === graphql.Kind.INT) {
      const num = parseInt(ast.value, 10);
      return num;
    }
    return null;
  }
});

const GraphQLDate = new GraphQLScalarType({
  name: 'Date',
  serialize (value) {
    if (value === null)
      return null;
    if (!(value instanceof Date)) {
      throw new Error('Field error: value is not an instance of Date')
    }

    return value.toJSON();
  },
  parseValue (value) {
    const date = new Date(value);

    return date;
  },
  parseLiteral (ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError('Query error: Can only parse strings to dates but got a: ' + ast.kind, [ast]);
    }
    let result = new Date(ast.value)
    if (isNaN(result.getTime())) {
      throw new GraphQLError('Query error: Invalid date', [ast]);
    }
    if (ast.value !== result.toJSON()) {
      throw new GraphQLError('Query error: Invalid date format, only accepts: YYYY-MM-DDTHH:MM:SS.SSSZ', [ast]);
    }
    return result;
  }
});

export const ProductStatus = new GraphQLEnumType({
  name: 'ProductStatus',
  description: 'Choices available are DRAFT (0) and LIVE (1)',
  values: {
    DRAFT: { value: 0 },
    LIVE: { value: 1 }
  }
});

export const StockStatus = new GraphQLEnumType({
  name: 'StockStatus',
  description: 'The Stock Status of the product',
  values: {
    UNLIMITED: { value: 0 },
    IN_STOCK: { value: 1 },
    LOW_STOCK: { value: 2 },
    OUT_OF_STOCK: { value: 3 },
    MORE_STOCK_ORDERED: { value: 4 },
    DISCONTINUED: { value: 5 }
  }
});

export const RequiresShipping = new GraphQLEnumType({
  name: 'RequiresShipping',
  description: 'Does the product require Shipping?',
  values: {
    NO: { value: 0 },
    YES: { value: 1 }
  }
});

export const CatalogOnly = new GraphQLEnumType({
  name: 'CatalogOnly',
  description: 'Indicates whether this product is only listed in the catalog and not for sale',
  values: {
    NO: { value: 0 },
    YES: { value: 1 }
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

export const Image = new GraphQLObjectType({
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
    modPrice: {
      type: GraphQLString,
      description: 'The Title of the product, must be unique',
      resolve: ({mod_price}) => mod_price
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
      description: 'Child-product variations for a product',
      resolve: ({variations}) => variations ? Object.keys(variations).map(key => variations[key]) : new Array()
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
    dateCreated: {
      type: GraphQLDate,
      description: 'Creation date',
      resolve: obj => new Date(obj.created_at)
    },
    dateUpdated: {
      type: GraphQLDate,
      description: 'Update date',
      resolve: obj => new Date(obj.updated_at)
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
        //return loaders.product.modifiers(obj.id);
        let modifiers = Object.keys(obj.modifiers).map(key => obj.modifiers[key]);
        return modifiers;
      }
    },
    variations: {
      type: new GraphQLList(ProductType),
      description: 'Child-product variations for a product',
      resolve: (obj, args, {loaders}) => loaders.product.variations(obj.id)
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
      type: new GraphQLNonNull(CatalogOnly),
      description: 'Indicates whether this product is only listed in the catalog and not for sale'
    },
    category: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The Category of the product'
    },
    stock_status: {
      type: new GraphQLNonNull(StockStatus),
      description: 'The Stock Status of the product'
    },
    requires_shipping: {
      type: new GraphQLNonNull(RequiresShipping),
      description: 'Does the product require Shipping?'
    },
    tax_band: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The tax band for this product'
    }
  }
});

const ProductUpdateInput = new GraphQLInputObjectType({
  name: 'ProductUpdateInput',
  description: 'New Category Input Parameters',
  fields: {
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
      description: 'The Price of the product'
    },
    slug: {
      type: GraphQLString,
      description: 'The Slug/URI of the product, must be unique'
    },
    sku: {
      type: GraphQLString,
      description: 'The SKU of the product, must be unique'
    },
    status: {
      type: ProductStatus,
      description: 'Is the product Live or a Draft'
    },
    stock_level: {
      type: GraphQLInt,
      description: 'The Stock Level of the product'
    },
    stock_status: {
      type: GraphQLInt,
      description: 'The Stock Status of the product'
    },
    catalog_only: {
      type: CatalogOnly,
      description: 'Indicates whether this product is only listed in the catalog and not for sale'
    },
    category: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The Category of the product'
    },
    stock_status: {
      type: StockStatus,
      description: 'The Stock Status of the product'
    },
    requires_shipping: {
      type: RequiresShipping,
      description: 'Does the product require Shipping?'
    },
    tax_band: {
      type: GraphQLString,
      description: 'The tax band for this product'
    }
  }
});

/*
mutation {
  addProduct(product: {title: "new product", price: 110.50, description: "A brand new Product", slug: "a-brand-new-product", sku: "DEADBEEF", status: LIVE, category: "0", stock_level: 10, stock_status: IN_STOCK, requires_shipping: NO, catalog_only: NO, tax_band: "1275562953474572346"} images: ["https://pixabay.com/static/uploads/photo/2013/07/12/13/21/sports-car-146873_960_720.png"]) {
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
    },
    images: {
      type: new GraphQLList(GraphQLString),
      description: 'Image urls'
    }
  },
  resolve: (root, {product, images}) => {
    console.log('data', product)
    return client.createProduct(product, images).then(product => {
      return product.product;
    });
  }
};

/*
mutation {
  updateProduct(id: "1279618214090769013" product: {title: "caca", price: 2229.5, category: "1279381513485419111"}) {
    id
  }
}
*/
export const ProductMutationUpdate = {
  type: ProductType,
  name: 'ProductMutationUpdate',
  description: 'Update a Product',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The global unique ID of an object'
    },
    product: {
      type: ProductUpdateInput,
      description: 'Product Update Parameters'
    }
  },
  resolve: (root, {id, product}) => {
    return client.updateProduct(id, product);
  }
};

export const ProductMutationDelete = {
  type: ProductType,
  name: 'ProductMutationDelete',
  description: 'Delete a Single Product',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The global unique ID of an object'
    }
  },
  resolve: (root, {id}) => {
    return client.deleteProduct(id).then(result => {
      return {
        id: id
      };
    });
  }
};
