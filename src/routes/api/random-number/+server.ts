import { error } from '@sveltejs/kit';
import { _$logger } from '$lib/utils/logger';
import * as _$c from '$config/config.global';

function getRandom({ url }: { url: any }) {
  const min = Number(url.searchParams.get('min') ?? '0');
  const max = Number(url.searchParams.get('max') ?? '1');

  const d = max - min;

  if (isNaN(d) || d < 0) {
    throw error(400, 'min and max must be numbers, and min must be less than max');
  }

  const random = min + Math.random() * d;

  return new Response(String(random));
}

/** @type {import('./$types').RequestHandler} */
export function GET({ route, url, request }: { route: any, url: any, request: any }) {
  /* curl for GET method
  curl -i -X GET http://localhost:3000/api/random-number
  curl -i -X GET http://localhost:5173/api/random-number
  */
  let res = getRandom({ url });
  _$logger.info.TraceAPIAction(route.id, 'GET', 'C<-S', res.status, res.statusText);
  return res;
}

/** @type {import('./$types').RequestHandler} */
export function POST({ route, url, request }: { route: any, url: any, request: any }) {
  /* curl for POST method
  curl -i -d "key1=value1&key2=value2" -H "Content-Type: application/x-www-form-urlencoded" -X POST http://localhost:3000/api/random-number
  curl -i -d "{name: test}" -H "Content-Type: application/json" -X POST http://localhost:3000/api/random-number
  curl -i -d "{name: test}" -H "Content-Type: application/json" -X POST http://localhost:5173/api/random-number
  */
  let res = getRandom({ url });
  _$logger.info.TraceAPIAction(route.id, 'POST', 'C<-S', res.status, res.statusText);
  return res;
}

/** @type {import('./$types').RequestHandler} */
export function PATCH({ route, url, request }: { route: any, url: any, request: any }) {
  /* curl for PATCH method
  curl -i -d "key1=value1&key2=value2" -H "Content-Type: application/x-www-form-urlencoded" -X PATCH http://localhost:3000/api/random-number
  curl -i -d "{name: test}" -H "Content-Type: application/json" -X PATCH http://localhost:3000/api/random-number
  curl -i -d "{name: test}" -H "Content-Type: application/json" -X PATCH http://localhost:5173/api/random-number
  */
  let res = getRandom({ url });
  _$logger.info.TraceAPIAction(route.id, 'PATCH', 'C<-S', res.status, res.statusText);
  return res;
}

/** @type {import('./$types').RequestHandler} */
export function PUT({ route, url, request }: { route: any, url: any, request: any }) {
  /* curl for PUT method
  curl -i -d "key1=value1&key2=value2" -H "Content-Type: application/x-www-form-urlencoded" -X PUT http://localhost:3000/api/random-number
  curl -i -d "{name: test}" -H "Content-Type: application/json" -X PUT http://localhost:3000/api/random-number
  curl -i -d "{name: test}" -H "Content-Type: application/json" -X PUT http://localhost:5173/api/random-number
  */
  let res = getRandom({ url });
  _$logger.info.TraceAPIAction(route.id, 'PUT', 'C<-S', res.status, res.statusText);
  return res;
}

/** @type {import('./$types').RequestHandler} */
export function DELETE({ route, url, request }: { route: any, url: any, request: any }) {
  /* curl for DELETE method
  curl -i -d "key1=value1&key2=value2" -H "Content-Type: application/x-www-form-urlencoded" -X DELETE http://localhost:3000/api/random-number
  curl -i -d "{name: test}" -H "Content-Type: application/json" -X DELETE http://localhost:3000/api/random-number
  curl -i -d "{name: test}" -H "Content-Type: application/json" -X DELETE http://localhost:5173/api/random-number
  */
  let res = getRandom({ url });
  _$logger.info.TraceAPIAction(route.id, 'DELETE', 'C<-S', res.status, res.statusText);
  return res;
}

/** @type {import('./$types').RequestHandler} */
export function OPTIONS({ route, url, request }: { route: any, url: any, request: any }) {
  /* When creating an OPTIONS handler, 
     note that Vite will inject `Access-Control-Allow-Origin` and `Access-Control-Allow-Methods` headers
      — these will not be present in production unless you add them.
  */
  /* curl for OPTIONS method
  curl -i -d "key1=value1&key2=value2" -H "Content-Type: application/x-www-form-urlencoded" -X OPTIONS http://localhost:3000/api/random-number
  curl -i -d "{name: test}" -H "Content-Type: application/json" -X OPTIONS http://localhost:3000/api/random-number
  curl -i -d "{name: test}" -H "Content-Type: application/json" -X OPTIONS http://localhost:5173/api/random-number
  */
  let res = getRandom({ url });
  _$logger.info.TraceAPIAction(route.id, 'OPTIONS', 'C<-S', res.status, res.statusText);
  return res;
}