import { error } from '@sveltejs/kit';
import { _$logger } from '$lib/utils/logger';
import * as _$c from '$config/config.global';

/** @type {import('./$types').RequestHandler} */
export async function GET(
  { route, params, url, fetch, setHeaders, parent, depends, clientAddress, cookies, locals, platform, request }:
    {
      route: any, params: any, url: any, fetch: any, setHeaders: any, parent: any, depends: any,
      clientAddress: any, cookies: any, locals: any, platform: any, request: any
    }) {
  /* curl for GET method
  curl -i -X GET http://localhost:3000/fetch/1234
  curl -i -X GET http://localhost:5173/fetch/1234
  */
  let data = { id: params.id, route, params, url, fetch, setHeaders, parent, depends, clientAddress, cookies, locals, platform, request };
  let dataAsJson = JSON.stringify(data);
  let res = new Response(dataAsJson);

  _$logger.info.TraceAPIAction(`${route.id}/${params.id}`, 'GET', 'C<-S', res.status, res.statusText, dataAsJson);

  return res;
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ route, url, request }: { route: any, url: any, request: any }) {
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