<script lang="ts">
  import { AppRail, AppRailTile } from '@skeletonlabs/skeleton';
  import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
  import IconRobot from '$assets/icon/robot.svelte';
  import { menuNavLinks, type MenuNavLinks } from '$data/menu-nav-links';
  import { writable, type Writable } from 'svelte/store';
  import { goto } from '$app/navigation';

  export let currentTile: number = 0;
  let storedTile: Writable<number> = writable(-1);
  let currentList: number = 999; // not selected
  let selectedMenuNavLinks: MenuNavLinks | undefined = undefined;

  $: if (currentTile !== $storedTile) {
    storedTile.set(currentTile);
    // get the menu set by the current tile
    switch (currentTile) {
      case 0: // Just Off
        selectedMenuNavLinks = undefined;
        break;
      case 1:
        selectedMenuNavLinks = menuNavLinks.filter((linkSet: any) => ['svelte'].includes(linkSet.id));
        break;
      case 2:
        selectedMenuNavLinks = menuNavLinks.filter((linkSet: any) => ['svelte+'].includes(linkSet.id));
        break;
      case 3:
        selectedMenuNavLinks = menuNavLinks.filter((linkSet: any) => ['sveltekit'].includes(linkSet.id));
        break;
      case 4:
        selectedMenuNavLinks = menuNavLinks.filter((linkSet: any) => ['menu-set-1'].includes(linkSet.id));
        break;
      case 5:
        selectedMenuNavLinks = menuNavLinks.filter((linkSet: any) => ['menu-set-...'].includes(linkSet.id));
        break;
      default:
        selectedMenuNavLinks = undefined;
        break;
    }
  }
</script>

<!--
<nav class="list-nav">
    <ul>
        <li><a href="/">Homepage</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/blog">Blog</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
</nav>
-->

<main id="main">
  <!-- Hidden below Tailwind's large breakpoint -->
  <div id="apprail" class="hidden">
    <AppRail id="apprail">
      <AppRailTile id="AppRailTile" bind:group={currentTile} name="tile-1" value={0}>
        <span class="grid justify-items-center"><IconRobot /></span>
        <span>Hidden</span>
      </AppRailTile>
      <AppRailTile id="AppRailTile" bind:group={currentTile} name="tile-2" value={1}>
        <span class="grid justify-items-center"><IconRobot /></span>
        <span>Svelte</span>
      </AppRailTile>
      <AppRailTile id="AppRailTile" bind:group={currentTile} name="tile-3" value={2}>
        <span class="grid justify-items-center"><IconRobot /></span>
        <span>Svelte+</span>
      </AppRailTile>
      <AppRailTile id="AppRailTile" bind:group={currentTile} name="tile-4" value={3}>
        <span class="grid justify-items-center"><IconRobot /></span>
        <span>SvelteKit</span>
      </AppRailTile>
      <AppRailTile id="AppRailTile" bind:group={currentTile} name="tile-5" value={4}>
        <span class="grid justify-items-center"><IconRobot /></span>
        <span>...</span>
      </AppRailTile>
      <AppRailTile id="AppRailTile" bind:group={currentTile} name="tile-6" value={5}>
        <span class="grid justify-items-center"><IconRobot /></span>
        <span>...</span>
      </AppRailTile>
    </AppRail>
  </div>

  {#if selectedMenuNavLinks !== undefined && selectedMenuNavLinks.length > 0}
    <ListBox rounded="rounded-md">
      {#each selectedMenuNavLinks as { id, title, list } (id)}
        {#each list as { id, href, label, keywords }, index (id)}
          <!-- <ListBoxItem> component of Skeleton has bugs double nested #each block, so just use inside one block -->
          <ListBoxItem
            bind:group={currentList}
            name={label}
            value={index}
            on:click={(e) => {
              goto(href);
            }}>{label}</ListBoxItem
          >
        {/each}
      {/each}
    </ListBox>
  {/if}
  <!-- </div> -->
</main>

<style lang="postcss">
  main {
    @apply h-[100%] flex flex-row items-start justify-start;
    padding: 0.1em 0.1em;
  }
  #apprail {
    @apply w-[80px] flex flex-col items-start justify-start;
  }
  /* sample css for reference
  #sample-css-1 {
      display: flex;
      width: 100%;
      justify-content: space-between;
      padding: 0.2em 1em;
  }
  #sample-css-2 {
    display: flex;
    flex-direction: row;
    min-width: 240px;
    width: 100%;
    justify-content: flex-start;
    padding: 0.2em 0.1em;
  }
  */
</style>
