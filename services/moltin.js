import got from 'got';
import Form from 'form-data';
import url from 'url';
import querystring from 'querystring';
import template from 'url-template';

import Product from './features/Product';
import Category from './features/Category';
import Tax from './features/Tax';
import Brand from './features/Brand';
import Cart from './features/Cart';

export default class Moltin {

  constructor(credentials) {
    this.options = {
      base: 'api.molt.in',
      protocol: 'https',
      version: 'v1',
      credentials: {
        'client_id': credentials.publicId,
        'client_secret': credentials.secretKey,
        'grant_type': 'client_credentials'
      }
    };

    let authUri = {
      protocol: this.options.protocol,
      host: this.options.base,
      pathname: '/oauth/access_token'
    }

    this.AUTH_URL = url.format(authUri);
    this.authData = false;  // tokens from server

    this.Product = new Product(this);
    this.Category = new Category(this);
    this.Tax = new Tax(this);
    this.Brand = new Brand(this);
    this.Cart = new Cart(this);
  }

  endpoint(endpoint, data = {}) {
    const endpoints = {
      'PRODUCTS':          'products/{id}',
      'SEARCH_PRODUCTS':   'products/search/{terms}',
      'MODIFIERS':         'products/{id}/modifiers',
      'VARIATIONS':        'products/{id}/variations',
      'IMAGES':            'files',
      'CATEGORIES':        'categories/{id}',
      'SEARCH_CATEGORIES': 'categories/search/{terms}',
      'TREE':              'categories/tree',
      'CATEGORY_ORDER':    'categories/order',
      'TAXES':             'taxes/{id}',
      'FLOWS':             'flows',
      'BRANDS':            'brands/{id}',
      'CARTS':             'carts/{id}',
      'CARTS_ITEMS':       'carts/{cartId}/item/{id}',
      'CARTS_HAS':         'carts/{cartId}/has/{id}',
      'CARTS_CHECKOUT':    'carts/{cartId}/checkout',
      'CARTS_DISCOUNT':    'carts/{cartId}/discount',
      'CUSTOMERS':         'customers/{id}'
    };

    let path = template.parse(endpoints[endpoint]).expand(data).replace(/\/+$/, '');
    let api = {
      protocol: this.options.protocol,
      host: this.options.base,
      pathname: this.options.version + `/${path}`
    };
    return url.format(api);
  }

  authenticate() {
    let expires = parseInt(this.authData.expires, 10) * 1000;
    if(this.authData && Date.now() < parseInt(expires, 10)) {
      return Promise.resolve(this.authData);
    }
    console.log(this.AUTH_URL)
    return got(this.AUTH_URL, {
        method: 'POST',
        body: this.options.credentials,
        json: true
      })
      .then(response => {
        let expires = parseInt(response.body.expires, 10) * 1000 - Date.now();
        console.log(`${response.body.access_token} expires in: ${this.msToTime(expires)}` );
        this.authData = response.body;
        return response.body;
      });
  }

  msToTime(duration) {
    var milliseconds = parseInt((duration%1000)/100)
      , seconds = parseInt((duration/1000)%60)
      , minutes = parseInt((duration/(1000*60))%60)
      , hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    return hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
  }

  createImage(data = {
    name: 'image.jpg',
    mime: 'image/jpeg'
  }, buffer) {
    if (typeof buffer === 'string') {
      return this.fetchImage(buffer).then(image => this.createImage(data, image));
    }
    let form = new Form();
    form.append('file', buffer, {
      filename: data.name,
      contentType: data.mime
    });

    let props = Object.assign({}, data);
    delete props.file;  // buffer is passed in separately
    Object.keys(props).forEach(key => {
      form.append(key, props[key]);
    });

    let headers = Object.assign(form.getHeaders(), this.authHeader());

    return got.post(this.endpoint('IMAGES'), {
      headers: headers,
      body: form,
      json: true
    });
  }

  fetchImage(uri) {
    return got(uri, { encoding: null }).then(response => response.body);
  }

  async authHeader() {
    let makeHeader = token => {
      return {
        Authorization: 'Bearer ' + token
      };
    }

    let expired = this.authData ? Date.now() < parseInt(this.authData.expires, 10) * 1000 : false;
    if(expired) {
      return Promise.resolve(makeHeader(this.authData.access_token));
    }

    let authenticate = await this.authenticate(); // find by id
    return makeHeader(authenticate.access_token);

  };

  async request(url, options = {}) {
    if (options.method === 'GET' && options.body !== null) {
      url += '?' + querystring.stringify(options.body);
      options.body = null;
    }
    console.log('call: ', url)
    options = Object.assign(options, {
      headers: await this.authHeader(),
      json: true
    });
    return await got(url, options).then(response => response.body);
  }

  createProduct(product, images = new Array()) {
    return this.request(this.endpoint('PRODUCTS'), {
        method: 'POST',
        body: product
      })
      .then(prod => prod.result)
      .then(prod => {
        return Promise.all(images.map( (img, i) => {
          return this.createImage({
            name: prod.slug+'-'+i,
            assign_to: prod.id
          }, img)
        })
      )
      .then(imgs => {
        return {
          product: prod,
          images: imgs
        };
      });
    });
  }

  /*
  updateProduct(id, product) {
    return this.request(this.endpoint('PRODUCTS', {id}), {
      method: 'PUT',
      body: product
    })
    .then(product => product.result);
  }

  deleteProduct(id) {
    return this.request(this.endpoint('PRODUCTS', {id}), {
      method: 'DELETE',
      body: null
    });
  }

  createCategory(category) {
    return this.request(this.endpoint('CATEGORIES'), {
      method: 'POST',
      body: category
    })
    .then(response => response.result);
  }

  updateCategory(id, category) {
    return this.request(this.endpoint('CATEGORIES', {id}), {
      method: 'PUT',
      body: category
    })
    .then(category => category.result);
  }

  deleteCategory(id) {
    return this.request(this.endpoint('CATEGORIES', {id}), {
      method: 'DELETE',
      body: null
    });
  }
  */
}
