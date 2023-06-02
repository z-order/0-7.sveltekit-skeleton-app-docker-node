import { error } from '@sveltejs/kit';
import { _$logger } from '$lib/utils/logger';
import * as _$c from '$config/config.global';
import axios from 'axios';

/** @type {import('./$types').RequestHandler} */
export async function GET({ route, url, request }: { route: any, url: any, request: any }) {
  /* curl for GET method
  curl -i -X GET http://localhost:3000/api/ip-info
  curl -i -X GET http://localhost:5173/api/ip-info
  */
  let resData = await axios({
    method: 'GET',
    url: 'http://ip-api.com',
    headers: {
      'User-Agent': 'curl/7.87.0',
      'Accept': '*/*',
    },
  })
    .then(function (response: any) {
      return response.data;
    })
    .catch(function (error: any) {
      console.info(error);
    });
  let res = new Response(resData);
  _$logger.info.TraceAPIAction(route.id, 'GET', 'C<-S', res.status, res.statusText);
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