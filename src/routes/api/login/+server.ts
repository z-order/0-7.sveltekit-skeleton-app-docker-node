import { error } from '@sveltejs/kit';
import { _$logger, type APIAction } from '$lib/utils/logger';
import * as _$c from '$config/config.global';
import * as _$auth from '$lib/auth/authorization';
import type { PromiseSMD, UserSessionData, APILoginReq, APILoginResp } from '$lib/types/types';

/** @type {import('./$types').RequestHandler} */
export async function POST({ route, params, url, cookies, request }: { route: any; params: any; url: any; cookies: any; request: any }) {
  const __APIAction: APIAction = 'POST';
  /* curl for GET method
  curl -i -X POST http://localhost:3000/api/login
  curl -i -d '{"id":"1001", "password":"epl@@1001"}' -X POST http://localhost:5173/api/login
  */
  const apiReqData: APILoginReq = await request.json();

  if (import.meta.env.MODE === 'development') {
    _$logger.debug.TraceAPIAction(route.id, __APIAction, 'C->S', JSON.stringify(apiReqData));
  } else {
    _$logger.info.TraceAPIAction(route.id, __APIAction, 'C->S', JSON.stringify(apiReqData.id));
  }

  if (apiReqData == undefined || apiReqData.id == undefined || apiReqData.password == undefined) {
    throw error(400, 'Bad Request');
  }

  if (apiReqData.id == '' || apiReqData.password == '') {
    throw error(400, 'Bad Request');
  }

  const userAuthData: PromiseSMD | undefined = await _$auth.getUserAuth(apiReqData.id, apiReqData.password);

  if (userAuthData == undefined) {
    throw error(401, 'Unauthorized');
  } else if (userAuthData.status !== 200) {
    throw error(userAuthData.status, userAuthData.message);
  }

  if (userAuthData.data.uuid == undefined || userAuthData.data.id == undefined || userAuthData.data.name == undefined || userAuthData.data.email == undefined) {
    // Internal Server Error
    throw error(500, 'Internal Server Error');
  }

  const userSessionData: UserSessionData = await _$auth.createUserSession(userAuthData.data.uuid);
  const cookieValue = _$auth.createCookieValue(userSessionData);
  _$auth.addUserSession(userSessionData);

  _$logger.info.TraceAPIAction(route.id, __APIAction, 'C--S', 'userSessionData', JSON.stringify(userSessionData));
  _$logger.debug.TraceAPIAction(route.id, __APIAction, 'C--S', 'cookieValue', cookieValue);

  const resData: APILoginResp = {
    uuid: userAuthData.data.uuid,
    id: userAuthData.data.id,
    name: userAuthData.data.name,
    email: userAuthData.data.email,
  };

  const res = new Response(JSON.stringify(resData), { headers: { 'set-cookie': cookieValue } });
  _$logger.info.TraceAPIAction(route.id, __APIAction, 'C<-S', res.status, res.statusText, resData);
  return res;
}
