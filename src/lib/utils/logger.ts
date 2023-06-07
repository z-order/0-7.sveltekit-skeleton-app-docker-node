import * as _$c from '$config/config.global';
import type { PromiseSMD } from '$lib/types/types';

enum LogLevel {
  _DEBUG = 1,
  _TRACE = 2,
  _INFO = 3,
  _WARN = 4,
  _ERROR = 5,
}

export type APIAction = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'CONNECT' | 'TRACE';

class SecureLogger {
  // Constructor
  constructor(level: 'debug' | 'trace' | 'info' | 'warn' | 'error') { }
  public TracePromiseSMD(currentRoutePath: string, data: PromiseSMD | undefined) { }
  public TraceAPIAction(currentRoutePath: string, apiActoin: APIAction, arrowActoin: 'C->S' | 'C<-S' | 'C--S', ...data: any) { }
  public TraceServerLoadData(currentFilePath: string, currentRoutePath: string, loadData: any, ...moreData: any) { }
  public TraceFormActions(currentFilePath: string, formActoin: string, data: any, ...moreData: any) { }
  public TraceLayoutAndPage(currentFilePath: string, currentRoutePath: string | null, data: any, ...moreData: any) { }
}

class Logger extends SecureLogger {

  // Fields (properties)
  private _level: LogLevel = LogLevel._DEBUG;
  private _devMode: boolean = import.meta.env.MODE === 'development'; // true if we are running in development mode
  private _productMode: boolean = import.meta.env.MODE === 'production'; // true if we are running in production mode
  private _isClientSide: boolean = typeof window === 'object'; // true if we are running in client side which is browser
  private _isServerSide: boolean = typeof window === 'undefined'; // true if we are running in server side which is Node.js
  private _termCtrlRed = '[91m';
  private _termCtrlGreen = '[92m';
  private _termCtrlDarkBlue = '[34m';
  private _termCtrlYelow = '[93m';
  private _termCtrlOrange = '[33m';
  private _termCtrlCyan = '[96m';
  private _termCtrlLightBlue = '[94m';
  private _termCtrlReset = '[39m';

  // Constructor
  constructor(private level: 'debug' | 'trace' | 'info' | 'warn' | 'error') {
    super(level);
    switch (level) {
      case 'debug': this._level = LogLevel._DEBUG; break;
      case 'trace': this._level = LogLevel._TRACE; break;
      case 'info': this._level = LogLevel._INFO; break;
      case 'warn': this._level = LogLevel._WARN; break;
      case 'error': this._level = LogLevel._ERROR; break;
      default: this._level = LogLevel._DEBUG; break;
    }
  }

  /**
   * Check whether we can log or not.
   * Ignore if we are running in production mode to the client side.
   * If we are running in production mode to the server side, logs only info/warn/error level.
   */
  private isPossibleToLog(): boolean {
    let doLog = false;
    // log data if we are running in development mode and following code will be removed in production mode
    if (this._devMode) { // running in development mode
      doLog = true;
    } else if (this._isServerSide && this._level >= LogLevel._INFO) { // running in production mode && server side with info/warn/error level
      doLog = true;
    } else { // running in production mode && client side
      doLog = false;
    }
    return doLog;
  }

  /**
   * Display log with the given label, title, message and data.
   * In case of server side, the termial color will be applied along with the label and title.
   * If log level is error or warn, the terminal color will be applied to red or yellow.
   */
  private displayLog(label: string, title: string, message: string, ...data: any) {

    // This code will only be included in the development build or server side production build
    if (this._isServerSide || this._isClientSide && process.env.NODE_ENV === 'development') {
      if (this.isPossibleToLog()) {
        let titleWrapper, labelWrapper, messageWrapper;
        if (this._isClientSide) { // client side, window is defined in the browser
          labelWrapper = label;
          titleWrapper = title;
          messageWrapper = message;
        } else { // server side, window is undefined in the Node.js
          switch (this._level) {
            case LogLevel._WARN:
              labelWrapper = `${this._termCtrlYelow}[${label}]`;
              titleWrapper = `${this._termCtrlOrange}${title}`;
              messageWrapper = `${this._termCtrlOrange}${message}`;
              break;
            case LogLevel._ERROR:
              labelWrapper = `${this._termCtrlRed}[${label}]`;
              titleWrapper = `${this._termCtrlRed}${title}`;
              messageWrapper = `${this._termCtrlRed}${message}`;
              break;
            case LogLevel._DEBUG:
            case LogLevel._TRACE:
            case LogLevel._INFO:
            default:
              labelWrapper = `${this._termCtrlLightBlue}[${label}]${this._termCtrlReset}`;
              titleWrapper = `${this._termCtrlCyan}${title}${this._termCtrlReset}`;
              messageWrapper = `${this._termCtrlDarkBlue}${message}${this._termCtrlReset}`;
              break;
          }
        }
        let logger;
        switch (this._level) {
          case LogLevel._DEBUG: logger = console.debug; break;
          case LogLevel._TRACE: logger = console.trace; break;
          case LogLevel._INFO: logger = console.info; break;
          case LogLevel._WARN: logger = console.warn; break;
          case LogLevel._ERROR: logger = console.error; break;
          default: logger = console.debug; break;
        }
        logger(labelWrapper, titleWrapper, messageWrapper, ...data);
      }
    }
  }

