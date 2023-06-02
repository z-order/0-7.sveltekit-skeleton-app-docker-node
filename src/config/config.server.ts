// 
// CAUTION: DO NOT INCLUDE THIS FILE IN THE .svelte FILE
//
// ***********************************
// **** Server configuration file ****
// ***********************************

// mysql or mariadb
export const __dbUser__ = 'user_id';
export const __dbPasswd__ = 'user_passwd';
export const __dbName__ = 'dbname';
export const __dbServer__ = 'maria';
export const __dbPort__ = 61433; // default port is 1433

// mongodb
export const __mongoDBUser__ = 'user_id';
export const __mongoDBPasswd__ = 'user_passwd';
export const __mongoDBName__ = 'dbname';
export const __mongoDBServer__ = 'mongodb';
export const __mongoDBPort__ = 57017; // default port is 27017

// refresh intervals
export const __dbMonitoringDataRefresh_Interval__ = 6000; // milliseconds
export const __dbUpdateRatesDataRefresh_Interval__ = (1000 * 60 * 15); // milliseconds, 15 minutes
export const __KEY_APISample_v1_0__ = 'ABCD1234';
