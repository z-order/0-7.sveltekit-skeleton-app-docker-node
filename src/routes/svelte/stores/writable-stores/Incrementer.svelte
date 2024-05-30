<script>
  import { count } from './stores';

  function increment() {
    // increment the count
    count.update((n) => n + 1);
  }
</script>

<button on:click={increment}> + </button>

<style>
  :root {
    --button-bg: rgb(158, 183, 236);
    --button-hover-color: rgb(175, 193, 232);
  }

  button {
    aspect-ratio: 1;
    border-radius: 10px;
    background: var(--button-bg, rgb(158, 183, 236));
    height: 30px;
    width: 50px;
    color: black;
  }

  button:hover {
    background: var(--button-hover-color, rgb(175, 193, 232));
  }
</style>
