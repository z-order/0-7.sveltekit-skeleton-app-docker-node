import { error } from '@sveltejs/kit';
import { _$logger, type APIAction } from '$lib/utils/logger';
import * as _$c from '$config/config.global';
import * as _$auth from '$lib/auth/authorization';

/** @type {import('./$types').RequestHandler} */
export async function POST(event: any) {
  const __APIAction: APIAction = 'POST';
  /* curl command line
  curl -i -X POST http://localhost:3000/api/auth
  curl -i -X POST http://localhost:5173/api/auth
  */
  const userSessionId = await event.request.headers.get('x-session-id');
  _$logger.info.TraceAPIAction(event.route.id, __APIAction, 'C->S', `headers: x-session-id`, userSessionId);

  const userSessoinData = await _$auth.getUserSession(userSessionId);

  const resStatus = { status: 404, statusText: 'Not found' };
  if (userSessoinData == undefined || userSessoinData == null) {
    _$logger.info.TraceAPIAction(event.route.id, __APIAction, 'C<-S', resStatus);
    return new Response(null, resStatus);
  }

  const res = new Response(JSON.stringify(userSessoinData));
  _$logger.info.TraceAPIAction(event.route.id, __APIAction, 'C<-S', res.status, res.statusText, userSessionId, JSON.stringify(userSessoinData));
  return res;
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE(event: any) {
  const __APIAction: APIAction = 'DELETE';
  /* curl command line
  curl -i -H 'x-session-id: ...' -X DELETE http://localhost:3000/api/auth
  curl -i -H 'x-session-id: ...' -X DELETE http://localhost:5173/api/auth
  */
  const userSessionId = await event.request.headers.get('x-session-id');
  _$logger.info.TraceAPIAction(event.route.id, __APIAction, 'C->S', `headers: x-session-id`, userSessionId);

  const userSessoinData = await _$auth.removeUserSession(userSessionId);

  const resStatus = { status: 404, statusText: 'Not found' };
  if (userSessoinData == undefined || userSessoinData == null) {
    _$logger.info.TraceAPIAction(event.route.id, __APIAction, 'C<-S', resStatus);
    return new Response(null, resStatus);
  }

  const res = new Response();
  _$logger.info.TraceAPIAction(event.route.id, __APIAction, 'C<-S', res.status, res.statusText, userSessionId);
  return res;
}
