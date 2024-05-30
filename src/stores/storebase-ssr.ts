import { StoreBase } from './storebase';
import type { APILoginData } from '$lib/types/types';

/* This file is for the stores in using SSR */

const _storeAPILoginDataSSR = new StoreBase<APILoginData>();

export { _storeAPILoginDataSSR };
