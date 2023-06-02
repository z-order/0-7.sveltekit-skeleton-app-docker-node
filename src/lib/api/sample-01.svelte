<script lang="ts">
  import { RunAPI } from '$lib/api/sample-01';
  import { CodeBlock } from '@skeletonlabs/skeleton';

  let resAPI: {} | undefined = undefined;
  let sentPacket: boolean = false;
  let receivedPacket: boolean = false;

  function handleSubmit(_event: any) {
    console.log(new FormData(_event.target));
    resAPI = undefined;
    RunAPI().then((res) => {
      resAPI = res;
    });
  }
</script>

<main>
  <form method="post" on:submit|preventDefault={handleSubmit}>
    <label class="label">
      <span>Username</span>
      <input class="input" name="username" type="text" placeholder="Username for APIs" />
    </label>
    <label class="label">
      <span>Nickname</span>
      <input class="input" name="nickname" type="text" placeholder="Nickname for APIs" />
    </label>
    <label class="label">
      <span>Phone</span>
      <input class="input" name="phone" type="text" placeholder="Phone number for APIs" />
    </label>
    <label class="label">
      <span>Key</span>
      <input class="input" name="key" type="text" placeholder="Key for APIs" />
    </label>
    <button disabled={false} type="submit" class="btn variant-filled rounded-md">Sign up</button>
  </form>
  <span
    ><h1>
      API Response {sentPacket && !receivedPacket
        ? '[waiting...]'
        : '[Please fill up input columns.]'}
    </h1></span
  >
  <CodeBlock
    language="json"
    code={`${resAPI === undefined ? ' API reponse data will be here.' : JSON.stringify(resAPI)}`}
  />
</main>

<style lang="postcss">
  @import '/src/lib/pcss/style.default.pcss';
</style>
