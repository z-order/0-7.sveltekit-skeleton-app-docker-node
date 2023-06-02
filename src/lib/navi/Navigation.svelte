<script lang="ts">
  import { AppRail, AppRailTile } from '@skeletonlabs/skeleton';
  import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
  import { goto } from '$app/navigation';
  import { menuNavLinks, type MenuNavLinks } from '$data/menu-nav-links';
  import { writable, type Writable } from 'svelte/store';
  import IconRobot from '$assets/icon/robot.svelte';

  let currentTile: number = 0;
  const storeValue: Writable<number> = writable(0);
  let filteredMenuNavLinks: MenuNavLinks;
  $: {
    filteredMenuNavLinks = menuNavLinks.filter((linkSet: any) => ['api'].includes(linkSet.id));
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

<main>
  <!-- Hidden below Tailwind's large breakpoint -->
  <div id="div-sidebar-left" class="hidden lg:block">
    <AppRail>
      <AppRailTile id="AppRailTile" bind:group={currentTile} name="tile-1" value={'/page1'}>
        <span class="grid justify-items-center"><IconRobot /></span>
        <span>APIs v1</span>
      </AppRailTile>
      <AppRailTile id="AppRailTile" bind:group={currentTile} name="tile-2" value={'/page2'}>
        <span class="grid justify-items-center"><IconRobot /></span>
        <span>APIs v2</span>
      </AppRailTile>
      <AppRailTile id="AppRailTile" bind:group={currentTile} name="tile-3" value={'/page3'}>
        <span class="grid justify-items-center"><IconRobot /></span>
        <span>APIs v3</span>
      </AppRailTile>
      <AppRailTile id="AppRailTile" bind:group={currentTile} name="tile-4" value={'/page4'}>
        <span class="grid justify-items-center"><IconRobot /></span>
        <span>APIs v4</span>
      </AppRailTile>
      <AppRailTile id="AppRailTile" bind:group={currentTile} name="tile-5" value={'/page5'}>
        <span class="grid justify-items-center"><IconRobot /></span>
        <span>APIs v5</span>
      </AppRailTile>
      <AppRailTile id="AppRailTile" bind:group={currentTile} name="tile-6" value={'/page6'}>
        <span class="grid justify-items-center"><IconRobot /></span>
        <span>APIs v6</span>
      </AppRailTile>
    </AppRail>

    <ListBox rounded="rounded-md">
      {#each filteredMenuNavLinks as { id, title, list }}
        {#each list as { href, label, keywords }}
          <ListBoxItem
            bind:group={id}
            name={label}
            value={label}
            on:click={(e) => {
              goto(href);
            }}>{label}</ListBoxItem
          >
        {/each}
      {/each}
    </ListBox>
  </div>
</main>

<style lang="postcss">
  /*
      span { display: flex; }
      #top-menu-bar {
          display: flex;
          width: 100%;
          justify-content: space-between;
          padding: 0.2em 1em;
      }
    */
  #div-sidebar-left {
    display: flex;
    min-width: 240px;
    width: 100%;
    justify-content: flex-start;
    padding: 0.2em 0.1em;
  }
</style>
