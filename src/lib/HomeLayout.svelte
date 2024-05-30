<script lang="ts">
  import { page } from '$app/stores';
  let data: any = $page.data;
  import { _$logger } from '$lib/utils/logger';

  _$logger.debug.TraceLayoutAndPage('/lib/HomeLayout.svelte', $page.route.id, data);

  // Your selected Skeleton theme:
  // import '@skeletonlabs/skeleton/themes/theme-skeleton.css';

  // This contains the bulk of Skeletons required styles:
  // NOTE: this will be renamed skeleton.css in the v2.x release.
  // import '@skeletonlabs/skeleton/styles/skeleton.css';

  // Finally, your application's global stylesheet (sometimes labeled 'app.css')
  // import '../app.postcss';

  // App Shell: Responsive shell for controlling application layout.
  import { LightSwitch } from '@skeletonlabs/skeleton';
  import { AppShell } from '@skeletonlabs/skeleton';
  import { AppBar } from '@skeletonlabs/skeleton';
  import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
  import Navigation from '$lib/navi/Navigation.svelte';
  import ButtonHamburgerMenu from '$lib/componets/ButtonHamburgerMenu.svelte';
  import { goto, invalidateAll } from '$app/navigation';

  const drawerStore = getDrawerStore();

  function drawerOpenLeft(): void {
    drawerStore.open({ id: 'drawer-left', position: 'left', width: 'w-[280px] md:w-[460px]' });
  }

  function drawerOpenRight(): void {
    drawerStore.open({ id: 'drawer-right', position: 'right', width: 'w-[280px] md:w-[360px]' });
  }

  function drawerClose(): void {
    drawerStore.close();
  }

  function moveToHome(): void {
    document.location.href = '/';
  }
</script>

<Drawer>
  {#if $drawerStore.id === 'drawer-left'}
    <h2 class="p-4">Navigation</h2>
    <hr />
    <!-- {1} : sveltekit menu -->
    <Navigation currentTile={1} />
  {:else if $drawerStore.id === 'drawer-right'}
    <h2 class="p-4">Drawer Right</h2>
    <hr />
    <p>Drawer Right Content</p>
  {:else}
    <p>Fallback Content</p>
  {/if}
</Drawer>
<!-- (AppShell) --->

<AppShell slotSidebarLeft="bg-surface-500/10 w-100">
  <svelte:fragment slot="header">
    <AppBar>
      <svelte:fragment slot="lead">
        <div class="flex items-center">
          <ButtonHamburgerMenu on:click={drawerOpenLeft} />
          <strong class="text-xl uppercase">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div on:click={moveToHome}>MyApp</div>
          </strong> &nbsp; &nbsp; API Sandbox
        </div>
      </svelte:fragment>
      <svelte:fragment slot="trail">
        <LightSwitch />
        <ButtonHamburgerMenu on:click={drawerOpenRight} />
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>

  <svelte:fragment slot="sidebarLeft"><Navigation /></svelte:fragment>
  <!-- Router Slot -->
  <slot />
  <!-- ---- / ---- -->
  <!-- (pageFooter) -->
  <!-- (footer) -->
</AppShell>
