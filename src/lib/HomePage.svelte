<script lang="ts">
  import { page } from '$app/stores';
  export let data: any = $page.data;
  import { _$logger } from '$lib/utils/logger';

  _$logger.debug.TraceLayoutAndPage('/lib/HomePage.svelte', $page.route.id, data);
</script>

<main>
  <div class="container p-10 space-y-4">
    <h1>API Action Page</h1>
    <hr />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate nostrum, vero explicabo sunt ipsum asperiores. Molestias nostrum mollitia
      cumque veniam eum error atque, dolores nesciunt voluptas ea consectetur sed delectus.
    </p>
  </div>
  <slot />
</main>
