<script lang="ts">
  /** @type {import('./$types').PageData} */
  export let data: any;
  import { page } from '$app/stores';
  import { _$logger } from '$lib/utils/logger';

  _$logger.debug.TraceLayoutAndPage('/[home]/+page.svelte', $page.route.id, data);
</script>

<!-- This page can't be displayed but if you don't have +page.svelte, redirect() function in +layout.server.ts will not work. -->
<p>Home</p>
