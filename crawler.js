import cheerio from 'cheerio';
import async from 'async';
import request from 'requestretry';
//import request from 'request';
import got from 'got';
import FormData from 'form-data';
import url from 'url';
import http from 'https';
import fs from 'fs';

import MoltinUtil from './services/moltin';
const client = new MoltinUtil({
  publicId: 'Si025LTIJVLnzRv2vZzAU6Vgy5RBim8pdspJQegtN8',
  secretKey: 'qWYmQn7GsrkC7hj3UE0zzVI1u9reE9eT2dZsqpwmgu'
});

const baseUrl = 'http://www.flightclub.com';
//const pathnames = ['/accessories/g-shocks', '/accessories/g-shocks', '/accessories/g-shocks', '/accessories/g-shocks', '/accessories/g-shocks', '/accessories/sunglasses', '/accessories/sunglasses', '/accessories/sunglasses', '/accessories/sunglasses', '/accessories/sunglasses', '/accessories/sunglasses/oakley', '/accessories/sunglasses/oakley', '/accessories/sunglasses/oakley', '/accessories/sunglasses/oakley', '/accessories/sunglasses/oakley', '/accessories/sunglasses/ray-ban', '/accessories/sunglasses/shwood', '/accessories/sunglasses/super', '/air-jordans/6-rings', '/air-jordans/6-rings', '/air-jordans/6-rings', '/air-jordans/6-rings', '/air-jordans/6-rings', '/air-jordans/6-rings', '/air-jordans/air-jordan-1', '/air-jordans/air-jordan-1', '/air-jordans/air-jordan-1', '/air-jordans/air-jordan-1', '/air-jordans/air-jordan-1', '/air-jordans/air-jordan-1', '/air-jordans/air-jordan-1', '/air-jordans/air-jordan-10', '/air-jordans/air-jordan-10', '/air-jordans/air-jordan-10', '/air-jordans/air-jordan-10', '/air-jordans/air-jordan-10', '/air-jordans/air-jordan-10', '/air-jordans/air-jordan-11', '/air-jordans/air-jordan-11', '/air-jordans/air-jordan-11', '/air-jordans/air-jordan-11', '/air-jordans/air-jordan-11', '/air-jordans/air-jordan-11', '/air-jordans/air-jordan-11', '/air-jordans/air-jordan-12', '/air-jordans/air-jordan-12', '/air-jordans/air-jordan-12', '/air-jordans/air-jordan-12', '/air-jordans/air-jordan-12', '/air-jordans/air-jordan-12', '/air-jordans/air-jordan-12', '/air-jordans/air-jordan-13', '/air-jordans/air-jordan-13', '/air-jordans/air-jordan-13', '/air-jordans/air-jordan-13', '/air-jordans/air-jordan-13', '/air-jordans/air-jordan-13', '/air-jordans/air-jordan-13', '/air-jordans/air-jordan-14', '/air-jordans/air-jordan-14', '/air-jordans/air-jordan-14', '/air-jordans/air-jordan-14', '/air-jordans/air-jordan-14', '/air-jordans/air-jordan-14', '/air-jordans/air-jordan-15', '/air-jordans/air-jordan-15', '/air-jordans/air-jordan-15', '/air-jordans/air-jordan-15', '/air-jordans/air-jordan-15', '/air-jordans/air-jordan-15', '/air-jordans/air-jordan-16', '/air-jordans/air-jordan-16', '/air-jordans/air-jordan-16', '/air-jordans/air-jordan-16', '/air-jordans/air-jordan-16', '/air-jordans/air-jordan-16', '/air-jordans/air-jordan-17', '/air-jordans/air-jordan-17', '/air-jordans/air-jordan-17', '/air-jordans/air-jordan-17', '/air-jordans/air-jordan-17', '/air-jordans/air-jordan-18', '/air-jordans/air-jordan-18', '/air-jordans/air-jordan-18', '/air-jordans/air-jordan-18', '/air-jordans/air-jordan-18', '/air-jordans/air-jordan-18', '/air-jordans/air-jordan-19', '/air-jordans/air-jordan-19', '/air-jordans/air-jordan-19', '/air-jordans/air-jordan-19', '/air-jordans/air-jordan-19', '/air-jordans/air-jordan-2', '/air-jordans/air-jordan-2', '/air-jordans/air-jordan-2', '/air-jordans/air-jordan-2', '/air-jordans/air-jordan-2', '/air-jordans/air-jordan-2', '/air-jordans/air-jordan-2', '/air-jordans/air-jordan-20', '/air-jordans/air-jordan-20', '/air-jordans/air-jordan-20', '/air-jordans/air-jordan-20', '/air-jordans/air-jordan-20', '/air-jordans/air-jordan-21', '/air-jordans/air-jordan-21', '/air-jordans/air-jordan-21', '/air-jordans/air-jordan-21', '/air-jordans/air-jordan-21', '/air-jordans/air-jordan-22', '/air-jordans/air-jordan-22', '/air-jordans/air-jordan-22', '/air-jordans/air-jordan-22', '/air-jordans/air-jordan-22', '/air-jordans/air-jordan-23', '/air-jordans/air-jordan-23', '/air-jordans/air-jordan-23', '/air-jordans/air-jordan-23', '/air-jordans/air-jordan-23', '/air-jordans/air-jordan-23', '/air-jordans/air-jordan-3', '/air-jordans/air-jordan-3', '/air-jordans/air-jordan-3', '/air-jordans/air-jordan-3', '/air-jordans/air-jordan-3', '/air-jordans/air-jordan-3', '/air-jordans/air-jordan-3', '/air-jordans/air-jordan-4', '/air-jordans/air-jordan-4', '/air-jordans/air-jordan-4', '/air-jordans/air-jordan-4', '/air-jordans/air-jordan-4', '/air-jordans/air-jordan-4', '/air-jordans/air-jordan-4', '/air-jordans/air-jordan-5', '/air-jordans/air-jordan-5', '/air-jordans/air-jordan-5', '/air-jordans/air-jordan-5', '/air-jordans/air-jordan-5', '/air-jordans/air-jordan-5', '/air-jordans/air-jordan-5', '/air-jordans/air-jordan-6', '/air-jordans/air-jordan-6', '/air-jordans/air-jordan-6', '/air-jordans/air-jordan-6', '/air-jordans/air-jordan-6', '/air-jordans/air-jordan-6', '/air-jordans/air-jordan-6', '/air-jordans/air-jordan-7', '/air-jordans/air-jordan-7', '/air-jordans/air-jordan-7', '/air-jordans/air-jordan-7', '/air-jordans/air-jordan-7', '/air-jordans/air-jordan-7', '/air-jordans/air-jordan-7', '/air-jordans/air-jordan-8', '/air-jordans/air-jordan-8', '/air-jordans/air-jordan-8', '/air-jordans/air-jordan-8', '/air-jordans/air-jordan-8', '/air-jordans/air-jordan-8', '/air-jordans/air-jordan-9', '/air-jordans/air-jordan-9', '/air-jordans/air-jordan-9', '/air-jordans/air-jordan-9', '/air-jordans/air-jordan-9', '/air-jordans/air-jordan-9', '/air-jordans/air-jordan-9', '/air-jordans/jordan-future', '/air-jordans/jordan-future', '/air-jordans/jordan-future', '/air-jordans/jordan-future', '/air-jordans/jordan-future', '/air-jordans/other-jordans', '/air-jordans/other-jordans', '/air-jordans/other-jordans', '/air-jordans/other-jordans', '/air-jordans/other-jordans', '/air-jordans/spiz-ike', '/air-jordans/spiz-ike', '/air-jordans/spizike', '/air-jordans/spizike', '/air-jordans/spizike', '/air-jordans/spizike', '/air-jordans/spizike', '/flight-club/everything-else-274', '/flight-club/everything-else-274', '/flight-club/everything-else-274', '/flight-club/everything-else-274', '/flight-club/everything-else-274', '/flight-club/everything-else-274', '/flight-club/fitted-caps', '/flight-club/jackets', '/flight-club/jackets', '/flight-club/jackets', '/flight-club/jackets', '/flight-club/jackets', '/flight-club/snap-backs', '/flight-club/snap-backs', '/flight-club/snap-backs', '/flight-club/snap-backs', '/flight-club/snap-backs', '/flight-club/sweatshirts', '/flight-club/sweatshirts', '/flight-club/sweatshirts', '/flight-club/sweatshirts', '/flight-club/sweatshirts', '/flight-club/t-shirts', '/flight-club/t-shirts', '/flight-club/t-shirts', '/flight-club/t-shirts', '/flight-club/t-shirts', '/flight-club/t-shirts', '/footwear/adidas', '/footwear/adidas', '/footwear/adidas', '/footwear/adidas', '/footwear/adidas', '/footwear/adidas', '/footwear/adidas', '/footwear/adidas/campus', '/footwear/adidas/campus', '/footwear/adidas/campus', '/footwear/adidas/campus', '/footwear/adidas/campus', '/footwear/adidas/gazelle', '/footwear/adidas/gazelle', '/footwear/adidas/gazelle', '/footwear/adidas/gazelle', '/footwear/adidas/gazelle', '/footwear/adidas/jeremy-scott', '/footwear/adidas/jeremy-scott', '/footwear/adidas/jeremy-scott', '/footwear/adidas/jeremy-scott', '/footwear/adidas/jeremy-scott', '/footwear/adidas/jeremy-scott', '/footwear/adidas/other-adidas', '/footwear/adidas/other-adidas', '/footwear/adidas/other-adidas', '/footwear/adidas/other-adidas', '/footwear/adidas/other-adidas', '/footwear/adidas/other-adidas', '/footwear/adidas/rod-laver', '/footwear/adidas/stan-smith', '/footwear/adidas/stan-smith', '/footwear/adidas/stan-smith', '/footwear/adidas/stan-smith', '/footwear/adidas/stan-smith', '/footwear/adidas/superstar', '/footwear/adidas/superstar', '/footwear/adidas/superstar', '/footwear/adidas/superstar', '/footwear/adidas/superstar', '/footwear/adidas/yeezy', '/footwear/adidas/yeezy', '/footwear/adidas/yeezy', '/footwear/adidas/yeezy', '/footwear/adidas/yeezy', '/footwear/adidas/zx-eqt-series', '/footwear/adidas/zx-eqt-series', '/footwear/adidas/zx-eqt-series', '/footwear/adidas/zx-eqt-series', '/footwear/adidas/zx-eqt-series', '/footwear/asics', '/footwear/asics', '/footwear/asics', '/footwear/asics', '/footwear/asics', '/footwear/asics', '/footwear/brooks', '/footwear/brooks', '/footwear/brooks', '/footwear/brooks', '/footwear/brooks', '/footwear/converse', '/footwear/converse', '/footwear/converse', '/footwear/converse', '/footwear/converse', '/footwear/converse', '/footwear/converse', '/footwear/ewing', '/footwear/ewing', '/footwear/ewing', '/footwear/ewing', '/footwear/ewing', '/footwear/ewing', '/footwear/ewing', '/footwear/new-balance', '/footwear/new-balance', '/footwear/new-balance', '/footwear/new-balance', '/footwear/new-balance', '/footwear/new-balance', '/footwear/new-balance', '/footwear/new-balance/1300', '/footwear/new-balance/1300', '/footwear/new-balance/1300', '/footwear/new-balance/1300', '/footwear/new-balance/1300', '/footwear/new-balance/574', '/footwear/new-balance/574', '/footwear/new-balance/574', '/footwear/new-balance/574', '/footwear/new-balance/574', '/footwear/new-balance/574', '/footwear/new-balance/other-new-balances', '/footwear/new-balance/other-new-balances', '/footwear/new-balance/other-new-balances', '/footwear/new-balance/other-new-balances', '/footwear/new-balance/other-new-balances', '/footwear/new-balance/other-new-balances', '/footwear/other-brands', '/footwear/other-brands', '/footwear/other-brands', '/footwear/other-brands', '/footwear/other-brands', '/footwear/other-brands', '/footwear/other-brands', '/footwear/puma', '/footwear/puma', '/footwear/puma', '/footwear/puma', '/footwear/puma', '/footwear/puma', '/footwear/reebok', '/footwear/reebok', '/footwear/reebok', '/footwear/reebok', '/footwear/reebok', '/footwear/reebok', '/footwear/reebok/iverson', '/footwear/reebok/iverson', '/footwear/reebok/iverson', '/footwear/reebok/iverson', '/footwear/reebok/iverson', '/footwear/reebok/kamikaze', '/footwear/reebok/kamikaze', '/footwear/reebok/kamikaze', '/footwear/reebok/kamikaze', '/footwear/reebok/kamikaze', '/footwear/reebok/pump', '/footwear/reebok/pump', '/footwear/reebok/pump', '/footwear/reebok/pump', '/footwear/reebok/pump', '/footwear/reebok/pump', '/footwear/reebok/shaq', '/footwear/reebok/shaq', '/footwear/reebok/shaq', '/footwear/reebok/shaq', '/footwear/saucony', '/footwear/saucony', '/footwear/saucony', '/footwear/saucony', '/footwear/saucony', '/footwear/vans', '/footwear/vans', '/footwear/vans', '/footwear/vans', '/footwear/vans', '/hats/atlanta', '/hats/atlanta', '/hats/atlanta', '/hats/atlanta', '/hats/atlanta', '/hats/baltimore', '/hats/baltimore', '/hats/baltimore', '/hats/baltimore', '/hats/baltimore', '/hats/beanie', '/hats/beanie', '/hats/beanie', '/hats/beanie', '/hats/beanie', '/hats/beanie', '/hats/boston', '/hats/boston', '/hats/boston', '/hats/boston', '/hats/boston', '/hats/brooklyn', '/hats/brooklyn', '/hats/brooklyn', '/hats/brooklyn', '/hats/brooklyn', '/hats/buffalo', '/hats/calgary', '/hats/charlotte', '/hats/charlotte', '/hats/charlotte', '/hats/charlotte', '/hats/charlotte', '/hats/chicago', '/hats/chicago', '/hats/chicago', '/hats/chicago', '/hats/chicago', '/hats/chicago', '/hats/cincinnati', '/hats/cincinnati', '/hats/cincinnati', '/hats/cincinnati', '/hats/cincinnati', '/hats/cleveland', '/hats/cleveland', '/hats/cleveland', '/hats/cleveland', '/hats/cleveland', '/hats/dallas', '/hats/denver', '/hats/detroit', '/hats/detroit', '/hats/detroit', '/hats/detroit', '/hats/detroit', '/hats/fitted', '/hats/fitted', '/hats/fitted', '/hats/fitted', '/hats/fitted', '/hats/fitted', '/hats/fitted', '/hats/flight-club', '/hats/flight-club', '/hats/flight-club', '/hats/flight-club', '/hats/flight-club', '/hats/houston', '/hats/houston', '/hats/houston', '/hats/houston', '/hats/houston', '/hats/indiana', '/hats/indiana', '/hats/indiana', '/hats/indiana', '/hats/indiana', '/hats/kansas-city', '/hats/los-angeles', '/hats/los-angeles', '/hats/los-angeles', '/hats/los-angeles', '/hats/los-angeles', '/hats/miami', '/hats/milwaukee', '/hats/milwaukee', '/hats/milwaukee', '/hats/milwaukee', '/hats/milwaukee', '/hats/minnesota', '/hats/minnesota', '/hats/minnesota', '/hats/minnesota', '/hats/minnesota', '/hats/montreal', '/hats/montreal', '/hats/montreal', '/hats/montreal', '/hats/montreal', '/hats/new-jersey', '/hats/new-orleans', '/hats/new-york', '/hats/new-york', '/hats/new-york', '/hats/new-york', '/hats/new-york', '/hats/new-york', '/hats/oakland', '/hats/oakland', '/hats/oakland', '/hats/oakland', '/hats/oakland', '/hats/orlando', '/hats/orlando', '/hats/orlando', '/hats/orlando', '/hats/orlando', '/hats/philly', '/hats/philly', '/hats/philly', '/hats/philly', '/hats/philly', '/hats/phoenix', '/hats/pittsburgh', '/hats/pittsburgh', '/hats/pittsburgh', '/hats/pittsburgh', '/hats/pittsburgh', '/hats/portland', '/hats/sacramento', '/hats/san-antonio', '/hats/san-diego', '/hats/san-francisco', '/hats/san-francisco', '/hats/san-francisco', '/hats/san-francisco', '/hats/san-francisco', '/hats/snap-back', '/hats/snap-back', '/hats/snap-back', '/hats/snap-back', '/hats/snap-back', '/hats/snap-back', '/hats/snap-back', '/hats/st-louis', '/hats/toronto', '/hats/toronto', '/hats/toronto', '/hats/toronto', '/hats/toronto', '/hats/vancouver', '/hats/vancouver', '/hats/vancouver', '/hats/vancouver', '/hats/vancouver', '/hats/washington', '/hats/washington', '/hats/washington', '/hats/washington', '/hats/washington', '/media/catalog/product/cache/1/small_image/234x167/9df78eab33525d08d6e5fb8d27136e95/n/i/nike-dunk-mid-pro-sb-wu-tang-black-black-varsity-mz-sport-rd-080605_1/png', '/nike/nike-air-force', '/nike/nike-air-force', '/nike/nike-air-force', '/nike/nike-air-force', '/nike/nike-air-force', '/nike/nike-air-force', '/nike/nike-air-force', '/nike/nike-air-force/air-force-1-high', '/nike/nike-air-force/air-force-1-high', '/nike/nike-air-force/air-force-1-high', '/nike/nike-air-force/air-force-1-high', '/nike/nike-air-force/air-force-1-high', '/nike/nike-air-force/air-force-1-low', '/nike/nike-air-force/air-force-1-low', '/nike/nike-air-force/air-force-1-low', '/nike/nike-air-force/air-force-1-low', '/nike/nike-air-force/air-force-1-low', '/nike/nike-air-force/air-force-1-low', '/nike/nike-air-force/nike-force-1-mid', '/nike/nike-air-force/nike-force-1-mid', '/nike/nike-air-force/nike-force-1-mid', '/nike/nike-air-force/nike-force-1-mid', '/nike/nike-air-force/nike-force-1-mid', '/nike/nike-air-force/other-air-force', '/nike/nike-basketball', '/nike/nike-basketball', '/nike/nike-basketball', '/nike/nike-basketball', '/nike/nike-basketball', '/nike/nike-basketball', '/nike/nike-basketball', '/nike/nike-basketball/blazer', '/nike/nike-basketball/blazer', '/nike/nike-basketball/blazer', '/nike/nike-basketball/blazer', '/nike/nike-basketball/blazer', '/nike/nike-basketball/blazer', '/nike/nike-basketball/charles-barkley', '/nike/nike-basketball/charles-barkley', '/nike/nike-basketball/charles-barkley', '/nike/nike-basketball/charles-barkley', '/nike/nike-basketball/charles-barkley', '/nike/nike-basketball/charles-barkley', '/nike/nike-basketball/kevin-durant', '/nike/nike-basketball/kevin-durant', '/nike/nike-basketball/kevin-durant', '/nike/nike-basketball/kevin-durant', '/nike/nike-basketball/kevin-durant', '/nike/nike-basketball/kevin-durant', '/nike/nike-basketball/kevin-durant', '/nike/nike-basketball/kobe-bryant', '/nike/nike-basketball/kobe-bryant', '/nike/nike-basketball/kobe-bryant', '/nike/nike-basketball/kobe-bryant', '/nike/nike-basketball/kobe-bryant', '/nike/nike-basketball/kobe-bryant', '/nike/nike-basketball/lebron-james', '/nike/nike-basketball/lebron-james', '/nike/nike-basketball/lebron-james', '/nike/nike-basketball/lebron-james', '/nike/nike-basketball/lebron-james', '/nike/nike-basketball/lebron-james', '/nike/nike-basketball/other-basketball', '/nike/nike-basketball/other-basketball', '/nike/nike-basketball/other-basketball', '/nike/nike-basketball/other-basketball', '/nike/nike-basketball/other-basketball', '/nike/nike-basketball/penny-hardaway', '/nike/nike-basketball/penny-hardaway', '/nike/nike-basketball/penny-hardaway', '/nike/nike-basketball/penny-hardaway', '/nike/nike-basketball/penny-hardaway', '/nike/nike-basketball/penny-hardaway', '/nike/nike-basketball/penny-hardaway', '/nike/nike-basketball/posite', '/nike/nike-basketball/posite', '/nike/nike-basketball/posite', '/nike/nike-basketball/posite', '/nike/nike-basketball/posite', '/nike/nike-basketball/posite', '/nike/nike-basketball/posite', '/nike/nike-cross-training', '/nike/nike-cross-training', '/nike/nike-cross-training', '/nike/nike-cross-training', '/nike/nike-cross-training', '/nike/nike-cross-training', '/nike/nike-cross-training/griffey', '/nike/nike-cross-training/griffey', '/nike/nike-cross-training/griffey', '/nike/nike-cross-training/griffey', '/nike/nike-cross-training/other-cross-training', '/nike/nike-cross-training/other-cross-training', '/nike/nike-cross-training/other-cross-training', '/nike/nike-cross-training/other-cross-training', '/nike/nike-cross-training/trainer', '/nike/nike-cross-training/trainer', '/nike/nike-cross-training/trainer', '/nike/nike-cross-training/trainer', '/nike/nike-dunks', '/nike/nike-dunks', '/nike/nike-dunks', '/nike/nike-dunks', '/nike/nike-dunks', '/nike/nike-dunks', '/nike/nike-dunks/dunk-high', '/nike/nike-dunks/dunk-high', '/nike/nike-dunks/dunk-high', '/nike/nike-dunks/dunk-high', '/nike/nike-dunks/dunk-high', '/nike/nike-dunks/dunk-high', '/nike/nike-dunks/dunk-high', '/nike/nike-dunks/dunk-low', '/nike/nike-dunks/dunk-low', '/nike/nike-dunks/dunk-low', '/nike/nike-dunks/dunk-low', '/nike/nike-dunks/dunk-low', '/nike/nike-dunks/dunk-low', '/nike/nike-dunks/dunk-mid', '/nike/nike-dunks/dunk-mid', '/nike/nike-dunks/dunk-mid', '/nike/nike-dunks/dunk-mid', '/nike/nike-dunks/dunk-mid', '/nike/nike-dunks/sb', '/nike/nike-dunks/sb', '/nike/nike-dunks/sb', '/nike/nike-dunks/sb', '/nike/nike-dunks/sb', '/nike/nike-dunks/sb', '/nike/nike-other', '/nike/nike-other', '/nike/nike-other', '/nike/nike-other', '/nike/nike-other', '/nike/nike-running', '/nike/nike-running', '/nike/nike-running', '/nike/nike-running', '/nike/nike-running', '/nike/nike-running', '/nike/nike-running', '/nike/nike-running/air-max-1', '/nike/nike-running/air-max-1', '/nike/nike-running/air-max-1', '/nike/nike-running/air-max-1', '/nike/nike-running/air-max-1', '/nike/nike-running/air-max-1', '/nike/nike-running/air-max-1', '/nike/nike-running/air-max-90', '/nike/nike-running/air-max-90', '/nike/nike-running/air-max-90', '/nike/nike-running/air-max-90', '/nike/nike-running/air-max-90', '/nike/nike-running/air-max-90', '/nike/nike-running/air-max-95', '/nike/nike-running/air-max-95', '/nike/nike-running/air-max-95', '/nike/nike-running/air-max-95', '/nike/nike-running/air-max-95', '/nike/nike-running/air-max-95', '/nike/nike-running/air-max-97', '/nike/nike-running/flyknit', '/nike/nike-running/flyknit', '/nike/nike-running/flyknit', '/nike/nike-running/flyknit', '/nike/nike-running/flyknit', '/nike/nike-running/flyknit', '/nike/nike-running/flyknit', '/nike/nike-running/huarache', '/nike/nike-running/huarache', '/nike/nike-running/huarache', '/nike/nike-running/huarache', '/nike/nike-running/huarache', '/nike/nike-running/huarache', '/nike/nike-running/other-running', '/nike/nike-running/other-running', '/nike/nike-running/other-running', '/nike/nike-running/other-running', '/nike/nike-running/other-running', '/nike/nike-running/other-running', '/nike/nike-running/roshe-run', '/nike/nike-running/roshe-run', '/nike/nike-running/roshe-run', '/nike/nike-running/roshe-run', '/nike/nike-running/roshe-run', '/nike/nike-running/roshe-run', '/nike/nike-skateboarding', '/nike/nike-skateboarding', '/nike/nike-skateboarding', '/nike/nike-skateboarding', '/nike/nike-skateboarding', '/nike/nike-skateboarding', '/nike/nike-skateboarding', '/nike/nike-skateboarding/blazer-sb', '/nike/nike-skateboarding/blazer-sb', '/nike/nike-skateboarding/blazer-sb', '/nike/nike-skateboarding/blazer-sb', '/nike/nike-skateboarding/blazer-sb', '/nike/nike-skateboarding/bruin-sb', '/nike/nike-skateboarding/bruin-sb', '/nike/nike-skateboarding/bruin-sb', '/nike/nike-skateboarding/bruin-sb', '/nike/nike-skateboarding/bruin-sb', '/nike/nike-skateboarding/dunk-sb-high-97', '/nike/nike-skateboarding/dunk-sb-high-97', '/nike/nike-skateboarding/dunk-sb-high-97', '/nike/nike-skateboarding/dunk-sb-high-97', '/nike/nike-skateboarding/dunk-sb-high-97', '/nike/nike-skateboarding/dunk-sb-high-97', '/nike/nike-skateboarding/dunk-sb-low-95', '/nike/nike-skateboarding/dunk-sb-low-95', '/nike/nike-skateboarding/dunk-sb-low-95', '/nike/nike-skateboarding/dunk-sb-mid-96', '/nike/nike-skateboarding/dunk-sb-mid-96', '/nike/nike-skateboarding/dunk-sb-mid-96', '/nike/nike-skateboarding/dunk-sb-mid-96', '/nike/nike-skateboarding/dunk-sb-mid-96', '/nike/nike-skateboarding/dunk-sb-mid-96', '/nike/nike-skateboarding/janoski', '/nike/nike-skateboarding/janoski', '/nike/nike-skateboarding/janoski', '/nike/nike-skateboarding/janoski', '/nike/nike-skateboarding/janoski', '/nike/nike-skateboarding/janoski', '/nike/nike-skateboarding/other-skateboarding', '/nike/nike-skateboarding/other-skateboarding', '/nike/nike-skateboarding/other-skateboarding', '/nike/nike-skateboarding/other-skateboarding', '/nike/nike-skateboarding/other-skateboarding'];

