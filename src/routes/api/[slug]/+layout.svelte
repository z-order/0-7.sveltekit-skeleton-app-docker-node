<script lang="ts">
  /** @type {import('./$types').LayoutData} */
  export let data: any;
  import { page } from '$app/stores';
  import { _$logger } from '$lib/utils/logger';

  _$logger.debug.TraceLayoutAndPage('/api/[slug]/+layout.svelte', $page.route.id, data);

  // A parent layout might need to access page data or data from a child layout.
  // For example, the root layout might want to access a title property returned from a load function in +page.js or +page.server.js.
  // This can be done with $page.data:
  $: titleLabel = `API Action Page >> ${$page.data.menuItem.label}`;
</script>

<main>
  <h1>
    <span contenteditable="true" bind:textContent={titleLabel}>{titleLabel}</span>
  </h1>
  <hr />
  <slot />
</main>

<style lang="postcss">
  main {
    @apply w-[100%] h-[100%] container p-10 space-y-4;
  }
</style>
