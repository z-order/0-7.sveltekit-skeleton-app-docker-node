//
// Refs: https://kit.svelte.dev/docs/load#using-parent-data
//
// Note: set _currentFilePath to the current file path for TraceServerLoadData() parameter.
const _currentFilePath = '/parent/+layout.ts';
//
import { _$logger } from '$lib/utils/logger';

export const prerender = false;
export const ssr = true;
export const csr = true;

/** @type {import('./$types').LayoutLoad} */
export async function load({ route, params, fetch }: { route: any, params: any, fetch: any }) {
  _$logger.debug.TraceServerLoadData(_currentFilePath, route.id, null);
  return { a: 1 };
}