<script lang="ts">
  /** @type {import('./$types').PageData} */
  export let data: any;
  import { page } from '$app/stores';
  import { _$logger } from '$lib/utils/logger';
  import HomePage from '$lib/HomePage.svelte';

  _$logger.debug.TraceLayoutAndPage('/+page.svelte', $page.route.id, data);
</script>

<HomePage>
  <slot />
</HomePage>
