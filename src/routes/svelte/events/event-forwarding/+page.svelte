<script lang="ts">
  import Outer from './Outer.svelte';

  function handleMessage(event: CustomEvent<{ text: string }>) {
    alert(event.detail.text);
  }
</script>

<Outer on:message={handleMessage} />
