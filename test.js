import Moltin from './services/moltin';

const client = new Moltin({
  publicId: 'Si025LTIJVLnzRv2vZzAU6Vgy5RBim8pdspJQegtN8',
  secretKey: 'qWYmQn7GsrkC7hj3UE0zzVI1u9reE9eT2dZsqpwmgu'
});

var product = {
  title: 'Bulk Glass Eye Charms',
  price: 30,
  description: 'Eye charms',
  slug: 'bulk-glass-eye-charms',
  sku: '3214',
  status: 1,
  category: '1271996119089414999',
  stock_level: '1',
  stock_status: 1,
  requires_shipping: 1,
  catalog_only: 0,
  tax_band: '1275562953474572346'
};

var images = [
  "http://media.flightclub.com/media/catalog/product/cache/1/image/700x500/9df78eab33525d08d6e5fb8d27136e95/n/i/nike-ws-blazer-mid-prm-qs-iridescent-multi-color-multi-color-042230_1.jpg",
  "http://media.flightclub.com/media/catalog/product/cache/1/image/700x500/9df78eab33525d08d6e5fb8d27136e95/n/i/nike-ws-blazer-mid-prm-qs-iridescent-multi-color-multi-color-042230_2.jpg",
  "http://media.flightclub.com/media/catalog/product/cache/1/image/700x500/9df78eab33525d08d6e5fb8d27136e95/n/i/nike-ws-blazer-mid-prm-qs-iridescent-multi-color-multi-color-042230_3.jpg",
  "http://media.flightclub.com/media/catalog/product/cache/1/image/700x500/9df78eab33525d08d6e5fb8d27136e95/n/i/nike-ws-blazer-mid-prm-qs-iridescent-multi-color-multi-color-042230_4.jpg"
];

client.createProduct(product, images)
  .then(res => console.log(res.product, res.images))
  .catch(err => console.log(err, err.response.body));