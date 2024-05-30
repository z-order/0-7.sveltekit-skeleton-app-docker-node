<script lang="ts">
  //
  // Refs: https://learn.svelte.dev/tutorial/dom-events
  //
  let m = { x: 0, y: 0 };

  function handleMove(event: any) {
    m.x = event.clientX;
    m.y = event.clientY;
  }
</script>

<div on:pointermove={handleMove}>
  The pointer is at {m.x} x {m.y}
</div>

<style>
  div {
    position: relative; /* 'fixed' for a absolute position relative to the viewport, 'relative' for current page */
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 1rem;
  }
</style>
