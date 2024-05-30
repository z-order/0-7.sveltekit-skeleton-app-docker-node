//
// Refs: https://kit.svelte.dev/docs/load#rerunning-load-functions-manual-invalidation
//
// Note: set _currentFilePath to the current file path for TraceServerLoadData() parameter.
const _currentFilePath = '/sveltekit/invalidate/+page.ts';
//
import { _$logger } from '$lib/utils/logger';
import { error } from '@sveltejs/kit';

export const prerender = false;
export const ssr = false;
export const csr = true;

/* [Explained ssr/csr actions for the Universal Mode(+layout.ts or +page.ts) not for the Server Mode(+layout.server.ts or +page.server.ts)]

  export const ssr = true; 
  export const csr = true;

  : If you set ssr = true, csr = true then you will get load two times one load for server side and one load for client side.
  And, your browser will display the page two times one for server load data and then one for client load data.

  export const ssr = true; 
  export const csr = false;

  : If you set ssr = true, csr = false, then you will get load one time for server side and no load for client side.
  And, your browser will display the page one time for server load data with array sequential number from 1 to N.
  Whenever you refresh your browser, you will get the array added one more item with sequential number N+1.
  It means the server side _randomNumberArray remains the instance of the array is not re-initialized.
  But, the the client side of the browser for the button click does not work.

  export const ssr = false; 
  export const csr = true;

  : If you set ssr = false, csr = true, then you will get load one time for client side and no load for server side.
  And, your browser will display the page one time for client load data with array sequential number only 1.
  Whenever you refresh your browser, you will get the same array with sequential number 1.
  It means the client side _randomNumberArray is re-initialized every time you refresh your browser.
*/

const _randomNumberArray: string[] = [];

/** @type {import('./$types').PageLoad} */
export async function load({ route, params, fetch, depends }: { route: any; params: any; fetch: any; depends: any }) {
  // load reruns when `invalidate('/sveltekit/api/random-number')` is called...
  // ...or when `invalidate('app:random')` is called somewhere else in the app
  depends('app:random-number');

  const res = await fetch(`/sveltekit/api/random-number`, { method: 'GET' });
  const randomNumber = await res.json();

  _randomNumberArray.push(`Sequential No.${_randomNumberArray.length + 1} : ` + randomNumber);

  if (!randomNumber) throw error(500, 'Internal Server: Failed to fetch /sveltekit/api/random-number');

  if (import.meta.env.SSR) {
    // This is for the server side rendering.

    _$logger.debug.TraceServerLoadData(_currentFilePath, route.id, '=> SSR', _randomNumberArray);
  } else {
    // This is for the client side rendering.

    _$logger.debug.TraceServerLoadData(_currentFilePath, route.id, '=> CSR', _randomNumberArray);
  }

  return { _randomNumberArray };
}
