// Navigation Links & Sitemap

export type NavLink = {
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
    id: 'api',
    title: 'APIs',
    list: [
      // 1. When you click the menu item, the page moves to the url of menuItem.href that is the path of src/routes/api/[slug]
      // 2. If menuItem.data.redirect is true, redirect the page to the url inside src/routes/api/[slug]/+page.server.ts
      // 3. If menuItem.data.redirect is false, render the page in the path of src/routes/api/[slug]/+layout.svelte and +page.svelte
      { href: '/api/sample-01', label: '1. Sample - 01 (/api/adder)', data: { url: '/api/adder', redirect: true }, keywords: '' },
      { href: '/api/sample-02', label: '2. Sample - 02 (/fetch/[id])', data: { url: '/fetch/1234', redirect: true }, keywords: '' },
      { href: '/api/sample-03', label: '2. Sample - 03 (/api/random-number)', data: { url: '/api/random-number', redirect: false, method: 'POST' }, keywords: '' },
      { href: '/api/sample-04', label: '2. Sample - 04 (/api/ip-info)', data: { url: '/api/ip-info', redirect: false, method: 'GET' }, keywords: '' },
      { href: '/api/sample-05', label: '3. Sample - 05 (/account)', data: { url: '/account', redirect: true }, keywords: '' },
      { href: '/api/sample-06', label: '4. Sample - 06 (/parent/child)', data: { url: '/parent/child', redirect: true }, keywords: '' },
      { href: '/api/sample-07', label: '5. Sample - 07 (/redirect)', data: { url: '/redirect', redirect: true }, keywords: '' },
      { href: '/api/sample-08', label: '6. Sample - 08 (/streaming)', data: { url: '/streaming', redirect: true }, keywords: '' },
      { href: '/api/sample-09', label: '7. Sample - 09 (default error)', data: { url: '/parent', redirect: true }, keywords: '' }, // /api/parent has no +page.svelte so error occurs
      { href: '/api/sample-10', label: '9. Sample - 10 (/invalidate)', data: { url: '/invalidate', redirect: true }, keywords: '' },
      { href: '/api/sample-11', label: '8. Sample - 11 (/form-action)', data: { url: '/form-action', redirect: true }, keywords: '' },
      { href: '/api/sample-12', label: '10. Sample - 12', data: '', keywords: '' },
    ]
  },
];
