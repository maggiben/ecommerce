import cheerio from 'cheerio';
import async from 'async';
//import request from 'requestretry';
import request from 'request';
import got from 'got';
import FormData from 'form-data';
import url from 'url';
import http from 'https';
import fs from 'fs';

const moltin = require('moltin')({
  publicId: 'Si025LTIJVLnzRv2vZzAU6Vgy5RBim8pdspJQegtN8',
  secretKey: 'qWYmQn7GsrkC7hj3UE0zzVI1u9reE9eT2dZsqpwmgu'
});

var MoltinUtil = require('moltin-util');

var client = MoltinUtil({
  publicId: 'Si025LTIJVLnzRv2vZzAU6Vgy5RBim8pdspJQegtN8',
  secretKey: 'qWYmQn7GsrkC7hj3UE0zzVI1u9reE9eT2dZsqpwmgu'
});


moltin.Authenticate(function() {
    console.log('moltin authenticated')
    return;
    moltin.Product.Search(null, function(product) {
        // Handle the product
        console.log(JSON.stringify(product, null, 2))
    }, function(error) {
        // Something went wrong...
    });
    /*
    moltin.Product.Create({
        title: '12-Cup Coffeemaker',
        slug: '12cup-coffemaker',
        sku: '1893015',
        price: 44.99,
        status: 1,
        category: '1272153933032194588',
        stock_level: 0,
        stock_status: 3,
        requires_shipping: 1,
        catalog_only: 1,
        tax_band: '1271996119273963565',
        description: 'Brew delicious coffee with this 12-cup coffeemaker. Have a fresh cup in the morning! Have coffee right now! I need more coffee!',
    }, function(product) {
        // Handle the product
        console.log('product: ', JSON.stringify(product, null, 2))
    }, function(error) {
        console.log('error: ', JSON.stringify(product, null, 2))
    });
    */
    console.log('moltin exit')
});


