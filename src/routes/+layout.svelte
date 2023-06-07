<script lang="ts">
  /** @type {import('./$types').LayoutData} */
  export let data: any;
  import { page } from '$app/stores';
  import { _$logger } from '$lib/utils/logger';
  import HomeLayout from '../lib/HomeLayout.svelte';
  import LoginPage from '$lib/login/LoginPage.svelte';

  _$logger.debug.TraceLayoutAndPage('/+layout.svelte', $page.route.id, data);
</script>

{#if data.userSessionData == undefined}
  <LoginPage />
{:else if data.userSessionData}
  {#if $page.route.id === '/admin'}
    <h1>Hi! You are an admin!</h1>
    <slot />
  {:else}
    <HomeLayout>
      <slot />
    </HomeLayout>
  {/if}
{/if}
