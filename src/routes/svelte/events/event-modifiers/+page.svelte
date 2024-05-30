<script>
  //
  // Refs: https://learn.svelte.dev/tutorial/event-modifiers
  //
</script>

<button on:click|once={() => alert('clicked')}> Click me </button>

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
