<!-- settings/+page.svelte -->
<script>
	import DarkModeToggle from '$lib/components/DarkModeToggle.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import SettingsForm from '$lib/components/SettingsForm.svelte';
</script>

<PageTitle />
<main class="main-content flex flex-col h-screen items-center">
	<DarkModeToggle />
	<SettingsForm />
</main>

<style>
</style>
