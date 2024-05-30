// Promise<Type> is a generic type. It means that the type of the value returned by the Promise will be Type.
export type PromiseSMD = {
  status: number;
  message: string;
  data: UserAuthDB | undefined | any;
};

// User login data for login test
export interface UserAuthDB {
  uuid: string;
  id: string;
  password: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

// User session data for Cookies and headers test
export interface UserCookies {
  name: string; // The name of the cookie.
  value: string; // The value of the cookie.
  options: {
    domain: string; // The domain for which the cookie is valid.
    path: string; // The path for which the cookie is valid.
    expires: string; // The date/time after which the cookie is invalid.
    httpOnly: boolean; // Indicates whether the cookie is inaccessible to JavaScript (to prevent cross-site scripting attacks).
    sameSite: string; // Prevents the browser from sending the cookie along with cross-site requests (to prevent cross-site request forgery attacks).
    secure: boolean; // Indicates whether the cookie should only be sent over a secure connection (HTTPS).
    maxAge: number; // The maximum age (in seconds) of the cookie.
  };
}

// User session data for Cookies and headers test
export interface UserSessionData {
  uuid: string;
  sessionid: string; // sessionid is the key of the user session data (Cookie name)
  token: string;
  cookies: UserCookies;
}

// API - Login test request data: POST-/api/login
export interface APILoginReq {
  id: string;
  password: string;
}

// API - Login test response data: POST-/api/login
export interface APILoginResp {
  uuid: string;
  id: string;
  name: string;
  email: string;
}

export type APILoginData = APILoginResp;
