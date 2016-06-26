import Abstract from '../Abstract';
import uuid from 'node-uuid';

export default class Cart extends Abstract {

  constructor(api) {
    const baseRoute = 'CARTS';
    super(api, baseRoute);
    this.api = api;
    this.cartId = uuid.v1();
  }

  Contents() {
    return this.api.request(this.api.endpoint(this.endpoint, {cartId: this.cartId}));
  }
  Insert(id, quantity = 1, modifier = null) {
    return this.api.request(this.api.endpoint(this.endpoint, {cartId: this.cartId}), {
      method: 'POST',
      body: {
        id: id,
        quantity: quantity,
        modifier: modifier
      }
    });
  }
  Update(id, data) {
    return this.api.request(this.api.endpoint('CARTS_ITEMS', {cartId: this.cartId}), {
      method: 'PUT',
      body: data
    });
  }
  Delete() {
    return this.request(this.api.endpoint(this.endpoint, {cartId: this.cartId}), {
      method: 'DELETE',
      body: null
    });
  }
  Remove(id) {
    return this.request(this.api.endpoint('CARTS_ITEMS', {cartId: this.cartId, id: id}), {
      method: 'DELETE',
      body: null
    });
  };
  Item(id) {
    return this.request(this.api.endpoint('CARTS_ITEMS', {cartId: this.cartId, id: id}));
  };
  InCart(id) {
    return this.request(this.api.endpoint('CARTS_HAS', {cartId: this.cartId, id: id}));
  };
  Checkout() {
    return this.api.request(this.api.endpoint('CARTS_CHECKOUT', {cartId: this.cartId}));
  };
  Complete(data) {
    return this.api.request(this.api.endpoint('CARTS_CHECKOUT', {cartId: this.cartId}), {
      method: 'POST',
      body: data
    });
  };
  Discount(code) {
    if (code === null || code === false) {
      return this.request(this.api.endpoint('CARTS_DISCOUNT', {cartId: this.cartId}), {
        method: 'DELETE',
        body: null
      });
      return this.m.Request('carts/' + this.cartId + '/discount', 'DELETE', null, callback, error);
    }
    return this.request(this.api.endpoint('CARTS_DISCOUNT', {cartId: this.cartId}), {
      method: 'POST',
      body: {
        code: code
      }
    });
  };
}
