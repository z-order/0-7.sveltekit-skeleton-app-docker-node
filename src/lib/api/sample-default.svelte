<script lang="ts">
  import type { NavLink } from '$data/menu-nav-links';
  import { CodeBlock } from '@skeletonlabs/skeleton';
  import { writable, type Writable } from 'svelte/store';

  // get data from upper component in the source of src/routes/sveltekit/[slug]/+page.svelte
  export let menuItem: NavLink;
  //

  let storeId: Writable<string> = writable('');
  let url: any, urlAction: any, resAPI: any, codeDisplay: any, actionWaiting: any, disableUrlInput: any;

  // Check if the menu item is changed and then re-initialize the component whether we have instance or not.
  // All the component's structure for the contruction should be like this.
  $: if ($storeId !== menuItem.id) {
    storeId.set(menuItem.id);
    initComponent();
  }

  function initComponent() {
    url = menuItem.data?.url || '';
    urlAction = menuItem.data?.method || 'GET';
    resAPI = '';
    codeDisplay = 'API reponse data will be here.';
    actionWaiting = false;
    disableUrlInput = true;
    if (url.length === 0) {
      disableUrlInput = false;
    }
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
    })
      .then(async (response) => {
        resAPI = await response.json();
        codeDisplay = JSON.stringify(resAPI, null, 2);
        actionWaiting = false;
      })
      .catch((error) => {
        codeDisplay = error ? '404 Not Found: ' + error.message : '404 Not Found';
        actionWaiting = false;
      });
  }
</script>

<main>
  <form>
    <label class="label">
      <span>URL</span>
      <!-- pseudo input component to render all the data from the parent component but not used at this time, so ignore below line -->
      <!--<input class="w-1 h-0 hidden" bind:value={menuItemId} />-->
      <input disabled={disableUrlInput} class="input" name="url" type="text" placeholder="/sveltekit/api/random-number or etc." bind:value={url} />
    </label>
    <button disabled={actionWaiting} type="submit" class="btn variant-filled rounded-md" on:click={callAPI}>API Action</button>
  </form>
  <span
    ><h1>
      API Response {actionWaiting ? '[waiting...]' : '[Fill up URL address and click API Action button]'}
    </h1></span
  >
  <CodeBlock class="w-full h-full bg-slate-900 text-emerald-400" language="json" code={codeDisplay} />
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
