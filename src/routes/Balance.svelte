<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { Account, Expense } from '$lib/idb';
	import { Cog, PlusCircle } from 'lucide-svelte';

	export let expenses: Expense[];
	export let accounts: Account[];
	console.log(expenses);
	console.log(accounts);
	let balance = expenses.reduce((acc, curr) => acc + curr.amount, 0);
</script>

<div class="my-4 flex justify-between text-xl font-semibold">
	<span>Accounts</span>
	<Button size="icon"><Cog /></Button>
</div>
<div class="grid grid-cols-2 gap-2">
	<button on:click={() => console.log('hi')} class="flex justify-between rounded bg-blue-600 p-1">
		<span>Debit</span>
		<span>{balance}</span>
	</button>
	<button class="flex justify-between rounded bg-yellow-600 p-1">
		<span>Credit</span>
		<span>{balance}</span>
	</button>
	<Button href="/account/create" class="flex justify-between rounded bg-yellow-600 p-1 text-white">
		<span>Add account</span>
		<PlusCircle />
	</Button>
</div>
