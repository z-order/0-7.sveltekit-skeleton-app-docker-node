import * as _$c from '$config/config.global';

export async function handle({ event, resolve }: { event: any; resolve: any }) {
  event.locals.user = await getHookSample(event.cookies.get('x-session-id'));

  // check if we are running in development mode for Vite
  if (import.meta.env.MODE === 'development') {
    _$c.__DEBUG_HOOKS__ && console.log('[hook] handle => event', event);
  }

  return resolve(event);
}

// In this example, we are hooking events and return a sample message.
async function getHookSample(sessionid: string) {
  if (!sessionid) return { hookSample: { message: 'Unknown sessionid', sessionid } };
  return { hookSample: { message: 'Hello world', sessionid } };
}