/*
var element1 = document.createElement("script");
element1.src = "//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js";
element1.type="text/javascript";
document.getElementsByTagName("head")[0].appendChild(element1);
*/

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
        path: '/accessories',
        childs: {
            'g-shocks': '/g-shocks',
            /*'sunglasses': {
                path: '/accessories/sunglasses',
                childs: {
                    'oakley': true,
                    'ray-ban': true,
                    'shwood': true,
                    'super': true
                }
            }*/
        }
    },
    /*'air-jordans': {
        childs: {
            '6-rings': true,
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
    'hats': {
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
    'nike': {
        path: '/nike',
        childs: {
            'nike-air-force': {
                path: '/nike/nike-air-force',
                childs: {
                    'air-force-1-high': true,
                    'air-force-1-low': true,
                    'nike-force-1-mid': true,
                    'other-air-force': true
                }
            },
            'nike-basketball': {
                path: '/nike/nike-basketball',
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
            /*'nike-cross-training': {
                path: '/nike/nike-cross-training',
                childs: {
                    'griffey': true,
                    'other-cross-training': true,
                    'trainer': true
                }
            },
            'nike-dunks': {
                path: '/nike/nike-dunks',
                childs: {
                    'dunk-high': true,
                    'dunk-low': true,
                    'dunk-mid': true,
                    'sb': true
                }
            },
            'nike-running': {
                path: '/nike/nike-running',
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
                path: '/nike/nike-skateboarding',
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
    }*/
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

