<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { db } from '$lib/idb';
	import Balance from './Balance.svelte';
	import Chart from './Chart.svelte';
	import List from './list.svelte';

	async function getExps() {
		const expenses = await db.expenses.toArray();
		const accounts = await db.accounts.toArray();
		return { expenses, accounts };
	}
</script>

<main class="p-4">
	<h1>Welcome to SvelteKit</h1>
	{#await getExps() then results}
		<Balance expenses={results.expenses} accounts={results.accounts} />
		<Button href="/create">Create</Button>
		<List expenses={results.expenses} />
	{/await}
	<Chart />
</main>
