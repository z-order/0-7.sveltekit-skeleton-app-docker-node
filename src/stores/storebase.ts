import type { Subscriber, Invalidator, Unsubscriber } from 'svelte/store';
import { writable } from 'svelte/store';

/**
 * @description Base store class for all stores
 * @example
 *
 * cosnt _storeAPILoginResp = new StoreBase<APILoginResp>();
 *
 * const response = await fetch('/api/login', {
 *   method: 'POST',
 *   headers: {
 *     'content-type': 'application/json',
 *   },
 *   body: JSON.stringify(apiReqData),
 * });
 *
 * switch (response.status) {
 *   case 200:
 *     _storeAPILoginResp.set(await response.json());
 *     break;
 * }
 *
 * ...
 *
 * // subscribe to store, bind to UI
 * _storeAPILoginResp.subscribe((v) => {
 *   myUIVars = v;
 * });
 *
 */

export class StoreBase<T> {
  private _enabled = false;
  private checkEnabled: (v: T) => void = (v: T) => {
    if (typeof v === 'boolean') {
      this._enabled = true;
    } else if (typeof v === 'number') {
      (v !== null || v !== undefined) && (this._enabled = true);
    } else if (typeof v === 'string') {
      (v !== null || v !== undefined) && (this._enabled = true);
    } else if (typeof v === 'object') {
      Object.keys(v as object).length > 0 ? (this._enabled = true) : (this._enabled = false);
      (v !== null || v !== undefined) && (this._enabled = true);
    } else if (typeof v === 'symbol') {
      (v !== null || v !== undefined) && (this._enabled = true);
    } else if (typeof v === 'undefined') {
      this._enabled = false;
    } else {
      this._enabled = false;
    }
  };
  public enabled: () => boolean = () => this._enabled;
  public subscribe: (this: void, run: Subscriber<T>, invalidate?: Invalidator<T> | undefined) => Unsubscriber;
  public set: (value: T) => void;
  public update: (value: T) => void;
  public reset: () => void;
  constructor() {
    const { subscribe, set, update } = writable({} as T);
    this.subscribe = subscribe;
    this.set = (v: T) => {
      set(v);
      this.checkEnabled(v);
    };
    this.update = (v: T) => {
      update((_v) => v);
      this.checkEnabled(v);
    };
    this.reset = () => {
      set({} as T);
      this._enabled = false;
    };
  }
}
