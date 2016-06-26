import Abstract from '../Abstract';

export default class Tax extends Abstract {

  constructor(api) {
    const baseRoute = 'TAXES';
    super(api, baseRoute);
  }
}
