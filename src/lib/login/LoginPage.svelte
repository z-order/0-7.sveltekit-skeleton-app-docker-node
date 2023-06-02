<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { _$logger } from '$lib/utils/logger';

  _$logger.debug.TraceLayoutAndPage('/lib/login/LoginPage.svelte', $page.route.id, $page.data);

  let apiReqData = { id: '', password: '' };

  async function Login() {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(apiReqData),
    });

    // debug log
    console.debug(`${response.status} ${response.statusText}`);

    switch (response.status) {
      case 200:
        goto('/');
      default:
        window.document.location.reload();
        break;
    }
  }
</script>

<main>
  <form>
    <input class="input" type="text" placeholder="ID" bind:value={apiReqData.id} />
    <input class="input" type="password" placeholder="Password" bind:value={apiReqData.password} />
    <button on:click={Login}>Login</button>
  </form>
</main>

<style lang="postcss">
  main {
    @apply h-[100%] flex flex-row gap-8 justify-center items-center;
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
</style>
