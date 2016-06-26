export default class Abstract {

  constructor(api, endpoint) {
    this.api = api;
    this.endpoint = endpoint;
    console.log('Abstract: ', endpoint)
  }

  Get(id) {
    return this.api.request(this.api.endpoint(this.endpoint, {id}));
  }
  Find(terms) {
    return this.api.request(this.api.endpoint(this.endpoint, {terms}));
  }
  List(terms) {
    return this.api.request(this.api.endpoint(this.endpoint, {terms}));
  }
  Fields(id = null) {
    let uri = this.api.endpoint(this.endpoint) + '/' + (id ? id + '/fields' : 'fields');
    return this.api.request(uri);
  }
  Create(data) {
    return this.request(this.api.endpoint(this.endpoint), {
      method: 'POST',
      body: data
    });
  }
  Update(id, data) {
    return this.request(this.api.endpoint(this.endpoint, {id}), {
      method: 'PUT',
      body: data
    });
  }
  Delete(id) {
    return this.request(this.api.endpoint(this.endpoint, {id}), {
      method: 'DELETE',
      body: null
    });
  }
}
