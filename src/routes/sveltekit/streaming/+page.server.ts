//
// Refs: https://kit.svelte.dev/docs/load#streaming-with-promises
//
// Note: set _currentFilePath to the current file path for TraceServerLoadData() parameter.
const _currentFilePath = '/sveltekit/redirect/+layout.server.ts';
//
import { _$logger } from '$lib/utils/logger';

export const prerender = false;
export const ssr = true;
export const csr = true;

/** @type {import('./$types').PageServerLoad} */
export async function load({ route, params, fetch }: { route: any, params: any, fetch: any }) {
  //
  // Promises at the top level of the returned object will be awaited, 
  // making it easy to return multiple promises without creating a waterfall.
  // When using a server load, nested promises will be streamed to the browser as they resolve.
  // This is useful if you have slow, non-essential data, since you can start rendering the page before all the data is available:
  //
  // Nodes: On platforms that do not support streaming, such as AWS Lambda, responses will be buffered. This means the page will only render once all promises resolve.
  //        Streaming data will only work when JavaScript is enabled. You should avoid returning nested promises from a universal load(means load() in +page.ts) function
  //        if the page is server rendered, as these are not streamed — instead, the promise is recreated when the function re-runs in the browser.
  //
  let resData = {
    streamed_1st: Promise.resolve('data: 1st'),
    streamed_2nd: Promise.resolve('data: 2nd'),
    streamed_3rd: {
      delayed_data: new Promise((fulfil) => {
        setTimeout(() => {
          fulfil('data: 3rd')
        }, 3000);
      })
    }
  };
  _$logger.debug.TraceServerLoadData(_currentFilePath, route.id, resData);
  return resData;
}
