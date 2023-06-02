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
  /* Warning of that: Unused CSS selector "button > :not([hidden]) ~ :not([hidden])"svelte(css-unused-selector)
     You can resolve using as following codes. and refer to docs : https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity 

     button {
       @apply lg:shadow btn mr-4 !variant-filled rounded-md;
     }

     Above codes are not working. because it is not specific with warning message:
     Unused CSS selector "button > :not([hidden]) ~ :not([hidden])"svelte(css-unused-selector)

     I think that it is not good to use the following codes. because it is not specific for the general case of css tag.
     But, it is not a problem in this case, because it works well and it is specific with matches-any pseudo-class of this file in the svelte.

     :is(button) {
       @apply lg:shadow btn mr-4 !variant-filled rounded-md;
     }

     So, I will use the following codes to avoid annoying warnning message.
  */
  :is(button) {
    @apply lg:shadow btn mr-4 !variant-filled rounded-md;
  }
</style>
