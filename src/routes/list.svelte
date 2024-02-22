<script>
	import { liveQuery } from 'dexie';
	import { db } from '$lib/idb';
	import * as Accordion from '$lib/components/ui/accordion/';
	import { ChevronDown } from 'lucide-svelte';

	let expenses = liveQuery(() => db.expenses.toArray());
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
