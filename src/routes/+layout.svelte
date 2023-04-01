<script lang="ts">
	import '../app.postcss';
	import NavbarHomePage from '$lib/components/NavbarHomePage.svelte';
	import { onMount } from 'svelte';
	import VisitorCounter from '$lib/components/VisitorCounter.svelte';
	let ready = false;

	onMount(() => {
		ready = true;
	});
</script>

	<NavbarHomePage />

	<slot />
	<VisitorCounter />