const baseUrl = 'http://www.flightclub.com';
//const pathnames = ['/accessories/g-shocks', '/accessories/g-shocks', '/accessories/g-shocks', '/accessories/g-shocks', '/accessories/g-shocks', '/accessories/sunglasses', '/accessories/sunglasses', '/accessories/sunglasses', '/accessories/sunglasses', '/accessories/sunglasses', '/accessories/sunglasses/oakley', '/accessories/sunglasses/oakley', '/accessories/sunglasses/oakley', '/accessories/sunglasses/oakley', '/accessories/sunglasses/oakley', '/accessories/sunglasses/ray-ban', '/accessories/sunglasses/shwood', '/accessories/sunglasses/super', '/air-jordans/6-rings', '/air-jordans/6-rings', '/air-jordans/6-rings', '/air-jordans/6-rings', '/air-jordans/6-rings', '/air-jordans/6-rings', '/air-jordans/air-jordan-1', '/air-jordans/air-jordan-1', '/air-jordans/air-jordan-1', '/air-jordans/air-jordan-1', '/air-jordans/air-jordan-1', '/air-jordans/air-jordan-1', '/air-jordans/air-jordan-1', '/air-jordans/air-jordan-10', '/air-jordans/air-jordan-10', '/air-jordans/air-jordan-10', '/air-jordans/air-jordan-10', '/air-jordans/air-jordan-10', '/air-jordans/air-jordan-10', '/air-jordans/air-jordan-11', '/air-jordans/air-jordan-11', '/air-jordans/air-jordan-11', '/air-jordans/air-jordan-11', '/air-jordans/air-jordan-11', '/air-jordans/air-jordan-11', '/air-jordans/air-jordan-11', '/air-jordans/air-jordan-12', '/air-jordans/air-jordan-12', '/air-jordans/air-jordan-12', '/air-jordans/air-jordan-12', '/air-jordans/air-jordan-12', '/air-jordans/air-jordan-12', '/air-jordans/air-jordan-12', '/air-jordans/air-jordan-13', '/air-jordans/air-jordan-13', '/air-jordans/air-jordan-13', '/air-jordans/air-jordan-13', '/air-jordans/air-jordan-13', '/air-jordans/air-jordan-13', '/air-jordans/air-jordan-13', '/air-jordans/air-jordan-14', '/air-jordans/air-jordan-14', '/air-jordans/air-jordan-14', '/air-jordans/air-jordan-14', '/air-jordans/air-jordan-14', '/air-jordans/air-jordan-14', '/air-jordans/air-jordan-15', '/air-jordans/air-jordan-15', '/air-jordans/air-jordan-15', '/air-jordans/air-jordan-15', '/air-jordans/air-jordan-15', '/air-jordans/air-jordan-15', '/air-jordans/air-jordan-16', '/air-jordans/air-jordan-16', '/air-jordans/air-jordan-16', '/air-jordans/air-jordan-16', '/air-jordans/air-jordan-16', '/air-jordans/air-jordan-16', '/air-jordans/air-jordan-17', '/air-jordans/air-jordan-17', '/air-jordans/air-jordan-17', '/air-jordans/air-jordan-17', '/air-jordans/air-jordan-17', '/air-jordans/air-jordan-18', '/air-jordans/air-jordan-18', '/air-jordans/air-jordan-18', '/air-jordans/air-jordan-18', '/air-jordans/air-jordan-18', '/air-jordans/air-jordan-18', '/air-jordans/air-jordan-19', '/air-jordans/air-jordan-19', '/air-jordans/air-jordan-19', '/air-jordans/air-jordan-19', '/air-jordans/air-jordan-19', '/air-jordans/air-jordan-2', '/air-jordans/air-jordan-2', '/air-jordans/air-jordan-2', '/air-jordans/air-jordan-2', '/air-jordans/air-jordan-2', '/air-jordans/air-jordan-2', '/air-jordans/air-jordan-2', '/air-jordans/air-jordan-20', '/air-jordans/air-jordan-20', '/air-jordans/air-jordan-20', '/air-jordans/air-jordan-20', '/air-jordans/air-jordan-20', '/air-jordans/air-jordan-21', '/air-jordans/air-jordan-21', '/air-jordans/air-jordan-21', '/air-jordans/air-jordan-21', '/air-jordans/air-jordan-21', '/air-jordans/air-jordan-22', '/air-jordans/air-jordan-22', '/air-jordans/air-jordan-22', '/air-jordans/air-jordan-22', '/air-jordans/air-jordan-22', '/air-jordans/air-jordan-23', '/air-jordans/air-jordan-23', '/air-jordans/air-jordan-23', '/air-jordans/air-jordan-23', '/air-jordans/air-jordan-23', '/air-jordans/air-jordan-23', '/air-jordans/air-jordan-3', '/air-jordans/air-jordan-3', '/air-jordans/air-jordan-3', '/air-jordans/air-jordan-3', '/air-jordans/air-jordan-3', '/air-jordans/air-jordan-3', '/air-jordans/air-jordan-3', '/air-jordans/air-jordan-4', '/air-jordans/air-jordan-4', '/air-jordans/air-jordan-4', '/air-jordans/air-jordan-4', '/air-jordans/air-jordan-4', '/air-jordans/air-jordan-4', '/air-jordans/air-jordan-4', '/air-jordans/air-jordan-5', '/air-jordans/air-jordan-5', '/air-jordans/air-jordan-5', '/air-jordans/air-jordan-5', '/air-jordans/air-jordan-5', '/air-jordans/air-jordan-5', '/air-jordans/air-jordan-5', '/air-jordans/air-jordan-6', '/air-jordans/air-jordan-6', '/air-jordans/air-jordan-6', '/air-jordans/air-jordan-6', '/air-jordans/air-jordan-6', '/air-jordans/air-jordan-6', '/air-jordans/air-jordan-6', '/air-jordans/air-jordan-7', '/air-jordans/air-jordan-7', '/air-jordans/air-jordan-7', '/air-jordans/air-jordan-7', '/air-jordans/air-jordan-7', '/air-jordans/air-jordan-7', '/air-jordans/air-jordan-7', '/air-jordans/air-jordan-8', '/air-jordans/air-jordan-8', '/air-jordans/air-jordan-8', '/air-jordans/air-jordan-8', '/air-jordans/air-jordan-8', '/air-jordans/air-jordan-8', '/air-jordans/air-jordan-9', '/air-jordans/air-jordan-9', '/air-jordans/air-jordan-9', '/air-jordans/air-jordan-9', '/air-jordans/air-jordan-9', '/air-jordans/air-jordan-9', '/air-jordans/air-jordan-9', '/air-jordans/jordan-future', '/air-jordans/jordan-future', '/air-jordans/jordan-future', '/air-jordans/jordan-future', '/air-jordans/jordan-future', '/air-jordans/other-jordans', '/air-jordans/other-jordans', '/air-jordans/other-jordans', '/air-jordans/other-jordans', '/air-jordans/other-jordans', '/air-jordans/spiz-ike', '/air-jordans/spiz-ike', '/air-jordans/spizike', '/air-jordans/spizike', '/air-jordans/spizike', '/air-jordans/spizike', '/air-jordans/spizike', '/flight-club/everything-else-274', '/flight-club/everything-else-274', '/flight-club/everything-else-274', '/flight-club/everything-else-274', '/flight-club/everything-else-274', '/flight-club/everything-else-274', '/flight-club/fitted-caps', '/flight-club/jackets', '/flight-club/jackets', '/flight-club/jackets', '/flight-club/jackets', '/flight-club/jackets', '/flight-club/snap-backs', '/flight-club/snap-backs', '/flight-club/snap-backs', '/flight-club/snap-backs', '/flight-club/snap-backs', '/flight-club/sweatshirts', '/flight-club/sweatshirts', '/flight-club/sweatshirts', '/flight-club/sweatshirts', '/flight-club/sweatshirts', '/flight-club/t-shirts', '/flight-club/t-shirts', '/flight-club/t-shirts', '/flight-club/t-shirts', '/flight-club/t-shirts', '/flight-club/t-shirts', '/footwear/adidas', '/footwear/adidas', '/footwear/adidas', '/footwear/adidas', '/footwear/adidas', '/footwear/adidas', '/footwear/adidas', '/footwear/adidas/campus', '/footwear/adidas/campus', '/footwear/adidas/campus', '/footwear/adidas/campus', '/footwear/adidas/campus', '/footwear/adidas/gazelle', '/footwear/adidas/gazelle', '/footwear/adidas/gazelle', '/footwear/adidas/gazelle', '/footwear/adidas/gazelle', '/footwear/adidas/jeremy-scott', '/footwear/adidas/jeremy-scott', '/footwear/adidas/jeremy-scott', '/footwear/adidas/jeremy-scott', '/footwear/adidas/jeremy-scott', '/footwear/adidas/jeremy-scott', '/footwear/adidas/other-adidas', '/footwear/adidas/other-adidas', '/footwear/adidas/other-adidas', '/footwear/adidas/other-adidas', '/footwear/adidas/other-adidas', '/footwear/adidas/other-adidas', '/footwear/adidas/rod-laver', '/footwear/adidas/stan-smith', '/footwear/adidas/stan-smith', '/footwear/adidas/stan-smith', '/footwear/adidas/stan-smith', '/footwear/adidas/stan-smith', '/footwear/adidas/superstar', '/footwear/adidas/superstar', '/footwear/adidas/superstar', '/footwear/adidas/superstar', '/footwear/adidas/superstar', '/footwear/adidas/yeezy', '/footwear/adidas/yeezy', '/footwear/adidas/yeezy', '/footwear/adidas/yeezy', '/footwear/adidas/yeezy', '/footwear/adidas/zx-eqt-series', '/footwear/adidas/zx-eqt-series', '/footwear/adidas/zx-eqt-series', '/footwear/adidas/zx-eqt-series', '/footwear/adidas/zx-eqt-series', '/footwear/asics', '/footwear/asics', '/footwear/asics', '/footwear/asics', '/footwear/asics', '/footwear/asics', '/footwear/brooks', '/footwear/brooks', '/footwear/brooks', '/footwear/brooks', '/footwear/brooks', '/footwear/converse', '/footwear/converse', '/footwear/converse', '/footwear/converse', '/footwear/converse', '/footwear/converse', '/footwear/converse', '/footwear/ewing', '/footwear/ewing', '/footwear/ewing', '/footwear/ewing', '/footwear/ewing', '/footwear/ewing', '/footwear/ewing', '/footwear/new-balance', '/footwear/new-balance', '/footwear/new-balance', '/footwear/new-balance', '/footwear/new-balance', '/footwear/new-balance', '/footwear/new-balance', '/footwear/new-balance/1300', '/footwear/new-balance/1300', '/footwear/new-balance/1300', '/footwear/new-balance/1300', '/footwear/new-balance/1300', '/footwear/new-balance/574', '/footwear/new-balance/574', '/footwear/new-balance/574', '/footwear/new-balance/574', '/footwear/new-balance/574', '/footwear/new-balance/574', '/footwear/new-balance/other-new-balances', '/footwear/new-balance/other-new-balances', '/footwear/new-balance/other-new-balances', '/footwear/new-balance/other-new-balances', '/footwear/new-balance/other-new-balances', '/footwear/new-balance/other-new-balances', '/footwear/other-brands', '/footwear/other-brands', '/footwear/other-brands', '/footwear/other-brands', '/footwear/other-brands', '/footwear/other-brands', '/footwear/other-brands', '/footwear/puma', '/footwear/puma', '/footwear/puma', '/footwear/puma', '/footwear/puma', '/footwear/puma', '/footwear/reebok', '/footwear/reebok', '/footwear/reebok', '/footwear/reebok', '/footwear/reebok', '/footwear/reebok', '/footwear/reebok/iverson', '/footwear/reebok/iverson', '/footwear/reebok/iverson', '/footwear/reebok/iverson', '/footwear/reebok/iverson', '/footwear/reebok/kamikaze', '/footwear/reebok/kamikaze', '/footwear/reebok/kamikaze', '/footwear/reebok/kamikaze', '/footwear/reebok/kamikaze', '/footwear/reebok/pump', '/footwear/reebok/pump', '/footwear/reebok/pump', '/footwear/reebok/pump', '/footwear/reebok/pump', '/footwear/reebok/pump', '/footwear/reebok/shaq', '/footwear/reebok/shaq', '/footwear/reebok/shaq', '/footwear/reebok/shaq', '/footwear/saucony', '/footwear/saucony', '/footwear/saucony', '/footwear/saucony', '/footwear/saucony', '/footwear/vans', '/footwear/vans', '/footwear/vans', '/footwear/vans', '/footwear/vans', '/hats/atlanta', '/hats/atlanta', '/hats/atlanta', '/hats/atlanta', '/hats/atlanta', '/hats/baltimore', '/hats/baltimore', '/hats/baltimore', '/hats/baltimore', '/hats/baltimore', '/hats/beanie', '/hats/beanie', '/hats/beanie', '/hats/beanie', '/hats/beanie', '/hats/beanie', '/hats/boston', '/hats/boston', '/hats/boston', '/hats/boston', '/hats/boston', '/hats/brooklyn', '/hats/brooklyn', '/hats/brooklyn', '/hats/brooklyn', '/hats/brooklyn', '/hats/buffalo', '/hats/calgary', '/hats/charlotte', '/hats/charlotte', '/hats/charlotte', '/hats/charlotte', '/hats/charlotte', '/hats/chicago', '/hats/chicago', '/hats/chicago', '/hats/chicago', '/hats/chicago', '/hats/chicago', '/hats/cincinnati', '/hats/cincinnati', '/hats/cincinnati', '/hats/cincinnati', '/hats/cincinnati', '/hats/cleveland', '/hats/cleveland', '/hats/cleveland', '/hats/cleveland', '/hats/cleveland', '/hats/dallas', '/hats/denver', '/hats/detroit', '/hats/detroit', '/hats/detroit', '/hats/detroit', '/hats/detroit', '/hats/fitted', '/hats/fitted', '/hats/fitted', '/hats/fitted', '/hats/fitted', '/hats/fitted', '/hats/fitted', '/hats/flight-club', '/hats/flight-club', '/hats/flight-club', '/hats/flight-club', '/hats/flight-club', '/hats/houston', '/hats/houston', '/hats/houston', '/hats/houston', '/hats/houston', '/hats/indiana', '/hats/indiana', '/hats/indiana', '/hats/indiana', '/hats/indiana', '/hats/kansas-city', '/hats/los-angeles', '/hats/los-angeles', '/hats/los-angeles', '/hats/los-angeles', '/hats/los-angeles', '/hats/miami', '/hats/milwaukee', '/hats/milwaukee', '/hats/milwaukee', '/hats/milwaukee', '/hats/milwaukee', '/hats/minnesota', '/hats/minnesota', '/hats/minnesota', '/hats/minnesota', '/hats/minnesota', '/hats/montreal', '/hats/montreal', '/hats/montreal', '/hats/montreal', '/hats/montreal', '/hats/new-jersey', '/hats/new-orleans', '/hats/new-york', '/hats/new-york', '/hats/new-york', '/hats/new-york', '/hats/new-york', '/hats/new-york', '/hats/oakland', '/hats/oakland', '/hats/oakland', '/hats/oakland', '/hats/oakland', '/hats/orlando', '/hats/orlando', '/hats/orlando', '/hats/orlando', '/hats/orlando', '/hats/philly', '/hats/philly', '/hats/philly', '/hats/philly', '/hats/philly', '/hats/phoenix', '/hats/pittsburgh', '/hats/pittsburgh', '/hats/pittsburgh', '/hats/pittsburgh', '/hats/pittsburgh', '/hats/portland', '/hats/sacramento', '/hats/san-antonio', '/hats/san-diego', '/hats/san-francisco', '/hats/san-francisco', '/hats/san-francisco', '/hats/san-francisco', '/hats/san-francisco', '/hats/snap-back', '/hats/snap-back', '/hats/snap-back', '/hats/snap-back', '/hats/snap-back', '/hats/snap-back', '/hats/snap-back', '/hats/st-louis', '/hats/toronto', '/hats/toronto', '/hats/toronto', '/hats/toronto', '/hats/toronto', '/hats/vancouver', '/hats/vancouver', '/hats/vancouver', '/hats/vancouver', '/hats/vancouver', '/hats/washington', '/hats/washington', '/hats/washington', '/hats/washington', '/hats/washington', '/media/catalog/product/cache/1/small_image/234x167/9df78eab33525d08d6e5fb8d27136e95/n/i/nike-dunk-mid-pro-sb-wu-tang-black-black-varsity-mz-sport-rd-080605_1/png', '/nike/nike-air-force', '/nike/nike-air-force', '/nike/nike-air-force', '/nike/nike-air-force', '/nike/nike-air-force', '/nike/nike-air-force', '/nike/nike-air-force', '/nike/nike-air-force/air-force-1-high', '/nike/nike-air-force/air-force-1-high', '/nike/nike-air-force/air-force-1-high', '/nike/nike-air-force/air-force-1-high', '/nike/nike-air-force/air-force-1-high', '/nike/nike-air-force/air-force-1-low', '/nike/nike-air-force/air-force-1-low', '/nike/nike-air-force/air-force-1-low', '/nike/nike-air-force/air-force-1-low', '/nike/nike-air-force/air-force-1-low', '/nike/nike-air-force/air-force-1-low', '/nike/nike-air-force/nike-force-1-mid', '/nike/nike-air-force/nike-force-1-mid', '/nike/nike-air-force/nike-force-1-mid', '/nike/nike-air-force/nike-force-1-mid', '/nike/nike-air-force/nike-force-1-mid', '/nike/nike-air-force/other-air-force', '/nike/nike-basketball', '/nike/nike-basketball', '/nike/nike-basketball', '/nike/nike-basketball', '/nike/nike-basketball', '/nike/nike-basketball', '/nike/nike-basketball', '/nike/nike-basketball/blazer', '/nike/nike-basketball/blazer', '/nike/nike-basketball/blazer', '/nike/nike-basketball/blazer', '/nike/nike-basketball/blazer', '/nike/nike-basketball/blazer', '/nike/nike-basketball/charles-barkley', '/nike/nike-basketball/charles-barkley', '/nike/nike-basketball/charles-barkley', '/nike/nike-basketball/charles-barkley', '/nike/nike-basketball/charles-barkley', '/nike/nike-basketball/charles-barkley', '/nike/nike-basketball/kevin-durant', '/nike/nike-basketball/kevin-durant', '/nike/nike-basketball/kevin-durant', '/nike/nike-basketball/kevin-durant', '/nike/nike-basketball/kevin-durant', '/nike/nike-basketball/kevin-durant', '/nike/nike-basketball/kevin-durant', '/nike/nike-basketball/kobe-bryant', '/nike/nike-basketball/kobe-bryant', '/nike/nike-basketball/kobe-bryant', '/nike/nike-basketball/kobe-bryant', '/nike/nike-basketball/kobe-bryant', '/nike/nike-basketball/kobe-bryant', '/nike/nike-basketball/lebron-james', '/nike/nike-basketball/lebron-james', '/nike/nike-basketball/lebron-james', '/nike/nike-basketball/lebron-james', '/nike/nike-basketball/lebron-james', '/nike/nike-basketball/lebron-james', '/nike/nike-basketball/other-basketball', '/nike/nike-basketball/other-basketball', '/nike/nike-basketball/other-basketball', '/nike/nike-basketball/other-basketball', '/nike/nike-basketball/other-basketball', '/nike/nike-basketball/penny-hardaway', '/nike/nike-basketball/penny-hardaway', '/nike/nike-basketball/penny-hardaway', '/nike/nike-basketball/penny-hardaway', '/nike/nike-basketball/penny-hardaway', '/nike/nike-basketball/penny-hardaway', '/nike/nike-basketball/penny-hardaway', '/nike/nike-basketball/posite', '/nike/nike-basketball/posite', '/nike/nike-basketball/posite', '/nike/nike-basketball/posite', '/nike/nike-basketball/posite', '/nike/nike-basketball/posite', '/nike/nike-basketball/posite', '/nike/nike-cross-training', '/nike/nike-cross-training', '/nike/nike-cross-training', '/nike/nike-cross-training', '/nike/nike-cross-training', '/nike/nike-cross-training', '/nike/nike-cross-training/griffey', '/nike/nike-cross-training/griffey', '/nike/nike-cross-training/griffey', '/nike/nike-cross-training/griffey', '/nike/nike-cross-training/other-cross-training', '/nike/nike-cross-training/other-cross-training', '/nike/nike-cross-training/other-cross-training', '/nike/nike-cross-training/other-cross-training', '/nike/nike-cross-training/trainer', '/nike/nike-cross-training/trainer', '/nike/nike-cross-training/trainer', '/nike/nike-cross-training/trainer', '/nike/nike-dunks', '/nike/nike-dunks', '/nike/nike-dunks', '/nike/nike-dunks', '/nike/nike-dunks', '/nike/nike-dunks', '/nike/nike-dunks/dunk-high', '/nike/nike-dunks/dunk-high', '/nike/nike-dunks/dunk-high', '/nike/nike-dunks/dunk-high', '/nike/nike-dunks/dunk-high', '/nike/nike-dunks/dunk-high', '/nike/nike-dunks/dunk-high', '/nike/nike-dunks/dunk-low', '/nike/nike-dunks/dunk-low', '/nike/nike-dunks/dunk-low', '/nike/nike-dunks/dunk-low', '/nike/nike-dunks/dunk-low', '/nike/nike-dunks/dunk-low', '/nike/nike-dunks/dunk-mid', '/nike/nike-dunks/dunk-mid', '/nike/nike-dunks/dunk-mid', '/nike/nike-dunks/dunk-mid', '/nike/nike-dunks/dunk-mid', '/nike/nike-dunks/sb', '/nike/nike-dunks/sb', '/nike/nike-dunks/sb', '/nike/nike-dunks/sb', '/nike/nike-dunks/sb', '/nike/nike-dunks/sb', '/nike/nike-other', '/nike/nike-other', '/nike/nike-other', '/nike/nike-other', '/nike/nike-other', '/nike/nike-running', '/nike/nike-running', '/nike/nike-running', '/nike/nike-running', '/nike/nike-running', '/nike/nike-running', '/nike/nike-running', '/nike/nike-running/air-max-1', '/nike/nike-running/air-max-1', '/nike/nike-running/air-max-1', '/nike/nike-running/air-max-1', '/nike/nike-running/air-max-1', '/nike/nike-running/air-max-1', '/nike/nike-running/air-max-1', '/nike/nike-running/air-max-90', '/nike/nike-running/air-max-90', '/nike/nike-running/air-max-90', '/nike/nike-running/air-max-90', '/nike/nike-running/air-max-90', '/nike/nike-running/air-max-90', '/nike/nike-running/air-max-95', '/nike/nike-running/air-max-95', '/nike/nike-running/air-max-95', '/nike/nike-running/air-max-95', '/nike/nike-running/air-max-95', '/nike/nike-running/air-max-95', '/nike/nike-running/air-max-97', '/nike/nike-running/flyknit', '/nike/nike-running/flyknit', '/nike/nike-running/flyknit', '/nike/nike-running/flyknit', '/nike/nike-running/flyknit', '/nike/nike-running/flyknit', '/nike/nike-running/flyknit', '/nike/nike-running/huarache', '/nike/nike-running/huarache', '/nike/nike-running/huarache', '/nike/nike-running/huarache', '/nike/nike-running/huarache', '/nike/nike-running/huarache', '/nike/nike-running/other-running', '/nike/nike-running/other-running', '/nike/nike-running/other-running', '/nike/nike-running/other-running', '/nike/nike-running/other-running', '/nike/nike-running/other-running', '/nike/nike-running/roshe-run', '/nike/nike-running/roshe-run', '/nike/nike-running/roshe-run', '/nike/nike-running/roshe-run', '/nike/nike-running/roshe-run', '/nike/nike-running/roshe-run', '/nike/nike-skateboarding', '/nike/nike-skateboarding', '/nike/nike-skateboarding', '/nike/nike-skateboarding', '/nike/nike-skateboarding', '/nike/nike-skateboarding', '/nike/nike-skateboarding', '/nike/nike-skateboarding/blazer-sb', '/nike/nike-skateboarding/blazer-sb', '/nike/nike-skateboarding/blazer-sb', '/nike/nike-skateboarding/blazer-sb', '/nike/nike-skateboarding/blazer-sb', '/nike/nike-skateboarding/bruin-sb', '/nike/nike-skateboarding/bruin-sb', '/nike/nike-skateboarding/bruin-sb', '/nike/nike-skateboarding/bruin-sb', '/nike/nike-skateboarding/bruin-sb', '/nike/nike-skateboarding/dunk-sb-high-97', '/nike/nike-skateboarding/dunk-sb-high-97', '/nike/nike-skateboarding/dunk-sb-high-97', '/nike/nike-skateboarding/dunk-sb-high-97', '/nike/nike-skateboarding/dunk-sb-high-97', '/nike/nike-skateboarding/dunk-sb-high-97', '/nike/nike-skateboarding/dunk-sb-low-95', '/nike/nike-skateboarding/dunk-sb-low-95', '/nike/nike-skateboarding/dunk-sb-low-95', '/nike/nike-skateboarding/dunk-sb-mid-96', '/nike/nike-skateboarding/dunk-sb-mid-96', '/nike/nike-skateboarding/dunk-sb-mid-96', '/nike/nike-skateboarding/dunk-sb-mid-96', '/nike/nike-skateboarding/dunk-sb-mid-96', '/nike/nike-skateboarding/dunk-sb-mid-96', '/nike/nike-skateboarding/janoski', '/nike/nike-skateboarding/janoski', '/nike/nike-skateboarding/janoski', '/nike/nike-skateboarding/janoski', '/nike/nike-skateboarding/janoski', '/nike/nike-skateboarding/janoski', '/nike/nike-skateboarding/other-skateboarding', '/nike/nike-skateboarding/other-skateboarding', '/nike/nike-skateboarding/other-skateboarding', '/nike/nike-skateboarding/other-skateboarding', '/nike/nike-skateboarding/other-skateboarding'];

