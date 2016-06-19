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

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    allCategories: {
      type: new GraphQLList(CategoryType),
      description: 'Everything, everywhere',
      //resolve: (root, args, {loaders}) => client.get('/products', {active: true}).then(products => products.results)
      resolve: (root, args, {loaders}) => {
        console.log(loaders.product)
        return loaders.category.loadAll();
      }
    },
    node: nodeField,
    product: {
      type: CategoryType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
      },
      resolve: (root, args, {loaders}) => {
        return loaders.category.load(args.id);
      }
    },
  }),
});

export default new GraphQLSchema({
  query: QueryType,
});