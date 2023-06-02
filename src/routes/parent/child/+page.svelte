<script lang="ts">
  /** @type {import('./$types').PageData} */
  export let data: any;
  import { page } from '$app/stores';
  import { _$logger } from '$lib/utils/logger';

  _$logger.debug.TraceLayoutAndPage('/parent/child/+page.svelte', $page.route.id, data);
</script>

<!-- renders `1 + 2 = 3` -->
<p>{data.a} + {data.b} = {data.c}</p>