//javascript:%20(function(){var%20el=document.createElement('div'),b=document.getElementsByTagName('body')[0];otherlib=false,msg='';el.style.position='fixed';el.style.height='32px';el.style.width='220px';el.style.marginLeft='-110px';el.style.top='0';el.style.left='50%';el.style.padding='5px%2010px';el.style.zIndex=1001;el.style.fontSize='12px';el.style.color='#222';el.style.backgroundColor='#f99';if(typeof%20jQuery!='undefined'){msg='This%20page%20already%20using%20jQuery%20v'+jQuery.fn.jquery;return%20showMsg();}else%20if(typeof%20$=='function'){otherlib=true;}%20function%20getScript(url,success){var%20script=document.createElement('script');script.src=url;var%20head=document.getElementsByTagName('head')[0],done=false;script.onload=script.onreadystatechange=function(){if(!done&&(!this.readyState||this.readyState=='loaded'||this.readyState=='complete')){done=true;success();script.onload=script.onreadystatechange=null;head.removeChild(script);}};head.appendChild(script);}%20getScript('http://code.jquery.com/jquery-latest.min.js',function(){if(typeof%20jQuery=='undefined'){msg='Sorry,%20but%20jQuery%20wasn\'t%20able%20to%20load';}else{msg='This%20page%20is%20now%20jQuerified%20with%20v'+jQuery.fn.jquery;if(otherlib){msg+='%20and%20noConflict().%20Use%20$jq(),%20not%20$().';}}%20return%20showMsg();});function%20showMsg(){el.innerHTML=msg;b.appendChild(el);window.setTimeout(function(){if(typeof%20jQuery=='undefined'){b.removeChild(el);}else{jQuery(el).fadeOut('slow',function(){jQuery(this).remove();});if(otherlib){$jq=jQuery.noConflict();}}},2500);}})();

