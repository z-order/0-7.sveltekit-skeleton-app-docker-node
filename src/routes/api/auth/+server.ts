import { error } from '@sveltejs/kit';
import { _$logger } from '$lib/utils/logger';
import * as _$c from '$config/config.global';
import * as _$auth from '$lib/auth/authorization';

/** @type {import('./$types').RequestHandler} */
export async function POST({ route, params, url, cookies, headers, request }:
  { route: any, params: any, url: any, cookies: any, headers: any, request: any }) {
  /* curl for GET method
  curl -i -X POST http://localhost:3000/api/auth
  curl -i -X POST http://localhost:5173/api/auth
  */
  const userSessionId = await request.headers.get('x-session-id');
  _$logger.info.TraceAPIAction(route.id, 'POST', 'C->S', `headers: x-session-id`, userSessionId);

  const userSessoinData = await _$auth.getUserSession(userSessionId);

  let resStatus = { status: 404, statusText: 'Not found' };
  if (userSessoinData == undefined || userSessoinData == null) {
    _$logger.info.TraceAPIAction(route.id, 'POST', 'C<-S', resStatus);
    return new Response(null, resStatus);
  }

  let res = new Response(JSON.stringify(userSessoinData));
  _$logger.info.TraceAPIAction(route.id, 'POST', 'C<-S', res.status, res.statusText, userSessionId, JSON.stringify(userSessoinData));
  return res;
}
