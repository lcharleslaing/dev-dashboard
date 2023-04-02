<script>
	import { onMount } from 'svelte';

	let isDarkMode = false;

	function toggleDarkMode(event) {
		console.log('toggleDarkMode called');
		isDarkMode = event.target.checked;
		document.body.classList.toggle('dark-mode', isDarkMode);
		localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
	}

	onMount(() => {
		// Check if dark mode is enabled in local storage
		const storedIsDarkMode = localStorage.getItem('isDarkMode');
		if (storedIsDarkMode !== null) {
			isDarkMode = JSON.parse(storedIsDarkMode);
			document.body.classList.toggle('dark-mode', isDarkMode);
		}
	});
</script>

<label class="inline-flex items-center">
	<input
		type="checkbox"
		class="form-checkbox rounded text-blue-500"
		bind:checked={isDarkMode}
		on:change={toggleDarkMode}
	/>
	<span class="ml-2">Dark mode</span>
</label>

<style>
	.dark-mode {
		background-color: #1a202c;
		color: #cbd5e0;
	}
</style>