const pathnames = [
    '/accessories/g-shocks',
    '/accessories/sunglasses/oakley',
    '/accessories/sunglasses/ray-ban',
    '/accessories/sunglasses/shwood',
    '/accessories/sunglasses/super',
    '/air-jordans/6-rings',
    '/air-jordans/air-jordan-1',
    '/air-jordans/air-jordan-10',
    '/air-jordans/air-jordan-11',
    '/air-jordans/air-jordan-12',
    '/air-jordans/air-jordan-13',
    '/air-jordans/air-jordan-14',
    '/air-jordans/air-jordan-15',
    '/air-jordans/air-jordan-16',
    '/air-jordans/air-jordan-17',
    '/air-jordans/air-jordan-18',
    '/air-jordans/air-jordan-19',
    '/air-jordans/air-jordan-2',
    '/air-jordans/air-jordan-20',
    '/air-jordans/air-jordan-21',
    '/air-jordans/air-jordan-22',
    '/air-jordans/air-jordan-23',
    '/air-jordans/air-jordan-3',
    '/air-jordans/air-jordan-4',
    '/air-jordans/air-jordan-5',
    '/air-jordans/air-jordan-6',
    '/air-jordans/air-jordan-7',
    '/air-jordans/air-jordan-8',
    '/air-jordans/air-jordan-9',
    '/air-jordans/jordan-future',
    '/air-jordans/other-jordans',
    '/air-jordans/spiz-ike',
    '/air-jordans/spizike',
    '/flight-club/everything-else-274',
    '/flight-club/fitted-caps',
    '/flight-club/jackets',
    '/flight-club/snap-backs',
    '/flight-club/sweatshirts',
    '/flight-club/t-shirts',
    '/footwear/adidas',
    '/footwear/adidas/campus',
    '/footwear/adidas/gazelle',
    '/footwear/adidas/jeremy-scott',
    '/footwear/adidas/other-adidas',
    '/footwear/adidas/rod-laver',
    '/footwear/adidas/stan-smith',
    '/footwear/adidas/superstar',
    '/footwear/adidas/yeezy',
    '/footwear/adidas/zx-eqt-series',
    '/footwear/asics',
    '/footwear/brooks',
    '/footwear/converse',
    '/footwear/ewing',
    '/footwear/new-balance',
    '/footwear/new-balance/1300',
    '/footwear/new-balance/574',
    '/footwear/new-balance/other-new-balances',
    '/footwear/other-brands',
    '/footwear/puma',
    '/footwear/reebok',
    '/footwear/reebok/iverson',
    '/footwear/reebok/kamikaze',
    '/footwear/reebok/pump',
    '/footwear/reebok/shaq',
    '/footwear/saucony',
    '/footwear/vans',
    '/hats/atlanta',
    '/hats/baltimore',
    '/hats/beanie',
    '/hats/boston',
    '/hats/brooklyn',
    '/hats/buffalo',
    '/hats/calgary',
    '/hats/charlotte',
    '/hats/chicago',
    '/hats/cincinnati',
    '/hats/cleveland',
    '/hats/dallas',
    '/hats/denver',
    '/hats/detroit',
    '/hats/fitted',
    '/hats/flight-club',
    '/hats/houston',
    '/hats/indiana',
    '/hats/kansas-city',
    '/hats/los-angeles',
    '/hats/miami',
    '/hats/milwaukee',
    '/hats/minnesota',
    '/hats/montreal',
    '/hats/new-jersey',
    '/hats/new-orleans',
    '/hats/new-york',
    '/hats/oakland',
    '/hats/orlando',
    '/hats/philly',
    '/hats/phoenix',
    '/hats/pittsburgh',
    '/hats/portland',
    '/hats/sacramento',
    '/hats/san-antonio',
    '/hats/san-diego',
    '/hats/san-francisco',
    '/hats/snap-back',
    '/hats/st-louis',
    '/hats/toronto',
    '/hats/vancouver',
    '/hats/washington','/nike/nike-air-force',
    '/nike/nike-air-force/air-force-1-high',
    '/nike/nike-air-force/air-force-1-low',
    '/nike/nike-air-force/nike-force-1-mid',
    '/nike/nike-air-force/other-air-force',
    '/nike/nike-basketball',
    '/nike/nike-basketball/blazer',
    '/nike/nike-basketball/charles-barkley',
    '/nike/nike-basketball/kevin-durant',
    '/nike/nike-basketball/kobe-bryant',
    '/nike/nike-basketball/lebron-james',
    '/nike/nike-basketball/other-basketball',
    '/nike/nike-basketball/penny-hardaway',
    '/nike/nike-basketball/posite',
    '/nike/nike-cross-training',
    '/nike/nike-cross-training/griffey',
    '/nike/nike-cross-training/other-cross-training',
    '/nike/nike-cross-training/trainer',
    '/nike/nike-dunks',
    '/nike/nike-dunks/dunk-high',
    '/nike/nike-dunks/dunk-low',
    '/nike/nike-dunks/dunk-mid',
    '/nike/nike-dunks/sb',
    '/nike/nike-other',
    '/nike/nike-running',
    '/nike/nike-running/air-max-1',
    '/nike/nike-running/air-max-90',
    '/nike/nike-running/air-max-95',
    '/nike/nike-running/air-max-97',
    '/nike/nike-running/flyknit',
    '/nike/nike-running/huarache',
    '/nike/nike-running/other-running',
    '/nike/nike-running/roshe-run',
    '/nike/nike-skateboarding',
    '/nike/nike-skateboarding/blazer-sb',
    '/nike/nike-skateboarding/bruin-sb',
    '/nike/nike-skateboarding/dunk-sb-high-97',
    '/nike/nike-skateboarding/dunk-sb-low-95',
    '/nike/nike-skateboarding/dunk-sb-mid-96',
    '/nike/nike-skateboarding/janoski',
    '/nike/nike-skateboarding/other-skateboarding' 
];

