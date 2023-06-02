// Global configuration file

/* examples for debug logging
export const __DEBUG_CLUSTER__ = false;
export const __DEBUG_MSSQL__ = false;
export const __DEBUG_MONGO__ = false;
export const __DEBUG_UPDATE__ = false;
export const __DEBUG_PMSG__ = false;
export const __DEBUG_HTTP__ = false;
export const __DEBUG_CORS__ = false;
export const __DEBUG_ARIA__ = false;
export const __TRACE_MSG__ = false;
*/

let devMode = false;
let httpsEnabled = false; // set to true when using HTTPS with the production server
let cookieHttpOnly = false;
let cookieSecure = false; // set to true when using HTTPS

// check if we are running in development mode for Vite
if (import.meta.env.MODE === 'development') {
  // This code will only be included in the development build
  if (process.env.NODE_ENV === 'development') {
    console.log('[config] Running in development mode with Vite');
    devMode = true;
  } else if (process.env.NODE_ENV === 'production') {
    console.log('[config] Running in production mode with Node.js');
    devMode = false; cookieHttpOnly = true; cookieSecure = httpsEnabled ? true : false;
  } else {
    console.log('[config] Environment not recognized');
  }
} else if (typeof window === 'undefined') { // only for server side
  // This code will only be included in the production build
  if (process.env.NODE_ENV === 'production') {
    console.log('[config] Running in production mode with Node');
    devMode = false; cookieHttpOnly = true; cookieSecure = httpsEnabled ? true : false;
  } else {
    console.log('[config] Environment not recognized');
  }
} else if (typeof window === 'object') { // only for client side, we are just warning the attacker not to waste time
  console.log('[secure] Checking attacker\'s environment and vulnerabilities ...');
}

// debug logging, and check if we are running in development mode for Vite and Node.js
export const __DEBUG__ = devMode;
export const __DEBUG_FETCH__ = __DEBUG__;
export const __DEBUG_LOAD_DATA__ALL_PARAMS__ = __DEBUG__ && false;
export const __DEBUG_API__ = __DEBUG__;

// logging options
export const __$logger_TracePromiseSMD__ = true;
export const __$logger_TraceAPIAction__ = true;
export const __$logger_TraceServerLoadData__ = true;
export const __$logger_TraceLayoutAndPage__ = true;

// Cookie settings
export const COOKIE_DOMAIN = "localhost"; // The domain for which the cookie is valid.
export const COOKIE_PATH = "/"; // The path for which the cookie is valid.
export const COOKIE_EXPIRE_TIME = 3600000; // 1 hour, The date/time after which the cookie is invalid.
export const COOKIE_HTTP_ONLY = cookieHttpOnly; // Indicates whether the cookie is inaccessible to JavaScript (to prevent cross-site scripting attacks, but testing in Safari will be false).
export const COOKIE_SAME_SITE = "Strict"; // Prevents the browser from sending the cookie along with cross-site requests (to prevent cross-site request forgery attacks).
export const COOKIE_SECURE = cookieSecure; // Indicates whether the cookie should only be sent over a secure connection (HTTPS).
export const COOKIE_MAX_AGE = 3600; // The maximum age (in seconds) of the cookie.
