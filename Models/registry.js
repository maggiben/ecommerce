import { fromGlobalId } from 'graphql-relay';

export function idFetcher(globalId, {loaders}) {
  const {id, type} = fromGlobalId(globalId);
  if (type === 'Product') {
    return loaders.product.load(id);
  }
}

export function typeResolver(obj) {
  if (obj.hasOwnProperty('id')) {
    return ProductType;
  }
}