/*
Array.prototype.getUnique = function() {
    return [...new Set(this)];
};
*/
//javascript:%20(function(){var%20el=document.createElement('div'),b=document.getElementsByTagName('body')[0];otherlib=false,msg='';el.style.position='fixed';el.style.height='32px';el.style.width='220px';el.style.marginLeft='-110px';el.style.top='0';el.style.left='50%';el.style.padding='5px%2010px';el.style.zIndex=1001;el.style.fontSize='12px';el.style.color='#222';el.style.backgroundColor='#f99';if(typeof%20jQuery!='undefined'){msg='This%20page%20already%20using%20jQuery%20v'+jQuery.fn.jquery;return%20showMsg();}else%20if(typeof%20$=='function'){otherlib=true;}%20function%20getScript(url,success){var%20script=document.createElement('script');script.src=url;var%20head=document.getElementsByTagName('head')[0],done=false;script.onload=script.onreadystatechange=function(){if(!done&&(!this.readyState||this.readyState=='loaded'||this.readyState=='complete')){done=true;success();script.onload=script.onreadystatechange=null;head.removeChild(script);}};head.appendChild(script);}%20getScript('http://code.jquery.com/jquery-latest.min.js',function(){if(typeof%20jQuery=='undefined'){msg='Sorry,%20but%20jQuery%20wasn\'t%20able%20to%20load';}else{msg='This%20page%20is%20now%20jQuerified%20with%20v'+jQuery.fn.jquery;if(otherlib){msg+='%20and%20noConflict().%20Use%20$jq(),%20not%20$().';}}%20return%20showMsg();});function%20showMsg(){el.innerHTML=msg;b.appendChild(el);window.setTimeout(function(){if(typeof%20jQuery=='undefined'){b.removeChild(el);}else{jQuery(el).fadeOut('slow',function(){jQuery(this).remove();});if(otherlib){$jq=jQuery.noConflict();}}},2500);}})();