if (!Array.prototype.last) {
    Array.prototype.last = function() {
        return this[this.length-1];
    }
}


function getPages(link) {
    console.log('link: ', `${link}?limit=30`)
    return new Promise((resolve, reject) => {
        request(`${link}?limit=30`, function (error, response, body) {
            if (error) {
                return reject(error);
            }
            let $ = cheerio.load(body);
            let counter = $('.page-counter').text().trim().replace(/Page 1 of /, '').toInteger() || 0;
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
            let id = $('.breadcrumbs ul li').last().attr('class').replace('category','').toInteger();
            return resolve(id);
        });
    });
}

async function findAllProducts(category) {
    let categoryId = await getCategoryId(category);
    let count = await getPages(category);
    let products = await getAllProducts(category, categoryId, count);
    let merged = [].concat.apply([], products);
    let productDetails = await getDetails(merged);
    return productDetails;
}

function saveAllProducts(products, categoryId) {
    return new Promise((resolve, reject) => {
        async.mapSeries(products, (product, callback) => {
            let data = {
                title: product.title,
                price: product.price,
                description: product.title,
                slug: product.title.toLowerCase().replace(/\s{1,}/g, '-'),
                sku: product.sku,
                status: 1,
                category: categoryId,
                stock_level: '1',
                stock_status: 1,
                requires_shipping: 1,
                catalog_only: 0,
                tax_band: '1275562953474572346'
            };
            console.log('saving: \n', JSON.stringify(data, null, 2))
            client.createProduct(data, product.images)
            .then(response => {
                return callback(null, response);
            })
            .catch(error => {
                return callback(error);
            });
        }, (error, product) => {
            if(error) {
                return reject(error);
            }
            return resolve(product);
        });
    });
}
function saveCategory(category) {
    return client.createCategory(category);
}

