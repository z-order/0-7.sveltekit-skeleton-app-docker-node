<script lang="ts">
  import { count } from './stores';
  import Incrementer from './Incrementer.svelte';
  import Decrementer from './Decrementer.svelte';
  import Resetter from './Resetter.svelte';
</script>

<h1>The count is {count}</h1>

<Incrementer />
<Decrementer />
<Resetter />
