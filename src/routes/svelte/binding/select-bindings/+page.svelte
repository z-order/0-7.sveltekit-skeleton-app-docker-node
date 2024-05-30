<script lang="ts">
  //
  // Refs: https://learn.svelte.dev/tutorial/select-bindings
  //
  let questions = [
    {
      id: 1,
      text: `Where did you go to school?`,
    },
    {
      id: 2,
      text: `What is your mother's name?`,
    },
    {
      id: 3,
      text: `What is another personal fact that an attacker could easily find with Google?`,
    },
  ];

  let selected: any;

  let answer = '';

  function handleSubmit() {
    alert(`answered question ${selected.id} (${selected.text}) with "${answer}"`);
  }
</script>

<h2>Insecurity questions</h2>

<form on:submit|preventDefault={handleSubmit}>
  <select bind:value={selected} on:change={() => (answer = '')}>
    {#each questions as question}
      <option value={question}>
        {question.text}
      </option>
    {/each}
  </select>

  <input bind:value={answer} />

  <button disabled={!answer} type="submit"> Submit </button>
</form>

<p>
  selected question {selected ? selected.id : '[waiting...]'}
</p>

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
