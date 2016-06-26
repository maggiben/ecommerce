import querystring from 'querystring';
import Abstract from '../Abstract';

export default class Product extends Abstract {

  constructor(api) {
    const baseRoute = 'PRODUCTS';
    super(api, baseRoute);
    this.api = api;
  }

  Search(terms) {
    let query = '/?' + querystring.stringify(terms);
    return this.api.request(this.api.endpoint('SEARCH_PRODUCTS') + query);
  }
  Modifiers(id) {
    return this.api.request(this.api.endpoint('MODIFIERS', {id}));
  }
  Variations(id) {
    return this.api.request(this.api.endpoint('VARIATIONS', {id}));
  }
}
