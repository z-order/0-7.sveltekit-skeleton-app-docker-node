// Navigation Links & Sitemap

export type NavLink = {
  href: string;
  label: string;
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
      { href: '/api/sample-01', label: '1. Sample - 01', keywords: '' },
      { href: '/api/sample-02', label: '2. Sample - 02', keywords: '' },
      { href: '/api/sample-03', label: '3. Sample - 03', keywords: '' },
      { href: '/api/sample-04', label: '4. Sample - 04', keywords: '' },
      { href: '/api/sample-05', label: '5. Sample - 05', keywords: '' },
      { href: '/api/sample-06', label: '6. Sample - 06', keywords: '' },
      { href: '/api/sample-07', label: '7. Sample - 07', keywords: '' },
      { href: '/api/sample-08', label: '8. Sample - 08', keywords: '' },
      { href: '/api/sample-09', label: '9. Sample - 09', keywords: '' },
      { href: '/api/sample-10', label: '10. Sample - 10', keywords: '' },
    ]
  },
];
