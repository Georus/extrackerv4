<script>
	import { Button } from '$lib/components/ui/button';
	import Balance from './Balance.svelte';
	import Chart from './Chart.svelte';
	import List from './list.svelte';
</script>

<main class="p-4">
	<h1>Welcome to SvelteKit</h1>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
	<Balance />
	<Button href="/create">Create</Button>
	<List />
	<Chart />
</main>