const categories = {
    'accessories': {
        childs: {
            'g-shocks': '/accessories/g-shocks',
            'sunglasses': {
                childs: {
                    'oakley': '/accessories/sunglasses/oakley',
                    'ray-ban': '/accessories/sunglasses/ray-ban',
                    'shwood': '/accessories/sunglasses/shwood',
                    'super': '/accessories/sunglasses/super'
                }
            }
        }
    },
    'air-jordans': {
        childs: {
            '6-rings': '/air-jordans/6-rings',
            'air-jordan-1': true,
            'air-jordan-2': true,
            'air-jordan-3': true,
            'air-jordan-4': true,
            'air-jordan-5': true,
            'air-jordan-6': true,
            'air-jordan-7': true,
            'air-jordan-8': true,
            'air-jordan-9': true,
            'air-jordan-10': true,
            'air-jordan-11': true,
            'air-jordan-12': true,
            'air-jordan-13': true,
            'air-jordan-14': true,
            'air-jordan-15': true,
            'air-jordan-16': true,
            'air-jordan-17': true,
            'air-jordan-18': true,
            'air-jordan-19': true,
            'air-jordan-20': true,
            'air-jordan-21': true,
            'air-jordan-22': true,
            'air-jordan-23': true,
            'jordan-future': true,
            'other-jordans': true,
            'spiz-ike': true,
            'spizike': true
        }
    },
    'flight-club': {
        childs: {
            'everything-else-274': true,
            'fitted-caps': true,
            'jackets': true,
            'snap-backs': true,
            'sweatshirts': true,
            't-shirts': true
        }
    },
    'footwear': {
        childs: {
            'adidas': {
                childs: {
                    'campus': true,
                    'gazelle': true,
                    'jeremy-scott': true,
                    'other-adidas': true,
                    'rod-laver': true,
                    'stan-smith': true,
                    'superstar': true,
                    'yeezy': true,
                    'zx-eqt-series': true
                }
            },
            'new-balance': {
                childs: {
                    '1300': true,
                    '574': true,
                    'other-new-balances': true
                }
            },
            'reebok': {
                childs: {
                    'iverson': true,
                    'kamikaze': true,
                    'pump': true,
                    'shaq': true
                }
            }
        }
    },
    'hats': 
        childs: {
            'atlanta': true,
            'baltimore': true,
            'beanie': true,
            'boston': true,
            'brooklyn': true,
            'buffalo': true,
            'calgary': true,
            'charlotte': true,
            'chicago': true,
            'cincinnati': true,
            'cleveland': true,
            'dallas': true,
            'denver': true,
            'detroit': true,
            'fitted': true,
            'flight-club': true,
            'houston': true,
            'indiana': true,
            'kansas-city': true,
            'los-angeles': true,
            'miami': true,
            'milwaukee': true,
            'minnesota': true,
            'montreal': true,
            'new-jersey': true,
            'new-orleans': true,
            'new-york': true,
            'oakland': true,
            'orlando': true,
            'philly': true,
            'phoenix': true,
            'pittsburgh': true,
            'portland': true,
            'sacramento': true,
            'san-antonio': true,
            'san-diego': true,
            'san-francisco': true,
            'snap-back': true,
            'st-louis': true,
            'toronto': true,
            'vancouver': true,
            'washington': true
        }
    },
    'nike': 
        childs: {
            'nike-air-force': {
                childs: {
                    'air-force-1-high': true,
                    'air-force-1-low': true,
                    'nike-force-1-mid': true,
                    'other-air-force': true
                }
            },
            'nike-basketball': {
                childs: {
                    'blazer': true,
                    'charles-barkley': true,
                    'kevin-durant': true,
                    'kobe-bryant': true,
                    'lebron-james': true,
                    'other-basketball': true,
                    'penny-hardaway': true,
                    'posite': true
                }
            },
            'nike-cross-training': {
                childs: {
                    'griffey': true,
                    'other-cross-training': true,
                    'trainer': true
                }
            },
            'nike-dunks': {
                childs: {
                    'dunk-high': true,
                    'dunk-low': true,
                    'dunk-mid': true,
                    'sb': true
                }
            },
            'nike-running': {
                childs: {
                    'air-max-1': true,
                    'air-max-90': true,
                    'air-max-95': true,
                    'air-max-97': true,
                    'flyknit': true,
                    'huarache': true,
                    'other-running': true,
                    'roshe-run': true
                }
            },
            'nike-skateboarding': {
                childs: {
                    'blazer-sb': true,
                    'bruin-sb': true,
                    'dunk-sb-high-97': true,
                    'dunk-sb-low-95': true,
                    'dunk-sb-mid-96': true,
                    'janoski': true,
                    'other-skateboarding': true
                }
            }
        }
    }
};


function makeUrls(pathnames) {
    return new Promise((resolve, reject) => {
        async.mapSeries(pathnames, (pathname, callback) => {
            let canonical = `${baseUrl}${pathname}`;
            return callback(null, canonical);
        }, (error, result) => {
            var merged = [].concat.apply([], result);
            return resolve(result);
        });
    });
}

function crawl(url) {
    return new Promise((resolve, reject) => {
        console.log(`crawling: ${url}`)
        request(url, function (error, response, body) {
            if (error) {
                return reject(error);
            }
            let $ = cheerio.load(body);
            let $products = $('ul.products-grid')
            let products = $products.find('li').map(function() {
                let $product = $(this).find('.item-container');
                let name = $product.find('p.product-name').text().trim().replace(/,/,'');
                let price = $product.find('div.price-wrap').text().trim().replace(/\$/, '');
                let url = $product.find('a').first().attr('href');
                return {
                    name: name,
                    price: parseInt(price),
                    url: url
                };
            });
            return resolve(Array.prototype.slice.call(products));
        });
    });
}

String.prototype.toInteger = function () {
    return parseInt(this.toString(), 10);
}

String.prototype.getQueryParameters = function() {
  return this.replace(/(^\?)/,'').split('&').map(function(n){return n = n.split('='),this[n[0]] = n[1],this}.bind({}))[0];
}

Object.prototype.toQueryString = function () {
    return '?' + Object.keys(json).map(function(key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
    }).join('&');
}


