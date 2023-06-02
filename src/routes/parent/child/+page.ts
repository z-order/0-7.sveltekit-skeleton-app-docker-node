//
// Refs: https://kit.svelte.dev/docs/load#using-parent-data
//
// Note: set _currentFilePath to the current file path for TraceServerLoadData() parameter.
const _currentFilePath = '/parent/child/+page.ts';
//
import { _$logger } from '$lib/utils/logger';
export const prerender = false;
export const ssr = true;
export const csr = true;

/** @type {import('./$types').PageLoad} */
export async function load({ route, params, fetch, parent }: { route: any, params: any, fetch: any, parent: any }) {
  /* Take care not to introduce waterfalls when using await parent(). 
     Here, for example, getData(params) does not depend on the result of calling parent(),
     so we should call it first to avoid a delayed render. 
     */
  // const data = await getData(params);
  const { a, b } = await parent();
  _$logger.debug.TraceServerLoadData(_currentFilePath, route.id, null);
  return { c: a + b };
}