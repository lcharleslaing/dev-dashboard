<script>
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	let visible = false;
	onMount(() => (visible = true));
</script>


{#if visible}
<div class="flex h-screen items-center justify-center">
  <div>
    <img class="w-72"
      src="/icon.png"
      alt="Svelte Logo"
      draggable="false"
      in:fly={{ y: 100, duration: 1500 }}
    />
    <h2 class="mx-auto text center font-extrabold text-2xl text-blue-400">Big2Tiny Solutions</h2>
	<h2 class="mt-4 text-2xl">Developer Dashboard</h2>
  </div>
</div>
{:else}
<div style="height: 16rem" />
{/if}