function getPages(link) {
    return new Promise((resolve, reject) => {
        request(`${link}?limit=30`, function (error, response, body) {
            if (error) {
                return reject(error);
            }
            let $ = cheerio.load(body);
            let counter = $('.page-counter').text().trim().replace(/Page 1 of /, '').toInteger();
            return resolve(counter);
        });
    });
}
function getCategoryId(link) {
   return new Promise((resolve, reject) => {
        request(link, function (error, response, body) {
            if (error) {
                return reject(error);
            }
            let $ = cheerio.load(body);
            let href = $('.category-products a.next.i-next').first().attr('href');
            let parts = url.parse(href).query.getQueryParameters();
            return resolve(parts.id);
        });
    }); 
}

async function findAllProducts(category) {
    let id = await getCategoryId(category);
    let count = await getPages(category);
    let products = await getAllProducts(category, id, count);
    let merged = [].concat.apply([], products);
    return merged;
}

function getAllProducts(category, id, count) {
    let links = Array.apply(null, Array(count));
    let products = links.map((link, index) => {
        index = index + 1;
        let uri = `${category}?id=${id}&p=${index}&limit=30`;
        return crawl(uri);
    });
    return Promise.all(products);
}

function getImages($) {
    let images = $('.more-views.thumbs li.more-views-li').map(function() {
        let $image = $(this);
        let src = $image.find('a').first().attr('data-url-zoom').trim();
        return src;
    });
    return Array.prototype.slice.call(images);
}

function getAttributes($) {
    let $attributes = $('.product-shop .product-attribute-list .attribute-label');
    return {
        year: $attributes.get(1) ? $attributes.get(1).nextSibling.nodeValue.toInteger() : null,
        color: $attributes.get(2) ? $attributes.get(2).nextSibling.nodeValue : null
    };
}

function getOptions($) {
    let options = $('.product-shop .product-options ul.list-size li').map(function() {
        let $option = $(this).find('button');
        return {
            productId: $option.attr('data-productid').trim(),
            attributeId: $option.attr('data-attributeid').trim(),
            optionid: $option.attr('data-optionid').trim(),
            text: $option.text().trim()
        };
    });
    return Array.prototype.slice.call(options);
}

function getTitle($) {
    return $('.product-shop .product-name h1').text().trim();
}

function getPrice($) {
    return $('.product-shop .regular-price span.price').text().trim().replace(/\$/, '').toInteger();
}

function getDetail(product) {
    return new Promise((resolve, reject) => {
        console.log('loading: ', product);
        request({
            url: product,
            timeout: 1500,
            // The above parameters are specific to Request-retry
            maxAttempts: 5,   // (default) try 5 times
            retryDelay: 5000,  // (default) wait for 5s before trying again
            retryStrategy: request.RetryStrategies.HTTPOrNetworkError // (default) retry on 5xx or network errors
        }, function (error, response, body) {
            if (error) {
                return reject(error);
            }
            let $ = cheerio.load(body);
            let details = {
                images: getImages($),
                title: getTitle($),
                price: getPrice($),
                options: getOptions($),
                attributes: getAttributes($)
            };
            console.log('loaded: ', product);
            return resolve(details);
        });
    });
}

function getDetails(products) {
    console.log('prodcuts: ', products.length);
    let details = products.map((product, index) => {
        return getDetail(product.url);
    });
    return Promise.all(details);
}

/*
{
  "method": "POST",
  "async": true,
  "data": {
    "grant_type": "client_credentials",
    "client_id": "Si025LTIJVLnzRv2vZzAU6Vgy5RBim8pdspJQegtN8",
    "client_secret": "qWYmQn7GsrkC7hj3UE0zzVI1u9reE9eT2dZsqpwmgu"
  },
  "timeout": 60000,
  "headers": {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  "host": "api.molt.in",
  "port": 443,
  "path": "/oauth/access_token",
  "withCredentials": false
}
*/

/*
{
  "method": "POST",
  "async": true,
  "data": {
    "grant_type": "client_credentials",
    "client_id": "Si025LTIJVLnzRv2vZzAU6Vgy5RBim8pdspJQegtN8",
    "client_secret": "qWYmQn7GsrkC7hj3UE0zzVI1u9reE9eT2dZsqpwmgu"
  },
  "timeout": 60000,
  "headers": {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  "host": "api.molt.in",
  "port": 443,
  "path": "/oauth/access_token",
  "withCredentials": false
}
*/

class Api {
    constructor(publicId, secretKey) {
        this.options = {
            url: 'api.molt.in',
            version: 'v1',
            publicId: publicId,
            secretKey: secretKey
        };
    }

    InArray(key, arr) {
        if (!arr || Array.prototype.indexOf.call(arr, key) < 0) {
            return false;
        }
        return true;
    }

    Serialize(obj, prefix) {
        let key, str, value;
        if (prefix == null) {
            prefix = null;
        }
        str = [];
        for (key in obj) {
            value = obj[key];
            key = prefix !== null ? prefix + '[' + key + ']' : key;
            str.push(typeof value === 'object' ? this.Serialize(value, key) : encodeURIComponent(key) + '=' + encodeURIComponent(value));
        }
        return str.join('&');
    }
}