  /**
   * Logs Promise<PromiseSMD> to the console if we are running in development mode (and _$c.__$logger_TracePromiseSMD__ is true)
   * Ignore if we are running in production mode to the client side.
   * If we are running in production mode to the server side, logs only info/warn/error level.
   *
   * @param currentRoutePath The current path of the route.
   * @param data 'Promise<PromiseSMD>' type of data
   * @description SMD stands for { status: ..., message: ..., data: ... }
   * @return Nothing is returned.
   */
  public TracePromiseSMD(currentRoutePath: string, data: PromiseSMD | undefined) {
    _$c.__$logger_TracePromiseSMD__ && this.displayLog('SMD', currentRoutePath, '=> data', data);
  }

  /**
   * Logs +server.ts data to the console if we are running in development mode (and _$c.__$logger_TraceAPIAction__ is true)
   * Ignore if we are running in production mode to the client side.
   * If we are running in production mode to the server side, logs only info/warn/error level.
   *
   * @param currentRoutePath The current path of the route.
   * @param data The data from client or return data to the client.
   * @return Nothing is returned.
   */
  public TraceAPIAction(currentRoutePath: string, apiActoin: APIAction, arrowActoin: 'C->S' | 'C<-S' | 'C--S', ...data: any) {
    if (data == null || data == undefined) {
      _$c.__$logger_TraceAPIAction__ && this.displayLog(`API ${arrowActoin}`, `${currentRoutePath} [${apiActoin}]`, '');
    } else {
      _$c.__$logger_TraceAPIAction__ && this.displayLog(`API ${arrowActoin}`, `${currentRoutePath} [${apiActoin}]`, '=> data', ...data);
    }
  }

  /**
   * Logs +layout.server.ts/+page.server.ts data to the console if we are running in development mode (and _$c.__$logger_TraceServerLoadData__ is true)
   * Ignore if we are running in production mode to the client side.
   * If we are running in production mode to the server side, logs only info/warn/error level.
   *
   * @param currentRoutePath The current path of the route.
   * @param loadData The data returned from the load function.
   * @return Nothing is returned.
   */
  public TraceServerLoadData(currentFilePath: string, currentRoutePath: string, loadData: any, ...moreData: any) {
    if (loadData == null || loadData == undefined) {
      _$c.__$logger_TraceServerLoadData__ && this.displayLog('LOAD', currentFilePath, `=> route ${currentRoutePath}`);
    } else {
      _$c.__$logger_TraceServerLoadData__ && this.displayLog('LOAD', currentFilePath, `=> route ${currentRoutePath} => data`, loadData, ...moreData);
    }
  }

  /**
   * Logs +layout.server.ts/+page.server.ts data to the console if we are running in development mode (and _$c.__$logger_TraceServerLoadData__ is true)
   * Ignore if we are running in production mode to the client side.
   * If we are running in production mode to the server side, logs only info/warn/error level.
   *
   * @param currentRoutePath The current path of the route.
   * @param loadData The data returned from the load function.
   * @return Nothing is returned.
   */
  public TraceFormActions(currentFilePath: string, formActoin: string, data: any, ...moreData: any) {
    if (data == null || data == undefined) {
      _$c.__$logger_TraceServerLoadData__ && this.displayLog('FORM', currentFilePath, `=> ${formActoin} action`);
    } else {
      _$c.__$logger_TraceServerLoadData__ && this.displayLog('FORM', currentFilePath, `=> ${formActoin} action => formData`, data, ...moreData);
    }
  }

  /**
   * Logs +layout.svelte/+page.svelte data to the console if we are running in development mode (and _$c.__$logger_TraceLayoutAndPage__ is true)
   * Ignore if we are running in production mode to the client side.
   * If we are running in production mode to the server side, logs only info/warn/error level.
   *
   * @param currentRoutePath The current path of the route.
   * @param data 'export let data: any' in which exists on the all header part of +layout.svelte or +page.svelte.
   * @return Nothing is returned.
   */
  public TraceLayoutAndPage(currentFilePath: string, currentRoutePath: string | null, data: any, ...moreData: any) {
    _$c.__$logger_TraceLayoutAndPage__ && this.displayLog('SVELTE', currentFilePath, `=> route ${currentRoutePath} => data`, data, ...moreData);
  }

} // end of class Logger

let secureDebug = new SecureLogger('debug');
let secureTrace = new SecureLogger('trace');
let secureInfo = new SecureLogger('info');
let secureWarn = new SecureLogger('warn');
let secureError = new SecureLogger('error');

// check if we are running in development mode for Vite
if (import.meta.env.MODE === 'development') {
  // This code will only be included in the development build
  if (process.env.NODE_ENV === 'development') {
    secureDebug = new Logger('debug');
    secureTrace = new Logger('trace');
    secureInfo = new Logger('info');
    secureWarn = new Logger('warn');
    secureError = new Logger('error');
  }
  // check if we are running in production mode for Node.js
} else if (process.env.NODE_ENV === 'production') {
  secureInfo = new Logger('info');
  secureWarn = new Logger('warn');
  secureError = new Logger('error');
}

export namespace _$logger {
  export let debug = secureDebug;
  export let trace = secureTrace;
  export let info = secureInfo;
  export let warn = secureWarn;
  export let error = secureError;
} // end of namespace _$logger
