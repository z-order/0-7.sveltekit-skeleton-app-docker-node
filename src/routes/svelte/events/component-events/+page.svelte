<script lang="ts">
  import Inner from './Inner.svelte';

  function handleMessage(event: CustomEvent<{ text: string }>) {
    alert(event.detail.text);
  }
</script>

<Inner on:message={handleMessage} />
