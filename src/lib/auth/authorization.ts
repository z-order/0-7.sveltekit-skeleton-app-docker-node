import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';
import { hashPassword, verifyPassword } from '$lib/utils/crypto'
import type { PromiseSMD, UserAuthDB, UserSessionData } from '$lib/types';
import { _$logger } from '$lib/utils/logger';
import * as _$c from '$config/config.global';

const UUID_NAMESPACE = uuidv4();
export let userAuthDB: UserAuthDB[] = await initializeUserAuthDB();

async function initializeUserAuthDB() {
  return [
    {
      uuid: uuidv5(uuidv4(), UUID_NAMESPACE),
      id: '1001',
      password: await hashPassword('1001'),
      name: 'John Doe',
      email: '1001@test.com',
      role: 'user',
      token: '',
    },
    {
      uuid: uuidv5(uuidv4(), UUID_NAMESPACE),
      id: '1002',
      password: await hashPassword('1002'),
      name: 'Jane Doe',
      email: '1002@test.com',
      role: 'user',
      token: '',
    },
  ];
}

export const userSessionData: UserSessionData[] = [];

/**
 * Get user authentication data by user id.
 * 
 * @param id The id of the user.
 * @param password  The password of the user.
 * @return The user authentication data.
 */
export async function getUserAuth(id: string, password: string): Promise<PromiseSMD | undefined> {

  let getUserAuth = new Promise<PromiseSMD>((resolve) => resolve({ status: 401, message: 'Unauthorized', data: undefined }));
  try {
    for (let i = 0; i < userAuthDB.length; i++) {
      let userAuth = userAuthDB[i];
      if (userAuth.id === id) {
        getUserAuth = verifyPassword(password, userAuth.password).then((result) => {
          if (result) {
            return new Promise<PromiseSMD>((resolve) => resolve({ status: 200, message: 'OK', data: userAuth }));
          } else {
            return new Promise<PromiseSMD>((resolve) => resolve({ status: 401, message: 'Unauthorized', data: undefined }));
          }
        });
        break;
      }
    }
  } catch (error: any) {
    getUserAuth = new Promise<PromiseSMD>((resolve) => resolve({ status: 500, message: 'Internal Server Error', data: undefined }));
  }

  return getUserAuth.then((result) => {
    _$logger.debug.TracePromiseSMD(`/lib/auth/authorization.ts->getUserAuth()`, result);
    return result;
  });
}

/**
 * Get user session data by session id.
 * 
 * @param sessionid The session id of the user.
 * @return The user session data.
 */
export async function getUserSession(sessionid: string): Promise<UserSessionData | undefined> {
  for (let i = 0; i < userSessionData.length; i++) {
    if (userSessionData[i].sessionid === sessionid) {
      return userSessionData[i];
    }
  }
  return undefined;
}

/**
 * Update user session data by session id.
 * 
 * @param sessionid The session id of the user.
 * @return The updated user session data.
 */
export async function createUserSession(uuidUser: string): Promise<UserSessionData> {
  let sessionId: string = generateSessionId(uuidUser);
  let userSessionData: UserSessionData = {
    uuid: uuidUser,
    sessionid: sessionId,
    token: generateToken(uuidUser),
    cookies: {
      name: 'x-session-id',
      value: sessionId,
      options: {
        domain: _$c.COOKIE_DOMAIN,
        path: _$c.COOKIE_PATH,
        expires: `${new Date(Date.now() + _$c.COOKIE_EXPIRE_TIME).toUTCString()}`,
        httpOnly: _$c.COOKIE_HTTP_ONLY,
        sameSite: _$c.COOKIE_SAME_SITE,
        secure: _$c.COOKIE_SECURE,
        maxAge: _$c.COOKIE_MAX_AGE,
      },
    }
  };

  return userSessionData;
}

/**
 * Update user session data by session id.
 * 
 * @param sessionid The session id of the user.
 * @return The updated user session data.
 */
export async function updateUserSession(sessionid: string, sessionData: UserSessionData): Promise<UserSessionData | undefined> {
  for (let i = 0; i < userSessionData.length; i++) {
    if (userSessionData[i].sessionid === sessionid) {
      userSessionData[i] = sessionData;
      return userSessionData[i];
    }
  }
  return undefined;
}

/**
 * Add new user session data.
 * 
 * @param sessionData The new session data.
 * @return The new user session data.
 */
export async function addUserSession(sessionData: UserSessionData): Promise<UserSessionData> {
  userSessionData.push(sessionData);
  return sessionData;
}

/**
 * Remove session by session id.
 * 
 * @param sessionData The session id to be removed.
 * @return An UserSessionData[] array containing the elements that were deleted.
 */
export async function removeUserSession(sessionid: string): Promise<UserSessionData[] | undefined> {
  for (let i = 0; i < userSessionData.length; i++) {
    if (userSessionData[i].sessionid === sessionid) {
      return userSessionData.splice(i, 1);
    }
  }
}

