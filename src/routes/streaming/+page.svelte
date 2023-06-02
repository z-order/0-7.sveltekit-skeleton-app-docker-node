<script lang="ts">
  /** @type {import('./$types').PageData} */
  export let data: any;
  import { page } from '$app/stores';
  import { _$logger } from '$lib/utils/logger';
  import { ProgressRadial } from '@skeletonlabs/skeleton';

  _$logger.debug.TraceLayoutAndPage('/streaming/+page.svelte', $page.route.id, data);
</script>

<span>
  stream no.1: {data.streamed_1st}
</span>

<span>
  stream no.2: {data.streamed_2nd}
</span>

<span>
  stream no.3:
  {#await data.streamed_3rd.delayed_data}
    <ProgressRadial ... stroke={100} meter="stroke-teritiary-500" track="stroke-teritiary-500/30" />
  {:then delayedData}
    {delayedData}
  {:catch error}
    {error.message}
  {/await}
</span>

<style lang="postcss">
  span {
    @apply flex flex-col gap-8 justify-center items-start space-x-2 px-4;
  }
</style>
