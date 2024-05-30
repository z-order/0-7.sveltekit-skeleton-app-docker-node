<script>
  //
  // Refs: https://learn.svelte.dev/tutorial/numeric-inputs
  //
  let a = 1;
  let b = 2;
</script>

<label>
  <input class="number" type="number" bind:value={a} min="0" max="10" />
  <input class="range" type="range" bind:value={a} min="0" max="10" />
</label>

<label>
  <input class="number" type="number" bind:value={b} min="0" max="10" />
  <input class="range" type="range" bind:value={b} min="0" max="10" />
</label>

<p>{a} + {b} = {a + b}</p>

<style>
  :root {
    --input-bg: rgb(50, 63, 99);
    --input-bg-range: rgb(237, 239, 242);
    --input-border: rgb(35, 49, 49);
    --input-border-focus: cyan;
  }

  label {
    display: flex;
    align-items: center;
  }

  input.number {
    padding: 0.2em 0.2em 0.2em 0.6em; /* top | right | bottom | left */
    margin: 0.4em 0em 0.4em 0.2em; /* top | right | bottom | left */
    background: var(--input-bg);
    border: 1px solid var(--input-border);
    border-radius: 0.4em;
    width: 50px;
  }

  input.number:focus {
    border: 1px solid var(--input-border-focus);
  }

  input.range {
    margin: 0.4em 0em 0.4em 0.2em; /* top | right | bottom | left */
    width: 100px;
  }
</style>
