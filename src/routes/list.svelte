<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion/';
	import Button from '$lib/components/ui/button/button.svelte';
	import { type Expense } from '$lib/idb';
	import { selAccount } from '$lib/store';
	import { today, getLocalTimeZone } from '@internationalized/date';
	import { ChevronDown, Minus, Plus, SquarePen } from 'lucide-svelte';

	export let expenses: Expense[];

	let date = today(getLocalTimeZone());

	console.log(expenses);
	console.log($selAccount);

	$: expenseList = expenses.filter(
		(exp) =>
			exp.spendDate.getMonth() === date.toDate(getLocalTimeZone()).getMonth() &&
			exp.account === $selAccount
	);
</script>

<div class="flex items-center justify-center">
	<div class=" flex items-center border-4">
		<Button size="icon" on:click={() => (date = date.subtract({ months: 1 }))}><Minus /></Button>
		<span class="mx-2">
			{date
				.toDate(getLocalTimeZone())
				.toLocaleString('default', { month: 'long', year: 'numeric' })}
		</span>
		<Button size="icon" on:click={() => (date = date.add({ months: 1 }))}><Plus /></Button>
	</div>
</div>
{#if expenseList}
	<ul>
		<Accordion.Root class="w-full sm:max-w-[70%]">
			{#each expenseList as exp (exp.id)}
				<Accordion.Item value={exp.id?.toString() || ''}>
					<Accordion.Trigger class="">
						<span>{exp.name} </span>
						<span class="flex items-center">
							<span class="text-red-500">{exp.amount}</span>
							<ChevronDown class="h-4 w-4 transition-transform duration-200" />
						</span>
					</Accordion.Trigger>
					<Accordion.Content class=" flex items-center">
						<span>{exp.payDate.toLocaleString()}</span>
						<Button variant="secondary" size="icon" href={'edit/' + exp.id?.toString()}>
							<SquarePen />
						</Button>
					</Accordion.Content>
				</Accordion.Item>
			{/each}
		</Accordion.Root>
	</ul>
{/if}
