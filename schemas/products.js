import Schema from 'schema-client';
import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
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

import uriTemplates from 'uri-templates';
import ProductType from '../Models/Product/ProductType';
import { CategoryType, CategoryMutationAdd, CategoryMutationDelete } from '../Models/Product/Category';

const client = new Schema.Client('pirulo123', 'J077KPB3m0urKzUxCSFszlwd3AzhgEmH');

/*
const {
  nodeField,
  nodeInterface,
} = nodeDefinitions(
  // A method that maps from a global id to an object
  (globalId, {loaders}) => {
    const {id, type} = fromGlobalId(globalId);
    if (type === 'Product') {
      return loaders.product.load(id);
    }
  },
  // A method that maps from an object to a type
  (obj) => {
    if (obj.hasOwnProperty('id')) {
      return ProductType;
    }
  }
);
*/

import {
  nodeField,
  nodeInterface,
} from '../Models/Product/interfaces'; 

/*
const CategoryType = new GraphQLObjectType({
  name: 'Category',
  description: 'Organize products into categories for customer navigation',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The global unique ID of an object'
    },
    name: {
      type: GraphQLString,
      description: 'Category name',
      resolve: obj => obj.name,
    },
    description: {
      type: GraphQLString,
      description: 'Product description',
      resolve: obj => obj.description,
    },
    metaDescription: {
      type: GraphQLString,
      description: 'Variant name',
      resolve: obj => obj.meta_description,
    },
    metaKeywords: {
      type: GraphQLString,
      description: 'Variant name',
      resolve: obj => obj.meta_keywords,
    },
    products: {
      type: new GraphQLList(ProductType),
      description: 'Category list of products',
      resolve: (obj, args, {loaders}) => {
        return client.get(`/categories:products?parent_id=${obj.id}`)
          .then(products => products.results)
          .then(products => {
            return products.map(product => {
              return loaders.product.load(product.product_id);
            });
          });
      }
    },
    parent: {
      type: CategoryType,
      description: 'Parent category',
      resolve: (obj, args, {loaders}) => loaders.category.load(obj.parent_id)
    },
    children: {
      type: new GraphQLList(CategoryType),
      description: 'Child categories',
      resolve: (obj, args, {loaders}) => {
        let link = uriTemplates(obj['$links'].children.url).fill(obj);
        return client.get(link).then(children => {
          console.log('--------------------------------------------------')
          console.log('--------------------------------------------------')
          console.log(children)
          console.log('--------------------------------------------------')
          console.log('--------------------------------------------------')
          return children.results
        });
      }
    }
  }),
  interfaces: [nodeInterface]
});
*/

const VariantType = new GraphQLObjectType({
  name: 'Variant',
  description: 'Product variants',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The global unique ID of an object'
    },
    dateCreated: {
      type: GraphQLString,
      description: 'Creation date',
      resolve: obj => obj.date_created,
    },
    dateUpdated: {
      type: GraphQLString,
      description: 'Creation date',
      resolve: obj => obj.date_updated,
    },
    name: {
      type: GraphQLString,
      description: 'Variant name',
      resolve: obj => obj.name,
    },
    price: {
      type: GraphQLInt,
      description: 'Variant price',
    },
    stockLevel: {
      type: GraphQLInt,
      description: 'Status of product variant stock for the purpose of ordering',
      resolve: obj => obj.stock_level
    }
  }),
  interfaces: [nodeInterface]
});

const GeoJSON = new GraphQLScalarType({
    name: 'GeoJSON',
    coerce: (value) => {
        // console.log('coerce value', value);
        return value;
    },
    coerceLiteral: (ast) => {
        // console.log('coerceLiteral ast', ast);
        return ast.value;
    },
    serialize: (value) => {
        // console.log('serialize value', value);
        return value;
    },
    parseValue: (value) => {
        // console.log('parseValue value', value);
        return value;
    },
    parseLiteral: (ast) => {
        // console.log('parseLiteral ast', ast);
        return ast.value;
    }
});

const FileType = new GraphQLObjectType({
  name: 'File',
  description: 'Image file',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The global unique ID of an object'
    },
    dateUploaded: {
      type: GraphQLString,
      description: 'Creation date',
      resolve: obj => obj.date_uploaded,
    },
    url: {
      type: GraphQLString,
      description: 'Image url',
      resolve: obj => obj.url,
    },
    fileName: {
      type: GraphQLString,
      description: 'Image file name',
      resolve: obj => obj.filename,
    },
    height: {
      type: GraphQLInt,
      description: 'Image height',
    },
    width: {
      type: GraphQLInt,
      description: 'Image width',
    }
  }),
  interfaces: [nodeInterface]
});

const ImageType = new GraphQLObjectType({
  name: 'Image',
  description: 'Product images',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The global unique ID of an object'
    },
    caption: {
      type: GraphQLString,
      description: 'Image caption',
      resolve: obj => obj.caption,
    },
    file: {
      type: FileType,
      description: 'Image file'
    }
  }),
  interfaces: [nodeInterface]
});

