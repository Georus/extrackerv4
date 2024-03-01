<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion/';
	import Button from '$lib/components/ui/button/button.svelte';
	import { type Expense } from '$lib/idb';
	import { CalendarDate, today, getLocalTimeZone } from '@internationalized/date';
	import { ChevronDown } from 'lucide-svelte';

	export let expenses: Expense[];

	let topay = new Date();
	let date = today(getLocalTimeZone());

	$: expenseList = expenses.filter(
		(exp) => exp.spendDate.getMonth() === date.toDate(getLocalTimeZone()).getMonth()
	);
</script>

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
					<Accordion.Content>
						{exp.payDate}
						<a href={'edit/' + exp.id?.toString()}>edit</a>
						<span>{exp.id}</span>
					</Accordion.Content>
				</Accordion.Item>
			{/each}
		</Accordion.Root>
	</ul>
{/if}

<div class="flex">
	<Button on:click={() => (topay = new Date(topay.setMonth(topay.getMonth() - 1)))}>-</Button>
	<div>{topay.toLocaleString('default', { month: 'long', year: 'numeric' })}</div>
	<Button on:click={() => (topay = new Date(topay.setMonth(topay.getMonth() + 1)))}>+</Button>
</div>

<div>
	<Button on:click={() => date.subtract({ months: 1 })}>-</Button>
	{date.toDate(getLocalTimeZone()).toLocaleString('default', { month: 'long', year: 'numeric' })}
	<Button on:click={() => date.add({ months: 1 })}>+</Button>
</div>
