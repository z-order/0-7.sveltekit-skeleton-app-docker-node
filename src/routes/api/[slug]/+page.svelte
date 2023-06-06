<script lang="ts">
  /** @type {import('./$types').PageData} */
  export let data: any;
  import { page } from '$app/stores';
  import { _$logger } from '$lib/utils/logger';

  _$logger.debug.TraceLayoutAndPage('/api/[slug]/+page.svelte', $page.route.id, data);

  import type { NavLink } from '$data/menu-nav-links';
  import API_Sample_01 from '$lib/api/sample-01.svelte';
  import API_Sample_02 from '$lib/api/sample-02.svelte';
  import API_Sample_Default from '$lib/api/sample-default.svelte';

  // If you want to change the page by the click action of the menu, use $: indicator.
  $: menuItem = data.menuItem as NavLink;
</script>

<main>
  <!-- You can switch page here using $page.params.slug -->
  {#if $page.params.slug === 'sample-01'}
    <API_Sample_Default bind:menuItem /> <!-- <API_Sample_01 /> -->
  {:else if $page.params.slug === 'sample-02'}
    <API_Sample_Default bind:menuItem /> <!-- <API_Sample_02 /> -->
  {:else if $page.params.slug === 'sample-03'}
    <API_Sample_Default bind:menuItem /> <!-- <API_Sample_03 /> -->
  {:else if $page.params.slug === 'and ... anything matching with the slug'}
    <API_Sample_Default bind:menuItem /> <!-- <Any-svelte-component-here /> -->
  {:else}
    <API_Sample_Default bind:menuItem />
  {/if}
</main>

<slot />

<!-- The <slot /> tag is used to define a slot in a Svelte component. Slots allow you to pass content
into a component from its parent component, providing a way to create flexible and reusable component
compositions. -->

<style lang="postcss">
  main {
    @apply w-[100%] h-[100%];
  }
</style>
