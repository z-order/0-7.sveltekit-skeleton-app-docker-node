<script>
  import { name, greeting } from './stores';
</script>

<h1>{$greeting}</h1>
<input bind:value={$name} />

<button on:click={() => ($name += '!')}> Add exclamation mark! </button>

<style>
  :root {
    --input-bg: rgb(50, 63, 99);
    --input-border: rgb(35, 49, 49);
    --input-border-focus: cyan;
    --button-bg: rgb(158, 183, 236);
    --button-hover-color: rgb(175, 193, 232);
  }

  input {
    padding: 0.2em 0.2em 0.2em 0.6em; /* top | right | bottom | left */
    margin: 0.4em 0em 0.4em 0.2em; /* top | right | bottom | left */
    background: var(--input-bg);
    border: 1px solid var(--input-border);
    border-radius: 0.4em;
    width: 240px;
  }

  input:focus {
    border: 1px solid var(--input-border-focus);
  }

  button {
    aspect-ratio: 1;
    border-radius: 10px;
    background: var(--button-bg, rgb(158, 183, 236));
    height: 30px;
    width: 240px;
    color: black;
  }

  button:hover {
    background: var(--button-hover-color, rgb(175, 193, 232));
  }
</style>