/**
 *  Generate a new Token id.
 * 
 * @param uuid The uuid of the user.
 * @return string The Token id.
 */
export function generateToken(uuid: string): string {
  return uuidv5(uuidv4(), uuid);
}

/**
 *  Generate a new session id.
 * 
 * @param uuid The uuid of the user.
 * @return string The session id.
 */
export function generateSessionId(uuid: string): string {
  return uuidv5(uuidv4(), uuid);
}

/**
 *  Generate a new cookie value.
 * 
 * @param userSessionData The user session data.
 * @return {string} The cookie value.
 */
export function createCookieValue(userSessionData: UserSessionData): string {
  let cookieValue = `${userSessionData.cookies.name}=${userSessionData.cookies.value}; `;
  cookieValue += `Domain=${userSessionData.cookies.options.domain}; `;
  cookieValue += `Path=${userSessionData.cookies.options.path}; `;
  cookieValue += `Expires=${userSessionData.cookies.options.expires}; `;
  cookieValue += `Max-Age=${userSessionData.cookies.options.maxAge}; `;
  cookieValue += `SameSite=${userSessionData.cookies.options.sameSite}; `;
  cookieValue += `${userSessionData.cookies.options.secure ? 'Secure; ' : ''}`;
  cookieValue += `${userSessionData.cookies.options.httpOnly ? 'HttpOnly; ' : ''}`;
  return cookieValue;
}

// In browswer, there are 3 types of storage:
//
// - Cookies : 
//
//   [Refs: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie, https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies] 
//
//   Name: The name of the cookie.
//   Value: The value of the cookie.
//   Domain: The domain for which the cookie is valid.
//   Path: The path for which the cookie is valid.
//   Expires: The date/time after which the cookie is invalid.
//   Max-Age: The maximum age (in seconds) of the cookie.
//   Secure: Indicates whether the cookie should only be sent over a secure connection (HTTPS).
//   HttpOnly: Indicates whether the cookie is inaccessible to JavaScript (to prevent cross-site scripting attacks).
//   SameSite: Prevents the browser from sending the cookie along with cross-site requests (to prevent cross-site request forgery attacks).
//
//   The details of SameSite attribute:
//   - The SameSite attribute controls how cookies are sent in cross-site requests.
//     It can have three possible values: "Strict", "Lax", or "None".
//
//   "Strict": 
//       When SameSite is set to "Strict", the cookie will only be sent in a first-party context.
//       This means the cookie will be sent only when the website making the request is the same site as the domain in the cookie.
//   "Lax": 
//       When SameSite is set to "Lax" (which is the default value for many browsers), the cookie will be sent in two scenarios:
//       First-party context: The cookie will be sent in requests originating from the same site as the domain in the cookie.
//       Safe cross-site context: The cookie will also be sent for top-level navigation (e.g., clicking on a link) from an external site to your site.
//   "None": 
//       When SameSite is set to "None", the cookie will be sent in all contexts, including both first-party and third-party contexts.
//       This is typically used when you need to allow cross-site sharing of cookies, for example, in authentication or embedding scenarios.
//
// - Local Storage : key/value
//   This is a web storage object that stores data with no expiration date.
//   The data will not be deleted when the browser is closed,
//   and will be available the next day, week, or year unless explicitly cleared.
//   Local storage is part of the Web Storage API, and it allows you to store key-value pairs in a web browser.
//   The data stored in local storage is isolated to the domain, so data saved by one webpage cannot be read or modified by another webpage.
//
// - Session Storage : key/value 
//   This is another type of web storage that is similar to local storage,
//   but it maintains a separate storage area for each given session.
//   The data stored in session storage gets cleared when the page's session ends—that is,
//   when the page is closed. Like local storage, session storage also allows you to store key-value pairs,
//   and the data is isolated to the domain.
//
// - Note on Local Storage and Session Storage : 
//   Local storage and session storage are both web storage objects that allow you to store data on the client-side.
//   And, you can read and write to Local Storage and Session Storage using the localStorage and sessionStorage objects, respectively.
//   However, because Svelte and SvelteKit can run on both the client and server, you should make sure to access these objects only in client-side code.
//   You can use Svelte's onMount function to run code after the component is first rendered and is guaranteed to be running in the browser:
// 
//   src/routes/example.svelte
//   <script>
//     import { onMount } from 'svelte';
//     onMount(() => {
//       // Write to local storage
//       localStorage.setItem('key', 'value');
//       // Read from local storage
//       const value = localStorage.getItem('key');
//       // Write to session storage
//       sessionStorage.setItem('key', 'value');
//       // Read from session storage
//       const value = sessionStorage.getItem('key');
//     });
//   </script>
//
