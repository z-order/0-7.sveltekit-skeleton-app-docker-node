<button on:click>
  <span>
    <svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
      <rect width="100" height="20" />
      <rect y="30" width="100" height="20" />
      <rect y="60" width="100" height="20" />
    </svg>
  </span>
</button>

<style lang="postcss">
  button {
    @apply lg:shadow btn mr-4 !variant-filled rounded-md;
  }
</style>
