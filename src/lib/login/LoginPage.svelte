<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { _$logger } from '$lib/utils/logger';

  _$logger.debug.TraceLayoutAndPage('/lib/login/LoginPage.svelte', $page.route.id, $page.data);

  let apiReqData = { id: '', password: '' };

  async function Login() {
    console.debug(`Login: ${JSON.stringify(apiReqData)}`);
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(apiReqData),
    });

    // debug log
    const respData = await response.json();
    console.debug(`status: ${response.status} statusText: ${response.statusText} data: ${JSON.stringify(respData)}`);
    alert(`status: ${response.status} statusText: ${response.statusText} data: ${JSON.stringify(respData)}`);

    switch (response.status) {
      case 200:
        localStorage.setItem('userLoginData', JSON.stringify(respData));
        goto('/');
      default:
        window.document.location.reload();
        break;
    }
  }
</script>

<main>
  <h1>You can login with id: '1001', Password: '1001'</h1>
  <form>
    <input class="input" type="text" placeholder="ID" bind:value={apiReqData.id} />
    <input class="input" type="password" placeholder="Password" bind:value={apiReqData.password} />
    <button class="btn variant-filled" on:click={Login}>login</button>
  </form>
</main>

<style lang="postcss">
  main {
    @apply h-[100%] flex flex-col gap-8 justify-center items-center;
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
