<script lang="ts">
	import { liveQuery } from 'dexie';
	import { db } from '$lib/idb';
	import * as Accordion from '$lib/components/ui/accordion/';
	import { ChevronDown } from 'lucide-svelte';
	import * as Select from '$lib/components/ui/select/';
	import { Label } from '$lib/components/ui/label';

	let selection: Selection = {
		value: new Date().getMonth().toString(),
		label: 'February'
	};
	let monFilter = new Date().getMonth();

	$: expenses = liveQuery(() => {
		const expenses = db.expenses.filter((exp) => exp.spendDate.getMonth() === monFilter).toArray();
		return expenses;
	});

	interface Selection {
		value: string;
		label: string;
	}

	function filterMonth(event: any) {
		monFilter = parseInt(event.value);
	}
</script>

<ul>
	{#if $expenses}
		<Accordion.Root class="w-full sm:max-w-[70%]">
			{#each $expenses as exp (exp.id)}
				<Accordion.Item value={exp.id?.toString() || ''}>
					<Accordion.Trigger class="">
						<span>{exp.name} </span>
						<span class="flex items-center">
							<span class="text-red-500">-{exp.amount}</span>
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
	{/if}
</ul>
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
