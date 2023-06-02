import { error, json } from '@sveltejs/kit';
import { _$logger } from '$lib/utils/logger';
import * as _$c from '$config/config.global';

/* Content negotiation in SvelteKit:
  +server.js files can be placed in the same directory as +page files,
  allowing the same route to be either a page or an API endpoint.
  To determine which, SvelteKit applies the following rules:

  PUT/PATCH/DELETE/OPTIONS requests are always handled by +server.js since they do not apply to pages
  GET/POST requests are treated as page requests if the accept header prioritises text/html
  (in other words, it's a browser page request), else they are handled by +server.js
*/

/** @type {import('./$types').RequestHandler} */
export async function POST({ route, url, request }: { route: any, url: any, request: any }) {
  /* curl for POST method
  curl -i -d "a=1&b=2" -H "Content-Type: application/x-www-form-urlencoded" -X POST http://localhost:3000/api/adder
  curl -i -d '{"a":"1", "b":"2"}' -H "Content-Type: application/json" -X POST http://localhost:3000/api/adder
  curl -i -d '{"a":"1", "b":"2"}' -H "Content-Type: application/json" -X POST http://localhost:5173/api/adder
    => 12
  curl -i -d '{"a":1, "b":2}' -H "Content-Type: application/json" -X POST http://localhost:5173/api/adder
    => 3
  */
  const { a, b } = await request.json();
  _$logger.info.TraceAPIAction(route.id, 'GET', 'C<-S', 200, 'OK');
  return json(a + b);
}

/** @type {import('./$types').RequestHandler} */
export async function GET({ route, url, request }: { route: any, url: any, request: any }) {
  throw error(501, 'Not implemented');
}

/** @type {import('./$types').RequestHandler} */
export function PATCH({ route, url, request }: { route: any, url: any, request: any }) {
  throw error(501, 'Not implemented');
}

/** @type {import('./$types').RequestHandler} */
export function PUT({ route, url, request }: { route: any, url: any, request: any }) {
  throw error(501, 'Not implemented');
}

/** @type {import('./$types').RequestHandler} */
export function DELETE({ route, url, request }: { route: any, url: any, request: any }) {
  throw error(501, 'Not implemented');
}

/** @type {import('./$types').RequestHandler} */
export function OPTIONS({ route, url, request }: { route: any, url: any, request: any }) {
  throw error(501, 'Not implemented');
}