//
// Refs: https://kit.svelte.dev/docs/load#using-parent-data
//
// Note: set _currentFilePath to the current file path for TraceServerLoadData() parameter.
const _currentFilePath = '/parent/child/+layout.ts';
//
import { _$logger } from '$lib/utils/logger';

export const prerender = false;
export const ssr = true;
export const csr = true;

/** @type {import('./$types').LayoutLoad} */
export async function load({ route, params, fetch, parent, request }: { route: any, params: any, fetch: any, parent: any, request: any }) {
  const { a } = await parent();
  _$logger.debug.TraceServerLoadData(_currentFilePath, route.id, null);
  return { b: a + 1 };
}
