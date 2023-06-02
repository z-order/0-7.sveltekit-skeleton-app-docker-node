// Note: set _currentFilePath to the current file path for TraceServerLoadData() parameter.
const _currentFilePath = '/api/[slug]/+page.server.ts';
//
import { error } from '@sveltejs/kit';
import { _$logger } from '$lib/utils/logger';
import { menuNavLinks, type MenuNavLink, type NavLink } from '$data/menu-nav-links';

export const prerender = false;
export const ssr = true;
export const csr = true;

/** @type {import('./$types').PageServerLoad} */
export function load({ route, params }: { route: any, params: { slug: string; }; }): NavLink {
  let menuItem: any = null;
  let filteredMenuNavLinks = menuNavLinks.filter((linkSet: any) => ['api'].includes(linkSet.id));
  filteredMenuNavLinks.forEach((item: MenuNavLink) => {
    menuItem = item.list.find((subItem: NavLink) => subItem.href.replace('/api/', '') === params.slug);
  });
  _$logger.debug.TraceServerLoadData(_currentFilePath, route.id, `menuItem=${JSON.stringify(menuItem)}`);

  if (!menuItem) throw error(404);

  return menuItem; // type NavLink
}