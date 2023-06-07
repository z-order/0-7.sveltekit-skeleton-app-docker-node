import { error } from '@sveltejs/kit';
import { _$logger, type APIAction } from '$lib/utils/logger';
import * as _$c from '$config/config.global';
import axios from 'axios';

async function getIPInfo(fromCurl: boolean) {
  let resData = await axios({
    method: 'GET',
    url: 'http://ip-api.com',
    headers: {
      'User-Agent': 'curl/7.87.0',
      'Accept': '*/*',
    },
  })
    .then(function (response: any) {
      if (!fromCurl) {
        // remove all the ANSI color codes from the response
        return response.data.replace(/\u001B\[\d{2}m/g, '');
      }
      return response.data;
    })
    .catch(function (error: any) {
      console.info(error);
    });
  return new Response(resData);
}

/** @type {import('./$types').RequestHandler} */
export async function GET({ route, url, request }: { route: any, url: any, request: any }) {
  let __APIAction: APIAction = 'GET';
  /* curl for GET method
  curl -i -X GET http://localhost:3000/sveltekit/api/ip-info
  curl -i -X GET http://localhost:5173/sveltekit/api/ip-info
  */
  let fromCurl = request.headers.get('user-agent').includes('curl');
  let res = await getIPInfo(fromCurl);
  _$logger.info.TraceAPIAction(route.id, __APIAction, 'C<-S', res.status, res.statusText);
  return res;
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ route, url, request }: { route: any, url: any, request: any }) {
  let __APIAction: APIAction = 'POST';
  /* curl for POST method
  curl -i -X POST http://localhost:3000/sveltekit/api/ip-info
  curl -i -X POST http://localhost:5173/sveltekit/api/ip-info
  */
  let fromCurl = request.headers.get('user-agent').includes('curl');
  let res = await getIPInfo(fromCurl);
  _$logger.info.TraceAPIAction(route.id, __APIAction, 'C<-S', res.status, res.statusText);
  return res;
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