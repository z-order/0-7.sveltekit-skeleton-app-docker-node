<script>
  //
  // Refs: https://learn.svelte.dev/tutorial/checkbox-inputs
  //
  let yes = false;
</script>

<label>
  <input class="checkbox" type="checkbox" bind:checked={yes} />
  Yes! Send me regular email spam
</label>

{#if yes}
  <p>Thank you. We will bombard your inbox and sell your personal details.</p>
{:else}
  <p>You must opt in to continue. If you're not paying, you're the product.</p>
{/if}

<button disabled={!yes}>Subscribe</button>

<style>
  :root {
    --input-fg-checkbox-checked: rgb(255, 255, 255);
    --input-bg: rgb(50, 63, 99);
    --input-bg-checkbox: rgb(48, 61, 94);
    --input-bg-checkbox-checked: rgb(28, 177, 121);
    --input-border: rgb(35, 49, 49);
    --input-border-focus: cyan;
    --input-border-checkbox: rgb(64, 81, 130);
    --input-border-checkbox-checked: rgb(28, 177, 121);
    --button-bg: rgb(158, 183, 236);
    --button-hover-color: rgb(175, 193, 232);
  }

  label {
    display: flex;
    align-items: center;
  }

  input.checkbox {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 20px;
    height: 20px;
    background: var(--input-bg-checkbox);
    border: 1px solid var(--input-border-checkbox);
    border-radius: 0.2em;
    position: relative;
    vertical-align: middle;
    cursor: pointer;
  }

  input.checkbox:checked {
    background: var(--input-bg-checkbox-checked);
  }

  input.checkbox:checked::before {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    color: var(--input-fg-checkbox-checked);
  }

  button {
    aspect-ratio: 1;
    border-radius: 10px;
    background: var(--button-bg, rgb(158, 183, 236));
    height: 50px;
    width: 200px;
    color: black;
  }

  button:hover {
    background: var(--button-hover-color, rgb(175, 193, 232));
  }
</style>
