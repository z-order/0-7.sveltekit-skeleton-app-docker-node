<script lang="ts">
  /** @type {import('./$types').PageData} */
  export let data: any;
  import { page } from '$app/stores';
  import { _$logger } from '$lib/utils/logger';
  import { ProgressRadial } from '@skeletonlabs/skeleton';

  _$logger.debug.TraceLayoutAndPage('/streaming/+page.svelte', $page.route.id, data);
  let value: number = 100;
</script>

<main>
  <div>
    <span> stream no.1: {data.streamed_1st} </span>
    <span> stream no.2: {data.streamed_2nd} </span>
    <span>
      stream no.3:
      {#await data.streamed_3rd.delayed_data}
        <ProgressRadial stroke={100} meter="stroke-primary-500" track="stroke-primary-500/30" />
      {:then delayedData}
        <ProgressRadial
          {value}
          stroke={100}
          meter="stroke-primary-500"
          track="stroke-primary-500/30">{delayedData}</ProgressRadial
        >
      {:catch error}
        {error.message}
      {/await}
    </span>
  </div>
</main>

<style lang="postcss">
  /* Warning of that: Unused CSS selector "span > :not([hidden]) ~ :not([hidden])"svelte(css-unused-selector)
     You can resolve using as following codes. and refer to docs : https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity 

     span {
       @apply flex flex-col gap-8 justify-center items-start space-x-2 px-4;
     }

     Above codes are not working. because it is not specific with warning message:
     Unused CSS selector "span > :not([hidden]) ~ :not([hidden])"svelte(css-unused-selector)

     I think that it is not good to use the following codes. because it is not specific for the general case of css tag.
     But, it is not a problem in this case, because it works well and it is specific with matches-any pseudo-class of this file in the svelte.

     :is(span) {
       @apply flex flex-col gap-8 justify-center items-start space-x-2 px-4;
     }

     So, I will use the following codes to avoid annoying warnning message.
  */
  :is(main) {
    @apply w-[100%] h-[50%] flex flex-col justify-center items-center;
  }
  :is(div) {
    @apply flex flex-row justify-center items-center;
  }
  :is(span) {
    @apply flex flex-col justify-center items-center gap-8 px-4;
  }
</style>
