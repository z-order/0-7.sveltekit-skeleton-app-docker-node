<script lang="ts">
  import type { NavLink } from '$data/menu-nav-links';
  import { CodeBlock } from '@skeletonlabs/skeleton';

  // get data from upper component in the source of src/routes/api/[slug]/+page.svelte
  export let menuItem: NavLink;
  //

  let url = menuItem.data?.url || '';
  let urlAction = menuItem.data?.method || 'GET';
  let resAPI = '';
  let codeDisplay = 'API reponse data will be here.';
  let actionWaiting = false;
  let disableUrlInput = true;

  if (url.length === 0) {
    disableUrlInput = false;
  }

  function callAPI() {
    resAPI = '';
    codeDisplay = 'waiting response...';
    actionWaiting = true;
    fetch(url, {
      method: urlAction,
      headers: {
        'content-type': 'application/json',
      },
    }).then(async (response) => {
      resAPI = await response.json();
      codeDisplay = JSON.stringify(resAPI, null, 2);
      actionWaiting = false;
    });
  }
</script>

<main>
  <form>
    <label class="label">
      <span>URL</span>
      <input disabled={disableUrlInput} class="input" name="url" type="text" placeholder="/api/random-number or etc." bind:value={url} />
    </label>
    <button disabled={actionWaiting} type="submit" class="btn variant-filled rounded-md" on:click={callAPI}>API Action</button>
  </form>
  <span
    ><h1>
      API Response {actionWaiting ? '[waiting...]' : '[Fill up URL address and click API Action button]'}
    </h1></span
  >
  <CodeBlock class="w-full h-full bg-slate-900 text-emerald-300" language="json" code={codeDisplay} />
</main>

<style lang="postcss">
  main {
    @apply w-[100%] h-[100%] flex flex-col gap-8 justify-start items-start p-6;
  }
  form {
    @apply w-full flex flex-row space-x-4;
  }
  label {
    @apply w-full;
  }
  input {
    @apply flex w-full rounded-md;
  }
  button {
    @apply flex w-[200px] rounded-md;
  }
</style>
