<script lang="ts">
  /** @type {import('./$types').PageData} */
  export let data: any;
  import { page } from '$app/stores';
  import { _$logger } from '$lib/utils/logger';

  _$logger.debug.TraceLayoutAndPage('/sveltekit/[slug]/+page.svelte', $page.route.id, data);

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
    <API_Sample_Default {menuItem} /> <!-- <API_Sample_01 /> -->
  {:else if $page.params.slug === 'sample-02'}
    <API_Sample_Default {menuItem} /> <!-- <API_Sample_02 /> -->
  {:else if $page.params.slug === 'and ... anything matching with the slug'}
    <API_Sample_Default {menuItem} /> <!-- <Any-svelte-component-here /> -->
  {:else}
    <!-- In this case, if you try to click that is not on the :else if statement 
         then only one instance will be generated ... and more issues occurs ... 
         when we have a few menus of the same page that flow down here. 
         So, just run and see how to operate and get it yours -->
    <API_Sample_Default {menuItem} />
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
