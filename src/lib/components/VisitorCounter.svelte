<script>
  import { onMount } from 'svelte';

  const key = `visits_${window.location.pathname}`;
  let visits = parseInt(localStorage.getItem(key)) || 1000;

  console.log('initial visits:', visits);
  console.log('initial localStorage:', localStorage.getItem(key));

  onMount(() => {
    visits++;
    localStorage.setItem(key, visits.toString());
    console.log('updated visits:', visits);
    console.log('updated localStorage:', localStorage.getItem(key));
  });
</script>

<div>Visits: {visits}</div>
