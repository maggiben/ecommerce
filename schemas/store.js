import Schema from 'schema-client';
import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt
} from 'graphql';
import {
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
} from 'graphql-relay';

const client = new Schema.Client('pirulo123', 'J077KPB3m0urKzUxCSFszlwd3AzhgEmH');

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
      return ProducType;
    }
  }
);

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  description: 'Organize products into categories for customer navigation',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The global unique ID of an object'
    },
    name: {
      type: GraphQLBoolean,
      description: 'Category name',
      resolve: obj => obj.name,
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
    }
  }),
  interfaces: [nodeInterface]
});

const VariantType = new GraphQLObjectType({
  name: 'Variant',
  description: 'Product variants',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The global unique ID of an object'
    },
    dateCreated: {
      type: GraphQLBoolean,
      description: 'Creation date',
      resolve: obj => obj.date_created,
    },
    dateUpdated: {
      type: GraphQLBoolean,
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

const ProducType = new GraphQLObjectType({
  name: 'Product',
  description: 'Products may be offered for sale to customers.',
  fields: () => ({
    //id: globalIdField('Product', product => product.id),
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The global unique ID of an object'
    },
    active: {
      type: GraphQLBoolean,
      description: 'Is product active ?',
      resolve: obj => obj.active,
    },
    name: {
      type: GraphQLString,
      description: 'Product name',
      resolve: obj => obj.name,
    },
    variants: {
      type: new GraphQLList(VariantType),
      description: 'Product variants',
      resolve: (obj, args, {loaders}) => {
        return client.get(`/products:variants?parent_id=${obj.id}`).then(products => products.results);
      }
    },
    stockLevel: {
      type: GraphQLInt,
      description: 'Status of product stock for the purpose of ordering',
      resolve: obj => obj.stock_level
    },
    price: {
      type: GraphQLInt,
      description: 'Product price',
    }
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
      type: new GraphQLList(ProducType),
      description: 'Everything, everywhere',
      resolve: (root, args, {loaders}) => client.get('/products', {active: true}).then(products => products.results)
      /*resolve: (root, args, {loaders}) => {
        console.log(loaders.product)
        //return loaders.product.loadAll();
        return new Promise((resolve, reject) => {
          client.get('/products', {active: true}).then(products => {
            console.log(products);
            return resolve(products.results);
          });
        });
      }*/
    },
    node: nodeField,
    product: {
      type: ProducType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
      },
      resolve: (root, args, {loaders}) => {
        console.log('args:', args)
        console.log('loaders', loaders.product)
        return loaders.product.load(args.id);
      }
    },
  }),
});

export default new GraphQLSchema({
  query: QueryType,
});