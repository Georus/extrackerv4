<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { Account, Expense } from '$lib/idb';
	import { Cog, PlusCircle } from 'lucide-svelte';

	export let expenses: Expense[];
	export let accounts: Account[];

	let balance = expenses.reduce((acc, curr) => acc + curr.amount, 0);
</script>

<div class="my-4 flex justify-between text-xl font-semibold">
	<span>Accounts</span>
	<Button href="/account" variant="outline" size="icon" class="border-4"><Cog /></Button>
</div>
<div class="grid grid-cols-2 gap-2">
	{#each accounts as account}
		<Button
			on:click={() => console.log('hi')}
			class="flex justify-between rounded p-1 text-white"
			style={'background-color:' + account.color}
		>
			<span>{account.name}</span>
			<span>{balance}</span>
		</Button>
	{/each}
	<Button variant="outline" href="/account/create" class="flex justify-between border-2">
		<span>Add account</span>
		<PlusCircle />
	</Button>
</div>
