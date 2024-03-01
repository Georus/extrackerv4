<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion/';
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select/';
	import { type Expense } from '$lib/idb';
	import { ChevronDown } from 'lucide-svelte';

	export let expenses: Expense[];

	let selection = {
		value: new Date().getMonth().toString(),
		label: 'February'
	};

	let monFilter = new Date().getMonth();

	let expenseList = expenses.filter((exp) => exp.spendDate.getMonth() === monFilter);
	console.log(expenseList);

	function filterMonth(event: any) {
		expenseList = expenses.filter((exp) => exp.spendDate.getMonth() === parseInt(event.value));
	}
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

<Label>
	Filter expenses:
	<Select.Root bind:selected={selection} onSelectedChange={filterMonth}>
		<Select.Trigger>
			<Select.Value placeholder="Month"></Select.Value>
		</Select.Trigger>
		<Select.Content>
			<Select.Item value="0">January</Select.Item>
			<Select.Item value="1">February</Select.Item>
			<Select.Item value="2">March</Select.Item>
		</Select.Content>
	</Select.Root>
</Label>
