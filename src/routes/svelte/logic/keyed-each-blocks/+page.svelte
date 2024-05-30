<script>
  //
  // Refs: https://learn.svelte.dev/tutorial/keyed-each-blocks
  //
  import Thing from './Thing.svelte';

  let things = [
    { id: 1, name: 'apple' },
    { id: 2, name: 'banana' },
    { id: 3, name: 'carrot' },
    { id: 4, name: 'doughnut' },
    { id: 5, name: 'egg' },
  ];

  function handleClick() {
    things = things.slice(1);
  }
</script>

<button on:click={handleClick}> Remove first thing </button>

{#each things as thing (thing.id)}
  <Thing name={thing.name} />
{/each}

<style>
  button {
    aspect-ratio: 1;
    border-radius: 10px;
    background: var(--color, rgb(158, 183, 236));
    height: 50px;
    width: 200px;
    color: black;
  }
  button:hover {
    background: var(--hover-color, rgb(175, 193, 232)); /* Change the background color on hover */
  }
</style>
