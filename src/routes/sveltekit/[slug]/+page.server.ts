// Note: set _currentFilePath to the current file path for TraceServerLoadData() parameter.
const _currentFilePath = '/sveltekit/[slug]/+page.server.ts';
//
import { error } from '@sveltejs/kit';
import { _$logger } from '$lib/utils/logger';
import { menuNavLinks, type MenuNavLinks, type MenuNavLink, type NavLink } from '$data/menu-nav-links';
import { redirect } from '@sveltejs/kit';

export const prerender = false;
export const ssr = true;
export const csr = true;

/** @type {import('./$types').PageServerLoad} */
export function load({ route, params }: { route: any, params: { slug: string; }; }) {
  let menuItem: any = null;
  let filteredMenuNavLinks = menuNavLinks.filter((linkSet: any) => ['sveltekit'].includes(linkSet.id)); // id: 'sveltekit'
  filteredMenuNavLinks.forEach((item: MenuNavLink) => {
    menuItem = item.list.find((subItem: NavLink) => subItem.href.replace('/sveltekit/', '') === params.slug);
  });
  _$logger.debug.TraceServerLoadData(_currentFilePath, route.id, `menuItem=${JSON.stringify(menuItem)}`);

  if (!menuItem) throw error(404);

  // if redirect is true, redirect to the url
  if (menuItem.data?.redirect) {
    if (menuItem.data?.url?.length > 0) {
      throw redirect(307, menuItem.data.url);
    } else {
      // redirect url is not defined
      throw error(500, 'redirect url is not defined');
    }
  }

  return { menuItem }; // type NavLink
}
