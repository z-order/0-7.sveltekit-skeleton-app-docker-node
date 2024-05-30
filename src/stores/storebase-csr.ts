import { StoreBase } from './storebase';
import type { APILoginResp } from '$lib/types/types';

/* This file is for the stores in using CSR */

const _storeAPILoginDataCSR = new StoreBase<APILoginResp>();

export { _storeAPILoginDataCSR };
