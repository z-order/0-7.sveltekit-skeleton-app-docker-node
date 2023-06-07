//
// Refs: https://kit.svelte.dev/docs/load#redirects
//
// Note: set _currentFilePath to the current file path for TraceServerLoadData() parameter.
const _currentFilePath = '/sveltekit/redirect/+layout.server.ts';
//
import { _$logger } from '$lib/utils/logger';
import { redirect } from '@sveltejs/kit';

export const prerender = false;
export const ssr = true;
export const csr = true;

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ route, params, fetch }: { route: any, params: any, fetch: any }) {
  // To redirect users, use the redirect helper from @sveltejs/kit to specify the location
  // to which they should be redirected alongside a 3xx status code.
  _$logger.debug.TraceServerLoadData(_currentFilePath, route.id, null);
  // redirect to /fetch/1234 on the same host, if you want to redirect to another host,
  // use the full url, like https://www.google.com
  throw redirect(307, '/sveltekit/fetch/1234');
}
