import Abstract from '../Abstract';

export default class Brand extends Abstract {

  constructor(api) {
    const baseRoute = 'BRANDS';
    super(api, baseRoute);
  }
}
