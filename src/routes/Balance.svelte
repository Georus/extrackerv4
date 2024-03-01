<script lang="ts">
	import type { Expense } from '$lib/idb';
	import { Cog } from 'lucide-svelte';

	export let expenses: Expense[];
	console.log(expenses);
	let balance = expenses.reduce((acc, curr) => acc + curr.amount, 0);
</script>

<div class="grid grid-cols-2 gap-2">
	<button on:click={() => console.log('hi')} class="flex justify-between rounded bg-blue-600 p-1">
		<span>Debit</span>
		<span>{balance}</span>
	</button>
	<button class="flex justify-between rounded bg-yellow-600 p-1">
		<span>Credit</span>
		<span>{balance}</span>
	</button>
	<button class="flex justify-between rounded bg-yellow-600 p-1">
		<span>Add account</span>
		<Cog />
	</button>
</div>
