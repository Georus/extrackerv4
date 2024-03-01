<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { db } from '$lib/idb';
	import Balance from './Balance.svelte';
	import Chart from './Chart.svelte';
	import List from './list.svelte';

	async function getExps() {
		return await db.expenses.toArray();
	}
</script>

<main class="p-4">
	<h1>Welcome to SvelteKit</h1>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
	{#await getExps() then expenses}
		<Balance {expenses} />
		<Button href="/create">Create</Button>
		<List {expenses} />
	{/await}
	<Chart />
</main>
