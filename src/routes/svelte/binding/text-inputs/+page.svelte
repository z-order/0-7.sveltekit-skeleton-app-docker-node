<script>
  //
  // Refs: https://learn.svelte.dev/tutorial/text-inputs
  //
  let name = 'world';
</script>

<input bind:value={name} />

<h1>Hello {name}!</h1>

<style>
  :root {
    --input-bg: rgb(50, 63, 99);
    --input-border: rgb(35, 49, 49);
    --input-border-focus: cyan;
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
</style>
