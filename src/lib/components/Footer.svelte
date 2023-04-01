<script>
  import VisitorCounter from './VisitorCounter.svelte';
</script>

<footer class="sticky-footer">
  <VisitorCounter key={window.location.pathname} />
</footer>
