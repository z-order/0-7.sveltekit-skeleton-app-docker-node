import { v4 as uuid } from 'uuid';

// Navigation Links & Sitemap

export type NavLink = {
  id: string;
  href: string;
  label: string;
  data: any;
  keywords: string;
};

export type MenuNavLink = {
  id: string;
  title: string;
  list: NavLink[];
};

export type MenuNavLinks = {
  id: string;
  title: string;
  list: NavLink[];
}[];

export const menuNavLinks: MenuNavLinks = [
  // APIs ---
  {
    id: 'sveltekit',
    title: 'SvelteKit Core Concepts',
    list: [
      // 1. When you click the menu item, the page moves to the url of menuItem.href that is the path of src/routes/api/[slug]
      // 2. If menuItem.data.redirect is true, redirect the page to the url inside src/routes/api/[slug]/+page.server.ts
      // 3. If menuItem.data.redirect is false, render the page in the path of src/routes/api/[slug]/+layout.svelte and +page.svelte
      { id: uuid(), href: '/sveltekit/sample-01', label: '1. Sample - 01 (/sveltekit/adder)', data: { url: '/sveltekit/adder', redirect: true }, keywords: '' },
      { id: uuid(), href: '/sveltekit/sample-02', label: '2. Sample - 02 (/sveltekit/fetch/[id])', data: { url: '/sveltekit/fetch/1234', redirect: true }, keywords: '' },
      { id: uuid(), href: '/sveltekit/sample-03', label: '3. Sample - 03 (/sveltekit/api/fetch/[id])', data: { url: '/sveltekit/api/fetch/1234', redirect: false }, keywords: '' },
      { id: uuid(), href: '/sveltekit/sample-04', label: '4. Sample - 04 (/sveltekit/api/random-number)', data: { url: '/sveltekit/api/random-number', redirect: false, method: 'POST' }, keywords: '' },
      { id: uuid(), href: '/sveltekit/sample-05', label: '5. Sample - 05 (/sveltekit/api/ip-info)', data: { url: '/sveltekit/api/ip-info', redirect: false, method: 'GET' }, keywords: '' },
      { id: uuid(), href: '/sveltekit/sample-06', label: '6. Sample - 06 (/sveltekit/account)', data: { url: '/sveltekit/account', redirect: true }, keywords: '' },
      { id: uuid(), href: '/sveltekit/sample-07', label: '7. Sample - 07 (/sveltekit/parent/child)', data: { url: '/sveltekit/parent/child', redirect: true }, keywords: '' },
      { id: uuid(), href: '/sveltekit/sample-08', label: '8. Sample - 08 (/sveltekit/redirect)', data: { url: '/sveltekit/redirect', redirect: true }, keywords: '' },
      { id: uuid(), href: '/sveltekit/sample-09', label: '9. Sample - 09 (/sveltekit/streaming)', data: { url: '/sveltekit/streaming', redirect: true }, keywords: '' },
      { id: uuid(), href: '/sveltekit/sample-10', label: '10. Sample - 10 (default error)', data: { url: '/sveltekit/parent', redirect: true }, keywords: '' }, // /api/parent has no +page.svelte so error occurs
      { id: uuid(), href: '/sveltekit/sample-11', label: '11. Sample - 11 (/sveltekit/invalidate)', data: { url: '/sveltekit/invalidate', redirect: true }, keywords: '' },
      { id: uuid(), href: '/sveltekit/sample-12', label: '12. Sample - 12 (/sveltekit/form-action)', data: { url: '/sveltekit/form-action', redirect: true }, keywords: '' },
      { id: uuid(), href: '/sveltekit/sample-13', label: '13. Sample - 13 (APIs Call)', data: '', keywords: '' },
    ]
  },
];
