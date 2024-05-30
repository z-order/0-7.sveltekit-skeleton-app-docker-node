<script lang="ts">
  /** @type {import('./$types').PageData} */
  export let data: any;
  /** @type {import('./$types').ActionData} */
  export let form: any;
  import { page } from '$app/stores';
  import { enhance } from '$app/forms';
  import { _$logger } from '$lib/utils/logger';
  import { _$domElmnt } from '$lib/utils/domelmnt';
  import { ProgressRadial } from '@skeletonlabs/skeleton';
  import { onMount } from 'svelte';

  _$logger.debug.TraceLayoutAndPage(
    '/sveltekit/form-action/+page.svelte',
    $page.route.id,
    data,
    '=> form',
    form /* This form variable is equivalent to $page.from */,
    '=> $page.status',
    $page.status,
  );

  let postActionWaiting = false;

  onMount(() => {
    resizePopupWindow(postActionWaiting);
  });

  function resizePopupWindow(visible: boolean) {
    _$domElmnt.setStyleXYFull('form-frame', 1, 'form-popup', 0, 2);
    _$domElmnt.setStyleElementVisible('form-popup', 0, visible);
  }

  function setPostActionWaiting(waiting: boolean) {
    if (waiting) {
      // If pastActionWaiting is true, it needs to be rendered immediately.
      // Nevertheless, resizePopupWindow() to work expected it must be called after rendered.
      // So, 50ms are enough naturally.
      setTimeout(() => {
        postActionWaiting = waiting;
        resizePopupWindow(waiting);
      }, 50);
    } else {
      // If pastActionWaiting is false, it needs to be rendered delayed to avoid blinking popup.
      // So, 500ms are enough naturally.
      setTimeout(() => {
        postActionWaiting = waiting;
        resizePopupWindow(waiting);
      }, 500);
    }
  }
</script>

<main>
  <h1>
    Type email: 'admin@test.com', password: 'admin' then you can move to admin page<br />
    means redirect() call from form action in the +page.server.ts file.
  </h1>
  <div class="top">
    <span class="form-frame">
      <p>Form Actions</p>
      <form method="POST" action="?/login">
        <label>
          Email <input name="email" class="input" type="email" placeholder="sample@email.com" value={form?.email ?? ''} />
          {#if form?.missingEmail}<p class="error">The email field is required!</p>{/if}
        </label>
        <label>
          Password <input name="password" class="input" type="password" placeholder="Password" value={form?.password ?? ''} />
          {#if form?.missingPassword}<p class="error">The password field is required!</p>{/if}
        </label>
        <button class="btn variant-filled">Login</button>
        <button class="btn variant-filled" formaction="?/register">Register</button>
      </form>
      {#if form?.success}
        <!-- this message is ephemeral; it exists because the page was rendered in
           response to a form submission. it will vanish if the user reloads -->
        <p>Successfully logged in! Welcome back, {form?.name}</p>
      {/if}
    </span>
    <span class="form-frame">
      <p>Form Actions with use:enhance</p>
      <!-- use:enhance will emulate the browser-native behaviour, just without the full-page reloads -->
      <form
        method="POST"
        action="?/login"
        use:enhance={() => {
          setPostActionWaiting(true);
          return async ({ update }) => {
            await update();
            setPostActionWaiting(false);
          };
        }}
      >
        <label>
          Email <input name="email" class="input" type="email" placeholder="sample@email.com" value={form?.email ?? ''} />
          {#if form?.missingEmail}<p class="error">The email field is required!</p>{/if}
        </label>
        <label>
          Password <input name="password" class="input" type="password" placeholder="Password" value={form?.password ?? ''} />
          {#if form?.missingPassword}<p class="error">The password field is required!</p>{/if}
        </label>
        <button class="btn variant-filled" disabled={postActionWaiting}>Login</button>
        <button class="btn variant-filled" disabled={postActionWaiting} formaction="?/register">Register</button>
      </form>
      <div class="form-popup">
        {#if postActionWaiting}
          <p>Waiting for form action to complete...</p>
          <ProgressRadial stroke={100} meter="stroke-primary-500" track="stroke-primary-500/30" />
        {/if}
      </div>
      {#if form?.success}
        <!-- this message is ephemeral; it exists because the page was rendered in
           response to a form submission. it will vanish if the user reloads -->
        <p>Successfully logged in! Welcome back, {form?.name}</p>
      {/if}
    </span>
  </div>
</main>

<style lang="postcss">
  main {
    @apply h-[100%] flex flex-col gap-8 justify-center items-center;
  }
  div.top {
    @apply flex flex-row gap-8 justify-center items-center;
  }
  span.form-frame {
    @apply flex flex-col gap-8 justify-center items-center border-solid border-2 p-4 rounded-md border-teal-900 dark:border-teal-700;
  }
  div.form-popup {
    position: absolute;
    visibility: hidden;
    @apply flex flex-col gap-8 justify-center items-center rounded-md bg-white dark:bg-cyan-900 bg-opacity-95 dark:bg-opacity-95;
  }
  form {
    @apply flex flex-col gap-8 justify-center items-center space-x-1;
  }
  input {
    @apply flex w-[240px] rounded-md;
  }
  button {
    @apply flex w-[240px] rounded-md;
  }
  p.error {
    @apply text-red-500 p-0;
  }
</style>
