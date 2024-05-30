<script lang="ts">
  //
  // Refs: https://learn.svelte.dev/tutorial/await-blocks
  //
  import { sleep } from './async-sleep';

  let promise: any = sleep(2000);

  function handleClick() {
    promise = sleep(2000);
  }
</script>

<button on:click={handleClick}> await for the promise function call </button>

{#await promise}
  <p>...waiting</p>
{:then number}
  <p>The awaiting time is {number} ms</p>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

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
