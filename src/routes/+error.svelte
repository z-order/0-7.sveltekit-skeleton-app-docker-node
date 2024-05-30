<script>
  import { page } from '$app/stores';
</script>

<div>
  <h1>
    {$page.status}: '{$page.error?.message}'
  </h1>
</div>

<style lang="postcss">
  /* Default */
  div {
    @apply w-[100%] h-[100%] flex flex-col justify-center items-center;
  }
  h1 {
    @apply flex items-center text-center text-6xl text-blue-600 dark:text-red-600;
  }

  /* Mobile */
  @media screen and (max-width: 428px) {
    h1 {
      @apply text-xl;
    }
  }
</style>