async function findSaveAllProducts(categoryUrl, savedCategory) {
    let categoryId = await getCategoryId(categoryUrl);
    let count = await getPages(categoryUrl);
    let products = await getAllProducts(categoryUrl, categoryId, count);
    let merged = [].concat.apply([], products);
    let productsDetails = await getDetails(merged);
    let saveAll = await saveAllProducts(productsDetails, savedCategory.id);

    return saveAll;
}

function getAllProducts(category, id, count) {
    if(count > 0) {
        let links = Array.apply(null, Array(count));
        let products = links.map((link, index) => {
            index = index + 1;
            let uri = `${category}?id=${id}&p=${index}&limit=30`;
            return crawl(uri);
        });
        return Promise.all(products);
    } else {
        let uri = `${category}?id=${id}&limit=30`;
        return crawl(uri);
    }
}

function getImages($) {
    let images = $('.more-views.thumbs li.more-views-li').map(function() {
        let $image = $(this);
        let src = $image.find('a').first().attr('data-url-zoom').trim();
        return src;
    });
    if(!images.length) {
        let src = $('.product-img').attr('src').trim();
        images = [src];
    }
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
                sku: product.slice(-6),
                price: getPrice($),
                options: getOptions($),
                attributes: getAttributes($)
            };
            return resolve(details);
        });
    });
}

