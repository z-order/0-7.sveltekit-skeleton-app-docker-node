<script lang="ts">
  // disable type checking for entire script for the use of let:item={row} and {row.xxx}
  // @ts-nocheck
  //
  // Refs: https://learn.svelte.dev/tutorial/slot-props
  //
  import FilterableList from './FilterableList.svelte';
  import { colors } from './colors';
</script>

<FilterableList data={colors} field="name" let:item={row}>
  <header slot="header" class="row">
    <span class="color" />
    <span class="name">name</span>
    <span class="hex">hex</span>
    <span class="rgb">rgb</span>
    <span class="hsl">hsl</span>
  </header>

  <div class="row">
    <span class="color" style="background-color: {row.hex}" />
    <span class="name">{row.name}</span>
    <span class="hex">{row.hex}</span>
    <span class="rgb">{row.rgb}</span>
    <span class="hsl">{row.hsl}</span>
  </div>
</FilterableList>

<style>
  /* define --bg-1, --bg-2 */
  :root {
    --bg-1: rgb(30, 35, 51);
    --bg-2: rgb(65, 80, 110);
  }
  .row {
    display: grid;
    align-items: center;
    grid-template-columns: 2em 4fr 3fr;
    gap: 1em;
    padding: 0.1em;
    background: var(--bg-1);
    border-radius: 0.2em;
  }

  header {
    font-weight: bold;
  }

  .row:not(header):hover {
    background: var(--bg-2);
  }

  .row:hover {
    background: var(--bg-2);
  }

  .color {
    aspect-ratio: 1;
    height: 100%;
    border-radius: 0.1em;
  }

  .rgb,
  .hsl {
    display: none;
  }

  @media (min-width: 40rem) {
    .row {
      grid-template-columns: 2em 4fr 3fr 3fr;
    }

    .rgb {
      display: block;
    }
  }

  @media (min-width: 60rem) {
    .row {
      grid-template-columns: 2em 4fr 3fr 3fr 3fr;
    }

    .hsl {
      display: block;
    }
  }
</style>
