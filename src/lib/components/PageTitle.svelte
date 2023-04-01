<script lang="ts">
    import { onMount } from 'svelte';

    let url = window.location.href;
    let title = url.split('/').pop() ?? 'Default Title';

    function capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    onMount(() => {
        document.title = title;
        title = capitalizeFirstLetter(title);
    });
</script>

<main class="">
    <h1 class="py-12 text-center text-4xl mt-16">{title}</h1>
</main>