function getDetails(products) {
    console.log('products: ', products.length);
    let details = products.map((product, index) => {
        return getDetail(product.url);
    });
    return Promise.all(details);
}

function getCategory(link) {
    return new Promise((resolve, reject) => {
        request(link, function (error, response, body) {
            if (error) {
                return reject(error);
            }
            let $ = cheerio.load(body);
            let id = $('.breadcrumbs ul li').last().attr('class').replace('category','').toInteger();
            let title = $('.breadcrumbs ul li').last().text().trim();
            let description = $('.category-description.std').text().trim();
            let slug = link.split('/').last();
            let category = {
                id: id,
                title: title,
                slug: slug,
                parent: '',
                status: 1,
                description: description
            };
            console.log(JSON.stringify(category, null,2));
            return resolve(category);
        });
    });
}

function build(categories, parent) {
    let baseUrl = 'http://www.flightclub.com';

    /*
    Object.keys(categories).forEach(category => {
        let path = parent ? `${parent.path}` : '';
        console.log(`${path}/${category}`)
        if(categories[category].childs) {
            return build(categories[category].childs, categories[category]);
        }
    });
    */
    return new Promise((resolve, reject) => {
        async.mapSeries(Object.keys(categories), (category, callback) => {
            let path = parent ? `${baseUrl}${parent.path}` : `${baseUrl}`;
            let parentId = parent ? parent.id : '';
            /*
            setTimeout(() => {
                console.log(`${path}/${category}`);
                return callback(null, `${path}/${category}`);
            }, 1500);
            */
            console.log('x: ', `${path}/${category}`);

            getCategory(`${path}/${category}`).then(details => {

                let data = {
                    title: details.title,
                    slug: details.slug,
                    parent: parent ? parent.id : null,
                    status: 1,
                    description: details.description || details.title
                };
                if(!parent) {
                    delete data.parent;
                }

                /*
                if(categories[category].childs) {
                    return build(categories[category].childs, categories[category]).then(result => {
                        return callback(null, result);
                    });
                } else {
                    findSaveAllProducts(`${path}/${category}`).then(products => {
                        return callback(null, products)
                    })
                    .catch(error => {
                        console.log('error: findSaveAllProducts', error)
                        return callback(error);
                    })
                }*/

                console.log(`category: ${details.id}`, data, 'parentId: ', parentId);
                console.log(JSON.stringify(data));

                client.createCategory(data).then(result => {

                    console.log('--------------------------------------')
                    console.log('--------------------------------------')
                    console.log(result);
                    console.log('--------------------------------------')
                    console.log('--------------------------------------')
                    if(typeof categories[category] === 'object') {
                        categories[category].id = result.id
                    } else {
                        categories[category] = {
                            id: result.id,
                            path: `${path}/${category}`
                        };
                    };

                    if(categories[category].childs) {
                        return build(categories[category].childs, categories[category]).then(result => {
                            return callback(null, result);
                        });
                    } else {
                        findSaveAllProducts(`${path}/${category}`, categories[category]).then(products => {
                            return callback(null, products)
                        })
                        .catch(error => {
                            console.log('error: findSaveAllProducts', error)
                            return callback(error);
                        });
                    }
                }).catch(error => {
                    console.log('moltin error: ', error)
                    return callback(null);
                })

            })
            .catch(error => {
                return callback(error)
            });
        }, (error, category) => {
            return resolve(category);
        });
    });
}

build(categories, null).then(result => {
    console.log(`category id: ${result}`);
})

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
