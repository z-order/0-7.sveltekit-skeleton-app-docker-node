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
  {
    id: 'svelte',
    title: 'Svelte Tutorials',
    list: [
      // 1. When you click the menu item, the page moves to the url of menuItem.href that is the path of src/routes/api/[slug]
      // 2. If menuItem.data.redirect is true, redirect the page to the url inside src/routes/api/[slug]/+page.server.ts
      // 3. If menuItem.data.redirect is false, render the page in the path of src/routes/api/[slug]/+layout.svelte and +page.svelte
      { id: uuid(), href: '/svelte/logic/each-blocks', label: '1-1. Tutorials - /svelte/logic/each-blocks', data: { url: '/svelte/logic/each-blocks', redirect: true }, keywords: '' },
      { id: uuid(), href: '/svelte/logic/keyed-each-blocks', label: '1-2. Tutorials - /svelte/logic/keyed-each-blocks', data: { url: '/svelte/logic/keyed-each-blocks', redirect: true }, keywords: '' },
      { id: uuid(), href: '/svelte/logic/await-blocks', label: '1-3. Tutorials - /svelte/logic/await-blocks', data: { url: '/svelte/logic/await-blocks', redirect: true }, keywords: '' },

      { id: uuid(), href: '/svelte/events/dom-events', label: '2-1. Tutorials - /svelte/events/dom-events', data: { url: '/svelte/events/dom-events', redirect: true }, keywords: '' },
      { id: uuid(), href: '/svelte/events/inline-handlers', label: '2-2. Tutorials - /svelte/events/inline-handlers', data: { url: '/svelte/events/inline-handlers', redirect: true }, keywords: '' },
      { id: uuid(), href: '/svelte/events/event-modifiers', label: '2-3. Tutorials - /svelte/events/event-modifiers', data: { url: '/svelte/events/event-modifiers', redirect: true }, keywords: '' },
      { id: uuid(), href: '/svelte/events/component-events', label: '2-4. Tutorials - /svelte/events/component-events', data: { url: '/svelte/events/component-events', redirect: true }, keywords: '' },
      { id: uuid(), href: '/svelte/events/event-forwarding', label: '2-5. Tutorials - /svelte/events/event-forwarding', data: { url: '/svelte/events/event-forwarding', redirect: true }, keywords: '' },
      { id: uuid(), href: '/svelte/events/dom-event-forwarding', label: '2-6. Tutorials - /svelte/events/dom-event-forwarding', data: { url: '/svelte/events/dom-event-forwarding', redirect: true }, keywords: '' },

      { id: uuid(), href: '/svelte/binding/text-inputs', label: '3-1. Tutorials - /svelte/binding/text-inputs', data: { url: '/svelte/binding/text-inputs', redirect: true }, keywords: '' },
      { id: uuid(), href: '/svelte/binding/numeric-inputs', label: '3-2. Tutorials - /svelte/binding/numeric-inputs', data: { url: '/svelte/binding/numeric-inputs', redirect: true }, keywords: '' },
      { id: uuid(), href: '/svelte/binding/checkbox-inputs', label: '3-3. Tutorials - /svelte/binding/checkbox-inputs', data: { url: '/svelte/binding/checkbox-inputs', redirect: true }, keywords: '' },
      { id: uuid(), href: '/svelte/binding/select-bindings', label: '3-4. Tutorials - /svelte/binding/select-bindings', data: { url: '/svelte/binding/select-bindings', redirect: true }, keywords: '' },
      { id: uuid(), href: '/svelte/binding/group-inputs', label: '3-5. Tutorials - /svelte/binding/group-inputs', data: { url: '/svelte/binding/group-inputs', redirect: true }, keywords: '' },
      { id: uuid(), href: '/svelte/binding/select-multiple', label: '3-6. Tutorials - /svelte/binding/select-multiple', data: { url: '/svelte/binding/select-multiple', redirect: true }, keywords: '' },
      { id: uuid(), href: '/svelte/binding/textarea-inputs', label: '3-7. Tutorials - /svelte/binding/textarea-inputs', data: { url: '/svelte/binding/textarea-inputs', redirect: true }, keywords: '' },

      { id: uuid(), href: '/svelte/lifecycle', label: '4. Tutorials - /svelte/lifecycle', data: { url: '/svelte/lifecycle', redirect: true }, keywords: '' },

      { id: uuid(), href: '/svelte/stores/writable-stores', label: '5-1. Tutorials - /svelte/stores/writable-stores', data: { url: '/svelte/stores/writable-stores', redirect: true }, keywords: '' },
      {
        id: uuid(),
        href: '/svelte/stores/writable-stores-auto-subscriptions',
        label: '5-2. Tutorials - /svelte/stores/writable-stores-auto-subscriptions',
        data: { url: '/svelte/stores/writable-stores-auto-subscriptions', redirect: true },
        keywords: '',
      },
      { id: uuid(), href: '/svelte/stores/readable-stores', label: '5-3. Tutorials - /svelte/stores/readable-stores', data: { url: '/svelte/stores/readable-stores', redirect: true }, keywords: '' },
      { id: uuid(), href: '/svelte/stores/derived-stores', label: '5-4. Tutorials - /svelte/stores/derived-stores', data: { url: '/svelte/stores/derived-stores', redirect: true }, keywords: '' },
      { id: uuid(), href: '/svelte/stores/custom-stores', label: '5-5. Tutorials - /svelte/stores/custom-stores', data: { url: '/svelte/stores/custom-stores', redirect: true }, keywords: '' },
      { id: uuid(), href: '/svelte/stores/store-bindings', label: '5-6. Tutorials - /svelte/stores/store-bindings', data: { url: '/svelte/stores/store-bindings', redirect: true }, keywords: '' },
    ],
  },
  {
    id: 'svelte+',
    title: 'Svelte+ Tutorials',
    list: [
      // 1. When you click the menu item, the page moves to the url of menuItem.href that is the path of src/routes/api/[slug]
      // 2. If menuItem.data.redirect is true, redirect the page to the url inside src/routes/api/[slug]/+page.server.ts
      // 3. If menuItem.data.redirect is false, render the page in the path of src/routes/api/[slug]/+layout.svelte and +page.svelte
      { id: uuid(), href: '/svelte+/component-composition/slots', label: '1. Tutorials - /svelte+/component-composition/slots', data: { url: '/svelte+/component-composition/slots', redirect: true }, keywords: '' },
      { id: uuid(), href: '/svelte+/component-composition/named-slots', label: '2. Tutorials - /svelte+/component-composition/named-slots', data: { url: '/svelte+/component-composition/named-slots', redirect: true }, keywords: '' },
      {
        id: uuid(),
        href: '/svelte+/component-composition/slot-fallbacks',
        label: '3. Tutorials - /svelte+/component-composition/slot-fallbacks',
        data: { url: '/svelte+/component-composition/slot-fallbacks', redirect: true },
        keywords: '',
      },
      { id: uuid(), href: '/svelte+/component-composition/slot-props', label: '4. Tutorials - /svelte+/component-composition/slot-props', data: { url: '/svelte+/component-composition/slot-props', redirect: true }, keywords: '' },
      {
        id: uuid(),
        href: '/svelte+/component-composition/slot-props-optional',
        label: '5. Tutorials - /svelte+/component-composition/slot-props-optional',
        data: { url: '/svelte+/component-composition/slot-props-optional', redirect: true },
        keywords: '',
      },
    ],
  },
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
      { id: uuid(), href: '/sveltekit/sample-06', label: '6. Sample - 06 (/sveltekit/logout)', data: { url: '/sveltekit/logout', redirect: true }, keywords: '' },
      { id: uuid(), href: '/sveltekit/sample-07', label: '7. Sample - 07 (/sveltekit/parent/child)', data: { url: '/sveltekit/parent/child', redirect: true }, keywords: '' },
      { id: uuid(), href: '/sveltekit/sample-08', label: '8. Sample - 08 (/sveltekit/redirect)', data: { url: '/sveltekit/redirect', redirect: true }, keywords: '' },
      { id: uuid(), href: '/sveltekit/sample-09', label: '9. Sample - 09 (/sveltekit/streaming)', data: { url: '/sveltekit/streaming', redirect: true }, keywords: '' },
      { id: uuid(), href: '/sveltekit/sample-10', label: '10. Sample - 10 (default error)', data: { url: '/sveltekit/parent', redirect: true }, keywords: '' }, // /api/parent has no +page.svelte so error occurs
      { id: uuid(), href: '/sveltekit/sample-11', label: '11. Sample - 11 (/sveltekit/invalidate)', data: { url: '/sveltekit/invalidate', redirect: true }, keywords: '' },
      { id: uuid(), href: '/sveltekit/sample-12', label: '12. Sample - 12 (/sveltekit/form-action)', data: { url: '/sveltekit/form-action', redirect: true }, keywords: '' },
      { id: uuid(), href: '/sveltekit/sample-13', label: '13. Sample - 13 (APIs Call)', data: '', keywords: '' },
    ],
  },
];
