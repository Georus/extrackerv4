<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { db } from '$lib/idb';
	import { Plus } from 'lucide-svelte';
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
		<Button href="/create" class="fixed bottom-16 right-10 h-14 rounded-full px-4">
			<Plus />
		</Button>
		<List expenses={results.expenses} />
	{/await}
	<Chart />
</main>
