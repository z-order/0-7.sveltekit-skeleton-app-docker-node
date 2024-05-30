<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function sayHello() {
    dispatch('message', {
      text: 'Hello!',
    });
  }
</script>

<button on:click={sayHello}> Click to say hello </button>

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
