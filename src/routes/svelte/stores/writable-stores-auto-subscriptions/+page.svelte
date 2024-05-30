<script lang="ts">
  import { count } from './stores';
  import Incrementer from './Incrementer.svelte';
  import Decrementer from './Decrementer.svelte';
  import Resetter from './Resetter.svelte';

  let count_value: number;

  count.subscribe((value: number) => {
    count_value = value;
  });
</script>

<h1>The count is {count_value}</h1>

<Incrementer />
<Decrementer />
<Resetter />
