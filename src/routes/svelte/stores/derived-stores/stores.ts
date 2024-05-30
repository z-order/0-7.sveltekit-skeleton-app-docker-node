import { readable, derived } from 'svelte/store';

export const time = readable(new Date(), function start(set) {
  const interval = setInterval(() => {
    set(new Date());
  }, 1000);

  return function stop() {
    clearInterval(interval);
  };
});

const start = new Date();

// You can create a store whose value is based on the value of one or more other stores with derived.
// Building on our previous example, we can create a store that derives the time the page has been open:
// '$' is a convention to indicate that the variable is a store and it means autuomatic subscription.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const elapsed = derived(time, ($time) => Math.round(($time - start) / 1000));

// It's possible to derive a store from multiple input stores,
// and to explicitly set a value instead of returning it (which is useful for deriving values asynchronously).
// Consult the API reference for more information. Link: https://svelte.dev/docs/svelte-store#derived
