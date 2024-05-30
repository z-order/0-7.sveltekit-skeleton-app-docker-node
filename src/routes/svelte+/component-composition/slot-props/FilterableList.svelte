<script lang="ts">
  export let data;
  export let field;

  let search = '';

  $: regex = search ? new RegExp(search, 'i') : null;
  $: matches = (item: any) => (regex ? regex.test(item[field]) : true);
</script>

<div class="list">
  <label>
    Filter: <input class="input" bind:value={search} />
  </label>

  <div class="header">
    <slot name="header" />
  </div>

  <div class="content">
    {#each data.filter(matches) as item}
      <slot {item} /> <!-- Same as <slot item={item} /> This exposes the data to the slotted content with the let: directive in the parent component like as let:item={row} -->
    {/each}
  </div>
</div>

<style>
  /* define --bg-1, --bg-2 */
  :root {
    --input-border: rgb(35, 49, 49);
    --input-border-focus: cyan;
    --bg-1: rgb(30, 35, 51);
    --bg-2: rgb(65, 80, 110);
  }

  .list {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .input {
    padding: 0.2em 0.2em 0.2em 0.6em; /* top | right | bottom | left */
    margin: 0.4em 0em 0.4em 0.2em; /* top | right | bottom | left */
    border: 1px solid var(--input-border);
    border-radius: 0.4em;
    width: 240px;
  }

  .input:focus {
    border: 1px solid var(--input-border-focus);
  }

  .header {
    border-top: 1px solid var(--bg-2);
    padding: 0.2em 0;
  }

  .content {
    flex: 1;
    overflow: auto;
    padding-top: 0.5em;
    border-top: 1px solid var(--bg-2);
  }
</style>
