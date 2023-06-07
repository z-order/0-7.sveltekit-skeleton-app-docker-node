<script lang="ts">
  /** @type {import('./$types').PageData} */
  export let data: any;
  import { page } from '$app/stores';
  import { _$logger } from '$lib/utils/logger';

  _$logger.debug.TraceLayoutAndPage('/sveltekit/admin/+page.svelte', $page.route.id, data);
</script>

<div class="container p-10 space-y-4">
  <h1>Admin Page</h1>
  <hr />
  <p>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate nostrum, vero explicabo sunt ipsum asperiores. Molestias nostrum mollitia
    cumque veniam eum error atque, dolores nesciunt voluptas ea consectetur sed delectus.
  </p>
</div>

<slot />
