<script lang="ts">
  export let data: any;
  import '../app.postcss';
  import { initializeStores, Toast, Modal, Drawer } from '@skeletonlabs/skeleton';
  import { page } from '$app/stores';
  import { _$logger } from '$lib/utils/logger';
  import HomeLayout from '../lib/HomeLayout.svelte';
  import LoginPage from '$lib/login/LoginPage.svelte';

  _$logger.debug.TraceLayoutAndPage('/+layout.svelte', $page.route.id, data);

  initializeStores();
</script>

<!-- for the use of Skeleton components: These components must be placed at the root of +layout.svelte -->
<Toast />
<Modal />
<Drawer />

{#if data.userSessionData === null || data.userSessionData === undefined}
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
