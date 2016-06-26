import Abstract from '../Abstract';

export default class Category extends Abstract {

  constructor(api) {
    const baseRoute = 'CATEGORIES';
    super(api, baseRoute);
    this.api = api;
  }

  Tree() {
    return this.api.request(this.api.endpoint('TREE'));
  }
  Order(data) {
    return this.request(this.api.endpoint('CATEGORY_ORDER'), {
      method: 'PUT',
      body: data
    });
  }
}
