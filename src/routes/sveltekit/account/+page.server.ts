//
// Refs: https://kit.svelte.dev/docs/form-actions#loading-data
//
// Note: set _currentFilePath to the current file path for TraceServerLoadData() parameter.
const _currentFilePath = '/sveltekit/account/+page.server.ts';
//
import { _$logger } from '$lib/utils/logger';
import { redirect } from '@sveltejs/kit';

export const prerender = false;
export const ssr = true;
export const csr = true;

/** @type {import('./$types').PageServerLoad} */
export function load(event: any) {
  _$logger.debug.TraceServerLoadData(_currentFilePath, event.route.id, null);
  return {
    user: event.locals.user
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  logout: async (event: any) => {
    const formData = await event.request.formData();
    const formDataSerialized = Object.fromEntries(formData);
    _$logger.debug.TraceFormActions(_currentFilePath, 'logout', formData);

    // Remove the cookie and session data
    const sessionid = event.cookies.get('x-session-id');
    if (sessionid) {
      // fetch data from an API
      const res = await event.fetch(`/api/auth`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          'x-session-id': sessionid,
        },
      });
      if (res.status === 200) {
        return { success: false };
      }
    }
    event.cookies.delete('x-session-id');
    event.locals.user = null;

    return { success: true, sessionid };
  }
}