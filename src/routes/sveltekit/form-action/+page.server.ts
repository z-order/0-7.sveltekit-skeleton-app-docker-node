//
// Refs: https://kit.svelte.dev/docs/form-actions#default-actions
//
// SvelteKit Tutorial - Froms: https://learn.svelte.dev/tutorial/the-form-element
// SvelteKit Tutorial - Froms: https://learn.svelte.dev/tutorial/named-form-actions
// SvelteKit Tutorial - Froms: https://learn.svelte.dev/tutorial/form-validation
// SvelteKit Tutorial - Froms: https://learn.svelte.dev/tutorial/progressive-enhancement
// SvelteKit Tutorial - Froms: https://learn.svelte.dev/tutorial/customizing-use-enhance
//
// Note: set _currentFilePath to the current file path for TraceServerLoadData() parameter.
const _currentFilePath = '/sveltekit/form-action/+page.server.ts';
//
import { _$logger } from '$lib/utils/logger';
import { error, redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';

export const prerender = false;
export const ssr = true;
export const csr = true;

/** @type {import('./$types').LayoutServerLoad} */
export async function load(event: any) {

  _$logger.debug.TraceServerLoadData(_currentFilePath, event.route.id, null);

  return {};

}

/** @type {import('./$types').Actions} */
export const actions: import('./$types').Actions = {
  /* When using named actions, the default action cannot be used. See the docs for more info: https://kit.svelte.dev/docs/form-actions#named-actions// named form actions
  // default form action : default
  default: async ({ cookies, request }) => {
    const formData = await request.formData();
    _$logger.debug.TraceFormActions(_currentFilePath, 'default', formData);
  },
  */
  // named form action : login
  login: async ({ cookies, request, url }) => { // login sample codes like below
    const formData = await request.formData();
    const formDataSerialized = Object.fromEntries(formData);
    _$logger.debug.TraceFormActions(_currentFilePath, 'login', formData);

    let missing = false;
    let missingData = { missingEmail: false, missingPassword: false };
    const email = formData.get('email');
    const password = formData.get('password');
    if (!email) { missingData.missingEmail = true; }
    if (!password) { missingData.missingPassword = true; }

    Object.entries(missingData).forEach(([key, value]) => value && (missing = true));
    if (missing) {
      return fail(400, { ...missingData, ...formDataSerialized });
    }

    // A sample code of getting user information form DB
    const user: string = await (async function getUserFromDB(email: string) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('User0001');
        }, 1000);
      })
    })(email as string);

    if (!user) { return fail(401, { incorrect: true, message: 'Unauthorized' }); }

    // A sample code of getting session id form DB
    const newSessionId = await (async function createSessionFromDB(user: string) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(`${user}'s session-id is here ...`);
        }, 1000);
      })
    })(user as string);

    if (!newSessionId) { return fail(403, { incorrect: true, message: 'Forbidden' }); }

    // TODO: set the session id to the cookie and so on here.
    // ...

    // Redirects (and errors) work exactly the same as in load:
    if (email === 'admin@test.com' && password === 'admin') {
      // redirect to /admin
      throw redirect(303, '/admin');
    }

    return { success: true, name: user };
  },

  // named form actions : register
  register: async ({ cookies, request }) => {
    // TODO: register the user
  },

  // named form actions : reset
  reset: async ({ cookies, request }) => {
    // nothing to do means reset all the form data, but only use with <form use:enhance> for not to refresh the page.
  }
};
