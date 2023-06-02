<script lang="ts">
  /** @type {import('./$types').PageData} */
  export let data: NavLink;
  import { page } from '$app/stores';
  import { _$logger } from '$lib/utils/logger';

  _$logger.debug.TraceLayoutAndPage('/api/[slug]/+page.svelte', $page.route.id, data);

  import type { NavLink } from '$data/menu-nav-links';
  import API_Sample_01 from '$lib/api/sample-01.svelte';
  import API_Sample_02 from '$lib/api/sample-02.svelte';
</script>

<div class="container">
  {#if $page.params.slug === 'sample-01'}
    <API_Sample_01 />
  {:else if $page.params.slug === 'sample-02'}
    <API_Sample_02 />
  {:else if $page.params.slug === 'sample-03'}
    <h1>sample-03</h1>
  {:else}
    <h1>{$page.params.slug}</h1>
  {/if}
</div>

<slot />
<!-- The <slot /> tag is used to define a slot in a Svelte component. Slots allow you to pass content
into a component from its parent component, providing a way to create flexible and reusable component
compositions. -->
