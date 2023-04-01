<!-- settings/+page.svelte -->
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

	function handleSave() {
		console.log('handleSave called', isDarkMode);
		// Save the dark mode setting to local storage
		localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
		alert(`Dark mode is now ${isDarkMode ? 'enabled' : 'disabled'}`);
	}
</script>

<div class="py-6">
	<label class="checkbox">
		<input
			type="checkbox"
			class="checkbox-input"
			bind:checked={isDarkMode}
			on:change={toggleDarkMode}
		/>
		<span class="checkbox-label">Dark mode</span>
	</label>
</div>
