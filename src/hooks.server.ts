import { _$logger } from '$lib/utils/logger';
import * as _$c from '$config/config.global';
import * as _$auth from '$lib/auth/authorization';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }: { event: any, resolve: any }) {

  event.locals.user = await getUser(event.cookies.get('x-session-id'));

  // check if we are running in development mode for Vite
  if (import.meta.env.MODE === 'development') {

    _$c.__DEBUG_HOOKS__ && console.log('[hook] handle => event', event);

  }

  return resolve(event);
}

// In this example, we are using a simple session store. In a real app, you would use something like Redis or Memcached if you are likely possible.
// Otherwise, this getUser() function could make the app block. You can't call fetch() as it cause blocking too.
async function getUser(sessionid: string) {
  /* sample codes for the session handling
  if (!sessionid) return;

  const user = session.get(sessionid);
  if (user) return user;

  // if session has expired, remove it from the store
  session.destroy(sessionid);
  */
  if (!sessionid) return undefined;

  return { name: 'user0001', age: 34, message: 'Hello world' };
}