class Authenticate extends Api {
    constructor(publicId, secretKey) {
        super(publicId, secretKey);
        this.options.data = {
            grant_type: 'client_credentials',
            client_id: this.options.publicId,
            client_secret: this.options.secretKey
        };
        //return this.authenticate(data);
    }
    authenticate(data) {
        return new Promise((resolve, reject) => {
            let options = {
                method: 'POST',
                async: true,
                data: this.options.data,
                timeout: 60000,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                host: this.options.url,
                port: 443,
                path: '/oauth/access_token',
                withCredentials: false
            };
            options.path = options.path.substr(0, 1) !== '/' ? '/' + this.options.version + '/' + options.path : options.path;
            let request = http.request(options, (response) => {
                let data = '';
                response.on('data', (chunk) => {
                    return data += chunk;
                });
                return response.on('end', () => {
                    try {
                        let result = JSON.parse(data);
                        if(response.statusCode !== 200) {
                            return reject(result, response.statusCode, request);
                        } else {
                            this.options.auth = {
                                token: result.access_token,
                                expires: parseInt(result.expires) * 1000
                            };
                            return resolve(result, response.statusCode, request);
                        }
                    } catch(error) {
                        return reject(error.message, response.statusCode, request);
                    }
                });
            });
            if (super.InArray(options.method, ['POST', 'PUT']) && options.data !== null) {
                request.write(super.Serialize(options.data));
            }
            return request.end();
        });
    }
    image() {
        client.fetchImage('http://media.flightclub.com/media/catalog/product/cache/1/image/700x500/9df78eab33525d08d6e5fb8d27136e95/n/i/nike-dunk-low-prm-dls-sb-qs-de-la-soul-safari-altitude-green-brq-brwn-081225_1.jpg')
        //.then(client.resize.bind(client, 600))
        // opts for api: https://docs.moltin.com/images/
        .then(client.createImage.bind(client, {
            'name': 'example.jpg',
            'assign_to': '1273229061082055296'
        }))
        .then(resp => console.log(resp.body))
        .catch(err => console.log('error', err));
    }
    imageXX() {
        console.log('1-------------image------------------X')
        let form = new FormData();
        let options = {
            'Authorization': 'Bearer ' + this.options.auth.token
        };
        //form.append('assign_to', '1273229061082055296');
        //form.append('file', fs.createReadStream('./logo.png'));

        form.append('file', fs.createReadStream('./logo.png'), {
          filename: 'logo.jpg',
          'assign_to': '1273229061082055296',
          contentType: 'image/png'
        });
        //form.append('assign_to', '1273229061082055296');

        try {
            got.post('https://api.molt.in/v1/files', {
                headers: {
                    'Authorization': 'Bearer ' + this.options.auth.token
                },
                body: form,
                json: true
            }).then(() => {
                console.log('woot: ', arguments)
            }).catch(error => {
                console.log(error)
            });
        } catch (error) {
            console.log(error)
        }

        console.log('2-------------------------------------X', typeof form.submit, ' X')

        /*

        curl -X POST https://api.molt.in/v1/files -H "Authorization: Bearer 66749caf9edc755cb714f593d06991f9f7bf32bb" -H "Content-Type: multipart/form-data" -F "file=@./logo.png" -d "assign_to=1273229061082055296"

        form.submit({
            host: 'api.molt.in',
            path: '/v1/files',
            headers: {
                'Authorization': 'Bearer ' + this.options.auth.token
            }
        }, function(err, res) {
            console.log('form: ', err);
        });

        console.log('1 -------------------------------------')
        let formData = {
          assign_to: '1273229061082055296',
          file: fs.createReadStream('./logo.png')
        };

        console.log('2-------------------------------------', typeof request.post)

        try {
            request.post({
                url: 'https://api.molt.in/v1/files',
                formData: formData
            }, function(err, httpResponse, body) {
            });
        } catch (error) {
            console.log('error: ', error)
        }
        */

        console.log('3-------------------------------------')
    }
    image2() {

        /*
        var r = request.post({
            url: 'https://api.molt.in/v1/files',
            headers: {
                'Authorization': 'Bearer ' + this.options.auth.token
            }
        }, function (err, httpResponse, body) {
            console.log(body)
        })
        var form = r.form();
        form.append('assign_to', '1019656230785778497');
        form.append('file', fs.createReadStream('./logo.png'), {file: 'logo.png'});
        */

        var formData = {
            assign_to: 1019656230785778497,
            file: fs.createReadStream('./logo.png'),
        };

        request.post({
            url: 'https://api.molt.in/v1/files',
            formData: formData,
            headers: {
                'Authorization': 'Bearer ' + this.options.auth.token
            }
        }, function (err, httpResponse, body) {
            console.log(body)
        })

        fs.stat('./logo.png', function(error, info) {
            console.log('stats:', error, info)
        });

        return;

        var formData = {
          file: fs.createReadStream(__dirname + '/unicycle.jpg'),
          // Pass optional meta-data with an 'options' object with style: {value: DATA, options: OPTIONS}
          // Use case: for some types of streams, you'll need to provide "file"-related information manually.
          // See the `form-data` README for more information about options: https://github.com/form-data/form-data
        };
        request.post({
            url: 'https://api.molt.in/v1/files', 
            formData: formData
        }, function optionalCallback(err, httpResponse, body) {
          if (err) {
            return console.error('upload failed:', err);
          }
          console.log('Upload successful!  Server responded with:', body);
        });
    }
    request(uri, method, data) {
        let headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + this.options.auth.token
        }
        if (this.options.currency) {
            headers['X-Currency'] = this.options.currency;
        }
        if (this.options.language) {
            headers['X-Language'] = this.options.language;
        }
        return new Promise((resolve, reject) => {
            let options = {
                method: method.toUpperCase(),
                async: true,
                data: data,
                timeout: 60000,
                headers: headers,
                host: this.options.url,
                port: 443,
                path: `/${this.options.version}${uri}`,
                withCredentials: false
            };
            //options.path = options.path.substr(0, 1) !== '/' ? '/' + this.options.version + '/' + options.path : options.path;
            let request = http.request(options, (response) => {
                let data = '';
                response.on('data', (chunk) => {
                    return data += chunk;
                });
                return response.on('end', function() {
                    try {
                        let result = JSON.parse(data);
                        if([200, 201, 204].indexOf(response.statusCode) <= -1) {
                            return reject(result, response.statusCode, request);
                        } else {
                            return resolve(result, response.statusCode, request);
                        }
                    } catch(error) {
                        console.log(error)
                        return reject(error.message, response.statusCode, request);
                    }
                });
            });
            if (super.InArray(options.method, ['POST', 'PUT']) && options.data !== null) {
                request.write(super.Serialize(options.data));
            }
            return request.end();
        });
    }
}

/*
curl -X POST https://api.molt.in/v1/products \
    -H "Authorization: Bearer 2f338e5ff883e96aeed6f4fde2178a55b1c9822f" \
    -d "sku=1893015" \
    -d "title=12-Cup Coffeemaker" \
    -d "slug=12cup-coffemaker" \
    -d "price=49.99" \
    -d "status=1" \
    -d "category=1272153933032194588" \
    -d "stock_level=0" \
    -d "stock_status=3" \
    -d "description=Brew delicious coffee with this 12-cup coffeemaker. Have a fresh cup in the morning! Have coffee right now! I need more coffee!" \
    -d "requires_shipping=1" \
    -d "tax_band=1271996119273963565" \
    -d "catalog_only=1"
*/
var moltin2 = new Authenticate(
    'Si025LTIJVLnzRv2vZzAU6Vgy5RBim8pdspJQegtN8', 
    'qWYmQn7GsrkC7hj3UE0zzVI1u9reE9eT2dZsqpwmgu'
    )
moltin2.authenticate().then((result) => {
    console.log('-----------------------------------------')
    console.log(result);
    moltin2.request('/products/search', 'GET', null).then(product => {
        product.result.forEach(p => {
            console.log(p.title)
        })
        //console.log('product: ', JSON.stringify(product, null, 2))
    });
    moltin2.image()
    /*
    moltin2.request('/products', 'POST', {
        sku: '123456',
        title: 'coffee maker',
        slug: 'coffee-maker',
        price: 44.99,
        status: 1,
        category: '1272153933032194588',
        stock_level: 10,
        stock_status: 3,
        description: 'Brew delicious coffee with this 12-cup coffeemaker. Have a fresh cup in the morning! Have coffee right now! I need more coffee!',
        requires_shipping: 1,
        catalog_only: 1,
        tax_band: '1271996119273963565'
    })
    .then(result => {
        console.log('result', result)
    })
    .catch(error => {
        console.log('errorXX', error)
    });
    */
    /*

    curl -X POST https://api.molt.in/v1/files \
    -H "Authorization: Bearer XXXX" \
    -H "Content-Type: multipart/form-data" \
    -F "file=@logo.png" \
    -d "assign_to=1019656230785778497"

    */
    /*.then(result => {
        console.log('result: ', result)
    })*/
})
/*
old: 1271996119273963565
new: 1273919414948855865
*/

/*
makeUrls(pathnames).then(result => {
    
    return findAllProducts(result[7]).then(products => {
        console.log('prodcuts: ', products.length);
        return getDetails(products).then(details => {
            console.log(JSON.stringify(details, null, 2))
        });
    });
})
*/

/*
var Products = {
    id: Object,
    name: String,
    description: String,
    metadata: {
        title: String,
        description: String,
        keywords: Array
    }
    sku: String,
    active: Boolean
    options: Object,
    variations: Object,
    price: Number
}

var Carts = {
    id: Object,
    dateCreated: new Date(),
    dateUpdated: new Date(),
    order: Object
}

var Order = {
    id: Object,
    items: Array
}
*/