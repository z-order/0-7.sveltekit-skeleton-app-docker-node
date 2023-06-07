<script lang="ts">
  /** @type {import('./$types').PageData} */
  export let data: any;
  import { page } from '$app/stores';
  import { _$logger } from '$lib/utils/logger';
  import { CodeBlock } from '@skeletonlabs/skeleton';

  _$logger.debug.TraceLayoutAndPage('/sveltekit/fetch/[id]/+page.svelte', $page.route.id, data);
</script>

<main>
  <CodeBlock
    class="w-full"
    language="json"
    code={`

id : ${data.item.id}

$page : ${JSON.stringify($page, null, 4)}

data : ${JSON.stringify(data, null, 4)}

`}
  />
</main>

<style lang="postcss">
  main {
    @apply w-[100%] h-[100%] flex flex-col gap-8 justify-start items-start p-6;
  }
</style>
