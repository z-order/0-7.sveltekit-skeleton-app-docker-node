<script>
  import { marked } from 'marked';
  let value = `Some words are *italic*, some are **bold**\n\n- lists\n- are\n- cool`;
</script>

<div class="grid">
  input
  <textarea bind:value></textarea>

  output
  <div>{@html marked(value)}</div>
</div>

<style>
  :root {
    --textarea-bg: rgb(44, 53, 81);
    --textarea-border: rgb(35, 49, 49);
    --textarea-border-focus: cyan;
  }

  .grid {
    display: grid;
    grid-template-columns: 5em 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 1em;
    height: 100%;
  }

  textarea {
    flex: 1;
    resize: none;
    padding: 0.2em 0.2em 0.2em 0.6em; /* top | right | bottom | left */
    margin: 0.4em 0em 0.4em 0.2em; /* top | right | bottom | left */
    background: var(--textarea-bg);
    border: 1px solid var(--textarea-border);
    border-radius: 0.4em;
  }

  textarea:focus {
    border: 1px solid var(--textarea-border-focus);
  }
</style>
