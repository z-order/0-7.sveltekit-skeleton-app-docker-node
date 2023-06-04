<script lang="ts">
  /** @type {import('./$types').PageData} */
  export let data: any;
  import { page } from '$app/stores';
  import { _$logger } from '$lib/utils/logger';
  import { invalidate, invalidateAll } from '$app/navigation';
  import { CodeBlock } from '@skeletonlabs/skeleton';

  _$logger.debug.TraceLayoutAndPage('/invalidate/+page.svelte', $page.route.id, data);

  // Initial Sequence No. 1 and added four random numbers to the array by clicking the button.
  // So the array should have 5 elements, but randomly it will have 4 or 5 elements that we are not expecting.
  function rerunLoadFunction() {
    // any of these will cause the `load` function to re-run
    invalidate('app:random-number');
    invalidate('/api/random-number');
    invalidate((url) => url.href.includes('random-number'));
    invalidateAll();
  }
  // To resolve the above issue, we can use async/await to invalidate the cache like the below codes.
  // Now, you can see that the array always has five elements at first click, and then each time you click the button,
  // the array will be added to four random numbers.
  async function rerunLoadFunctionAsync() {
    // any of these will cause the `load` function to re-run
    await invalidate('app:random-number');
    await invalidate('/api/random-number');
    await invalidate((url) => url.href.includes('random-number'));
    await invalidateAll();
  }
</script>

<main>
  <span>
    <button on:click={rerunLoadFunction}>Rerun load function </button>
    <button on:click={rerunLoadFunctionAsync}>Rerun load function (Async/Await)</button>
  </span>
  <CodeBlock
    class="w-full"
    language="json"
    code={`

data : ${JSON.stringify(data._randomNumberArray, null, 4)}

`}
  />
</main>

<style lang="postcss">
  main {
    @apply w-[100%] h-[100%] flex flex-col gap-8 justify-start items-start p-6;
  }
  span {
    @apply flex flex-row gap-4 justify-start items-center;
  }
</style>
