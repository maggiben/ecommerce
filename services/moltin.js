import got from 'got';
import Form from 'form-data';
import url from 'url';
import querystring from 'querystring';

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
    this.AUTH_URL = `${this.options.protocol}://${this.options.base}/oauth/access_token`;
    this.authData = false;  // tokens from server
  }

  endpoint(endpoint) {
    let endpoints = {
      'PRODUCTS': 'products',
      'SEARCH_PRODUCTS': 'products/search',
      'VARIATIONS': 'products/{id}/variations',
      'IMAGES': 'files',
      'CATEGORIES': 'categories',
      'SEARCH_CATEGORIES': 'categories/search',
      'TREE': 'categories/tree',
      'TAXES': 'taxes',
      'FLOWS': 'flows'
    };

    let api = {
      protocol: this.options.protocol,
      host: this.options.base,
      pathname: this.options.version
    };

    let links = Object.keys(endpoints).reduce( (acc, k) => {
      acc[k] = `${url.format(api)}/${endpoints[k]}` //`{this.options.base}/${this.options.version}/${endpoints[k])}`;
      return acc;
    }, {});

    return links[endpoint];
  }

  authenticate() {
    if(this.authData) {
      return Promise.resolve(this.authData);
    }
    console.log(this.AUTH_URL)
    return got(this.AUTH_URL, {
        method: 'POST',
        body: this.options.credentials,
        json: true
      })
      .then(response => {
        console.log(response.body)
        this.authData = response.body;
        return response.body;
      });
  }

  authHeader() {
    return {
      Authorization: 'Bearer ' + this.authData.access_token
    };
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

  request(url, options = {}) {
    return this.authenticate()
    .then(auth => {
      options = Object.assign(options, {
        headers: this.authHeader(),
        json: true
      });
      //console.log(url);
      //console.log(JSON.stringify(options, null,2));
      return got(url, options).then(response => {
        return response.body
      });
    });
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
          }, img)})
        )
        .then(imgs => { return {
          product: prod,
          images: imgs
        };
      });
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
    return this.request(`${this.endpoint('CATEGORIES')}/${id}`, {
      method: 'PUT',
      body: category
    })
    .then(category => category.result);
  }

  deleteCategory(id) {
    return this.request(`${this.endpoint('CATEGORIES')}/${id}`, {
      method: 'DELETE',
      body: null
    });
  }
}
