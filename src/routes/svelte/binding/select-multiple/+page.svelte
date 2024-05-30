<script lang="ts">
  //
  // Refs: https://learn.svelte.dev/tutorial/multiple-select-bindings
  //
  let scoops = 1;
  let flavours: string[] = [];

  const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
</script>

<h2>Size</h2>

{#each [1, 2, 3] as number}
  <label>
    <input type="radio" class="radio" name="scoops" value={number} bind:group={scoops} />

    {number}
    {number === 1 ? 'scoop' : 'scoops'}
  </label>
{/each}

<h2>Flavours</h2>

<select class="select" multiple bind:value={flavours}>
  {#each ['cookies and cream', 'mint choc chip', 'raspberry ripple'] as flavour}
    <option>{flavour}</option>
  {/each}
</select>

{#if flavours.length === 0}
  <p>Please select at least one flavour</p>
{:else if flavours.length > scoops}
  <p>Can't order more flavours than scoops!</p>
{:else}
  <p>
    You ordered {scoops}
    {scoops === 1 ? 'scoop' : 'scoops'}
    of {formatter.format(flavours)}
  </p>
{/if}

<style>
  :root {
    --input-fg-checkbox-checked: rgb(255, 255, 255);
    --input-fg-radio-checked: rgb(255, 255, 255);
    --input-bg: rgb(50, 63, 99);
    --input-bg-checkbox: rgb(48, 61, 94);
    --input-bg-radio: rgb(48, 61, 94);
    --input-bg-checkbox-checked: rgb(28, 177, 121);
    --input-bg-radio-checked: rgb(28, 177, 121);
    --input-border: rgb(35, 49, 49);
    --input-border-focus: cyan;
    --input-border-checkbox: rgb(64, 81, 130);
    --input-border-radio: rgb(64, 81, 130);
    --input-border-checkbox-checked: rgb(28, 177, 121);
    --input-border-radio-checked: rgb(28, 177, 121);
    --select-bg: rgb(48, 61, 94);
    --select-border: rgb(64, 81, 130);
    --select-border-focus: cyan;
    --select-mark: rgb(98, 107, 132);
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

  input.radio {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 20px;
    height: 20px;
    background: var(--input-bg-radio);
    border: 1px solid var(--input-border-radio);
    border-radius: 50%;
    position: relative;
    vertical-align: middle;
    cursor: pointer;
  }

  input.radio:checked {
    background: var(--input-bg-radio-checked);
  }

  input.radio:checked::before {
    content: '●';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 10px;
    color: var(--input-fg-radio-checked);
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

  select {
    appearance: none; /* Remove default arrow */
    -webkit-appearance: none; /* Remove default arrow in Safari */
    -moz-appearance: none; /* Remove default arrow in Firefox */
    padding: 0.2em 0.2em 0.2em 0.6em; /* top | right | bottom | left */
    margin: 0.4em 0em 0.4em 0.2em; /* top | right | bottom | left */
    background: var(--select-bg);
    border: 1px solid var(--select-border);
    border-radius: 0.4em;
    width: 600px;
    position: relative;
    vertical-align: middle;
    cursor: pointer;
  }

  select:focus {
    border: 1px solid var(--select-border-focus);
  }

  select::-ms-expand {
    display: none; /* Remove default arrow in IE 10 and 11 */
  }

  /* Add custom arrow, but doesn't work in this environment, check later ... */
  select::after {
    content: '▼'; /* Unicode for down arrow, or '\25BC' */
    position: absolute;
    width: 0.8em;
    height: 0.8em;
    top: 50%;
    right: 0.5em;
    transform: translateY(-50%);
    font-size: 12px;
    color: var(--select-mark);
    background-color: var(--select-mark);
    pointer-events: none; /* Make sure icon doesn't block interaction with select */
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
