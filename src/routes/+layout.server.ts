// Note: set _currentFilePath to the current file path for TraceServerLoadData() parameter.
const _currentFilePath = '/+layout.server.ts';
//
import { error } from '@sveltejs/kit';
import * as _$c from '$config/config.global';
import { _$logger } from '$lib/utils/logger';

// This can be false if you're using a fallback (i.e. SPA mode)
export const prerender = false;

// You can turn any SvelteKit app, using any adapter, into a fully client-rendered single-page app (SPA) by disabling SSR at the root layout:
// If you don't have any server-side logic (i.e. +page.server.js, +layout.server.js or +server.js files) you can use adapter-static to create your SPA by adding a fallback page.
export const ssr = true;

// If you're using a fallback (i.e. SPA mode) you can disable client-side rendering (CSR) for a specific route by setting csr: false in the route's config:
export const csr = true;

/** @type {import('./$types').LayoutServerLoad} */
export async function load({
  route,
  params,
  url,
  fetch,
  setHeaders,
  parent,
  depends,
  clientAddress,
  cookies,
  locals,
  platform,
  request,
}: {
  route: any;
  params: any;
  url: any;
  fetch: any;
  setHeaders: any;
  parent: any;
  depends: any;
  clientAddress: any;
  cookies: any;
  locals: any;
  platform: any;
  request: any;
}) {
  _$logger.debug.TraceServerLoadData(_currentFilePath, route.id, null);

  _$c.__DEBUG_LOAD_DATA__ALL_PARAMS__ &&
    console.debug(
      '/+layout.server.ts => ',
      'route:',
      route,
      'params:',
      params,
      'url:',
      url,
      'fetch:',
      fetch,
      'setHeaders:',
      setHeaders,
      'parent:',
      parent,
      'depends:',
      depends,
      'clientAddress:',
      clientAddress,
      'cookies:',
      cookies,
      'locals:',
      locals,
      'platform:',
      platform,
      'request:',
      request,
    );

  // If the /api/auth endpoint is intended to be mutative (for example, if it's supposed to log the user in),
  // then it should not be called during prerendering.
  // https://kit.svelte.dev/docs#loading-data
  // https://kit.svelte.dev/docs#prerendering
  // If you want to ignore this issue of error during presendering(SSR is true) then you can set prerender: false in the route's config.
  if (import.meta.env.SSR) {
    // import.meta.env.SSR is true during prerendering
    // skip fetching in prerendering
  } else {
    // fetch data from an API
  }

  // Cookies and headers: https://kit.svelte.dev/docs/load#cookies-and-headers
  //
  // Cookies are available in the load function, but not in the page component.
  // If you need to access cookies in the page component, you can pass them as props.
  // return { props: { cookies } };
  //
  // When setting cookies, be aware of the path property.
  // By default, the path of a cookie is the current pathname.
  // If you for example set a cookie at page admin/user, the cookie will only be available within the admin pages by default.
  // In most cases you likely want to set path to '/' to make the cookie available throughout your app.

  let userSessionData = undefined; // Get the user session data from the API endpoint
  const sessionid = cookies.get('x-session-id');
  // In real-world scenarios, you should check the validation of the sessionid and when the sessionid is valid with the user session data,
  // you can skip the fetching of the user session data from the API endpoint during a few minutes for the better performance.
  if (sessionid) {
    // fetch data from an API
    const res = await fetch(`/api/auth`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-session-id': sessionid,
      },
    });
    if (res.status === 200) {
      userSessionData = await res.json();
    }
  }

  return {
    userSessionData: userSessionData,
    example_layout_loading_data: [
      { slug: 'slug-1', title: 'title-1', content: 'content-1' },
      { slug: 'slug-2', title: 'title-2', content: 'content-2' },
      { slug: 'slug-3', title: 'title-3', content: 'content-3' },
    ],
  };
}