const ProductType2 = new GraphQLObjectType({
  name: 'Product',
  description: 'Products may be offered for sale to customers.',
  fields: () => ({
    //id: globalIdField('Product', product => product.id),
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The global unique ID of an object'
    },
    /*active: {
      type: GraphQLBoolean,
      description: 'Is product active ?',
      resolve: obj => obj.active,
    },
    dateCreated: {
      type: GraphQLString,
      description: 'Creation date',
      resolve: obj => new Date(obj.date_created),
    },
    dateUpdated: {
      type: GraphQLString,
      description: 'Creation date',
      resolve: obj => obj.date_updated,
    },
    name: {
      type: GraphQLString,
      description: 'Product name',
      resolve: obj => obj.name,
    },
    description: {
      type: GraphQLString,
      description: 'Product description',
      resolve: obj => obj.description,
    },
    metaTitle: {
      type: GraphQLString,
      description: 'Variant name',
      resolve: obj => obj.meta_title,
    },
    metaDescription: {
      type: GraphQLString,
      description: 'Variant name',
      resolve: obj => obj.meta_description,
    },
    metaKeywords: {
      type: GraphQLString,
      description: 'Variant name',
      resolve: obj => obj.meta_keywords,
    },
    variants: {
      type: new GraphQLList(VariantType),
      description: 'Product variants',
      resolve: (obj, args, {loaders}) => {
        return client.get(`/products:variants?parent_id=${obj.id}`).then(products => products.results);
      }
    },
    images: {
      type: new GraphQLList(ImageType),
      description: 'Product Images'
    },
    stockLevel: {
      type: GraphQLInt,
      description: 'Status of product stock for the purpose of ordering',
      resolve: obj => obj.stock_level
    },
    price: {
      type: GraphQLInt,
      description: 'Product price',
    }*/
    /*friends: {
      type: new GraphQLList(PersonType),
      description: 'People who lent you money',
      resolve: (obj, args, {loaders}) =>
        loaders.person.loadManyByURL(obj.friends),
    },*/
  }),
  interfaces: [nodeInterface],
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    allProducts: {
      type: new GraphQLList(ProductType),
      description: 'Retrieve a List of All Products',
      resolve: (root, args, {loaders}) => loaders.product.loadAll()
    },
    product: {
      type: ProductType,
      description: 'Retrieve a Single Product by ID',
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        },
      },
      resolve: (root, args, {loaders}) => loaders.product.load(args.id)
    },
    productSearch: {
      type: new GraphQLList(ProductType),
      description: 'Returns a range of products based on the various provided search criteria',
      args: {
        id: {
          type: GraphQLID
        },
        title: {
          type: GraphQLString,
          description: 'The Title of the product, must be unique'
        },
        category: {
          type: GraphQLString
        }
      },
      resolve: (root, args, {loaders}) => loaders.product.search(args)
    },
    allCategory: {
      type: new GraphQLList(CategoryType),
      description: 'Retrieve a List of All Categories',
      resolve: (root, args, {loaders}) => loaders.category.loadAll()
    },
    category: {
      type: CategoryType,
      description: 'Retrieve a Single Category by ID',
      args: {
        id: { type: new GraphQLNonNull(GraphQLID)}
      },
      resolve: (root, args, {loaders}) => loaders.category.load(args.id)
    },
    node: nodeField
  })
});

let MutationAddProduct = {
  type: ProductType,
  description: 'Adds a new product',
  args: {
    title: {
      type: new GraphQLNonNull(GraphQLString)
    },
    /*description: {
      type: new GraphQLNonNull(GraphQLString)
    },
    price: {
      type: new GraphQLNonNull(GraphQLFloat)
    },
    slug: {
      type: new GraphQLNonNull(GraphQLString)
    },
    sku: {
      type: new GraphQLNonNull(GraphQLString)
    },
    status: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    category: {
      type: new GraphQLNonNull(GraphQLString)
    },
    stock_level: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    stock_status: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    requires_shipping: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    catalog_only: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    tax_band: {
      type: new GraphQLNonNull(GraphQLString)
    }*/
  },
  resolve: (root, args, {loaders}) => {
    console.log('wwwot')
    return {
      id: '1abc'
    };
  }
};

var MutationAdd = {
  type: new GraphQLList(ProductType),
  description: 'Add a Todo',
  args: {
    title: {
      name: 'Todo title',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (root, args, {title}) => {
    return [{
      id: '1abc'
    }, {
      id: '2abc'
    },{
      id: '3abc'
    }];
  }
};

const Mutation = new GraphQLObjectType({
  name: 'Mutations',
  description: 'Functions to set stuff',
  fields: () => ({
    addCategory: CategoryMutationAdd,
    deleteCategory: CategoryMutationDelete
  })
});

export default new GraphQLSchema({
  query: QueryType,
  mutation: Mutation
});