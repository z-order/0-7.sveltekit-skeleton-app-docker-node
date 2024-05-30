<script lang="ts">
  /** @type {import('./$types').PageData} */
  export let data: any;
  /** @type {import('./$types').ActionData} */
  export let form: any;
  import { page } from '$app/stores';
  import { enhance } from '$app/forms';
  import { _$logger } from '$lib/utils/logger';
  import { onMount } from 'svelte';
  import type { APILoginData } from '$lib/types/types';

  let userName: string = '';
  onMount(() => {
    const userLoginDataStr = localStorage.getItem('userLoginData');
    const userLoginData: APILoginData = userLoginDataStr ? JSON.parse(userLoginDataStr) : '';
    userName = userLoginData.name;
  });

  _$logger.debug.TraceLayoutAndPage('/sveltekit/logout/+page.svelte', $page.route.id, data, '=> form', form /* This form variable is equivalent to $page.from */, '=> $page.status', $page.status);

  // If the form was successfully submitted, destroy cookie on the browser-side as well to ensure security options
  if (form?.success) {
    function deleteCookie(name: string) {
      document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
    deleteCookie(form?.sessionid);
  }
</script>

<main>
  <h1>Logout page example: <br /> Destroy session and so on.</h1>
  <span>
    <!-- use:enhance will emulate the browser-native behaviour, just without the full-page reloads -->
    <form method="POST" action="?/logout" use:enhance>
      <p>User: {userName}</p>
      <button class="btn variant-filled">Logout</button>
    </form>
    <!-- if the form was successfully submitted, maybe below codes are not showed as the server reloads -->
    {#if form?.success}
      <!-- this message is ephemeral; it exists because the page was rendered in
           response to a form submission. it will vanish if the user reloads -->
      <p>Successfully logged out! See you soon.</p>
    {/if}
  </span>
</main>

<style lang="postcss">
  main {
    @apply h-[80%] flex flex-col gap-8 justify-center items-center;
  }
  span {
    @apply flex flex-col gap-8 justify-center items-center border-solid border-2 p-4 rounded-md border-teal-900 dark:border-teal-700;
  }
  form {
    @apply flex flex-col gap-8 justify-center items-center space-x-1;
  }
  button {
    @apply flex w-[200px] rounded-md;
  }
</style>
