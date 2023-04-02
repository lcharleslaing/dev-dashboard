<script>
	import { onMount } from 'svelte';
	import { PrismaClient } from '@prisma/client';
	const prisma = new PrismaClient();
	import { ipcRenderer } from 'electron';

	let name = '';
	let email = '';
	let username = '';
	let phoneNumber = '';

	onMount(() => {
		loadData();
	});

	const saveData = async () => {
		const user = {
			name,
			email,
			username,
			phoneNumber,
		};
		await window.electron.saveUser(user);
	};

	const loadData = async () => {
		const data = await window.electron.loadUser();
		if (data) {
			name = data.name;
			email = data.email;
			username = data.username;
			phoneNumber = data.phoneNumber;
		}
	};
</script>

<!-- Add a form to input user information -->
<form on:submit|preventDefault={saveData} class="w-full max-w-md mt-8">
	<!-- ... other form elements -->
	<input
		type="text"
		id="name"
		bind:value={name}
		placeholder="Name"
		class="w-full mt-1 bg-gray-100 border border-gray-300 rounded py-2 px-3 text-gray-800 focus:outline-none focus:border-blue-500"
	/>
	<!-- ... other form elements -->
	<input
		type="email"
		id="email"
		bind:value={email}
		placeholder="Email"
		class="w-full mt-1 bg-gray-100 border border-gray-300 rounded py-2 px-3 text-gray-800 focus:outline-none focus:border-blue-500"
	/>
	<!-- ... other form elements -->
	<input
		type="text"
		id="username"
		bind:value={username}
		placeholder="Username"
		class="w-full mt-1 bg-gray-100 border border-gray-300 rounded py-2 px-3 text-gray-800 focus:outline-none focus:border-blue-500"
	/>
	<!-- ... other form elements -->
	<input
		type="tel"
		id="phoneNumber"
		bind:value={phoneNumber}
		placeholder="Phone Number"
		class="w-full mt-1 bg-gray-100 border border-gray-300 rounded py-2 px-3 text-gray-800 focus:outline-none focus:border-blue-500"
	/>
	<div class="flex justify-between mt-2">
		<button
			type="submit"
			class="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-blue-600"
		>
			Save
		</button>
		<button
			type="button"
			on:click={loadData}
			class="bg-gray-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-gray-600"
		>
			Load
		</button>
	</div>
</form>
