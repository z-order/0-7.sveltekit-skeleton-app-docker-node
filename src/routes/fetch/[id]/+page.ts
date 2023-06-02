import { error } from '@sveltejs/kit';
import * as _$c from '$config/config.global';

export const prerender = false;
export const ssr = false;
export const csr = true;

/** @type {import('./$types').PageLoad} */
export async function load({ route, params, fetch }: { route: any, params: any, fetch: any }) {

  // log data if we are running in development mode and following code will be removed in production mode
  if (import.meta.env.MODE === 'development') {
    _$c.__DEBUG_FETCH__ && console.debug(`${route.id}/+page.js => before fetch()`);
  }

  // fetch data from an API: 
  // - You can check fetch function at https://developer.mozilla.org/en-US/docs/Web/API/fetch
  // - If your file extention for this file is .js not .ts and you hover mouse on fetch functoin,
  //   you can see toast window for the detailed references of the sveltekit.
  //   we have to find the way to show the toast window for .ts file.
  const res = await fetch(`/api/fetch/${params.id}`, { method: 'GET' });
  const item = await res.json();

  // log data if we are running in development mode and following code will be removed in production mode
  if (import.meta.env.MODE === 'development') {
    _$c.__DEBUG_FETCH__ && console.debug(`${route.id}/+page.js => after fetch()`);
    console.info(`${route.id}/${params.id}, item=${JSON.stringify(item)}`);
  }

  if (!item) throw error(404);

  return { item };
}