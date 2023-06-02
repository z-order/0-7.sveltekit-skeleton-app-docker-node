<script>
  let a = 0;
  let b = 0;
  let total = 0;

  async function add() {
    const response = await fetch('/api/adder', {
      method: 'POST',
      body: JSON.stringify({ a, b }),
      headers: {
        'content-type': 'application/json',
      },
    });

    total = await response.json();
  }
</script>

<main>
  <form>
    <input class="input" type="number" placeholder="A value" bind:value={a} /> +
    <input class="input" type="number" placeholder="B value" bind:value={b} /> =
    <span>{total}</span>
    <button on:click={add}>Calculate</button>
  </form>
</main>

<style lang="postcss">
  main {
    @apply h-[50%] flex flex-row gap-8 justify-center items-center;
  }
  form {
    @apply flex flex-row gap-8 justify-center items-center space-x-1;
  }
  input {
    @apply flex w-[240px] rounded-md;
  }
  button {
    @apply flex w-[200px] rounded-md;
  }
</style>
