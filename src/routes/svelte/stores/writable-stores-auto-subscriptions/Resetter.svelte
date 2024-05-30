<script>
  import { count } from './stores';

  function reset() {
    // reset the count
    count.set(0);
  }
</script>

<button on:click={reset}> reset </button>

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
