<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
	import { browser } from '$app/environment';

	let desktop: string;

	if (window.electron && browser) {
		window.electron.receive('from-main', (data: any) => {
			desktop = `Received Message "${data}" from Electron`;
			console.log(desktop);
		});
	}

	const agent = window.electron ? 'Electron' : 'Browser';
</script>

<main class="main-content flex flex-col h-screen my-auto items-center justify-center">
	<Logo />
	{#if desktop}
		<br />
		<br />
		{desktop}
	{/if}
	<!-- <VisitorCounter/> -->
</main>

<style>
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}

	:global(body) {
		margin: 0;
		padding: 0;
	}

	main {
		padding: 2em 1em 1em 1em;
		text-align: center;
		animation: fade 1s;
		margin: 0 auto;
	}
	h2 {
		font-size: 2em;
		font-weight: 400;
		/* text color of navy blue */
		color: #000080;
		/* font bold */
		font-weight: bold;
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
