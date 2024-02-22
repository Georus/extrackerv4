<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Calendar } from '$lib/components/ui/calendar';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Popover from '$lib/components/ui/popover';
	import * as Select from '$lib/components/ui/select/index';
	import { Schema, db } from '$lib/idb';
	import { cn } from '$lib/utils';
	import { DateFormatter, getLocalTimeZone, type DateValue } from '@internationalized/date';
	import { Calendar as CalendarIcon } from 'lucide-svelte';

	let value: DateValue | undefined = undefined;
	let name = 'torito';
	let amount = 800;
	let status = '';
	let selection: Selection;
	let validation: any;

	interface Selection {
		value: 'food' | 'pet' | 'vehicle' | 'housing' | 'lifestyle';
		label: string;
		disabled: boolean;
	}

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	async function addExpense() {
		let spendDate: Date;

		if (value) spendDate = value.toDate('UTC');
		else spendDate = new Date();

		validation = Schema.safeParse({
			name,
			amount,
			category: selection?.value,
			payDate: spendDate,
			spendDate
		});
		console.log(validation);

		try {
			const id = await db.expenses.add({
				name,
				amount,
				category: selection.value,
				payDate: spendDate,
				spendDate
			});

			status = `Friend ${name} successfully added. Got id ${id}`;
			goto('/');
		} catch (error) {
			status = `failed to add ${name}`;
		}
	}
</script>

<div class="p-4">
	<fieldset>
		<p>{status}</p>
		<p>{validation?.error.issues[0].message}</p>
		<legend>Add new expense</legend>
		<Label>
			Name:
			<Input bind:value={name} />
		</Label>
		<br />
		<Label>
			Amount:
			<Input type="number" bind:value={amount} />
		</Label>
		<br />
		<Label>
			Category:
			<Select.Root bind:selected={selection}>
				<Select.Trigger>
					<Select.Value placeholder="Select category"></Select.Value>
				</Select.Trigger>
				<Select.Content>
					<Select.Item value="food">Food</Select.Item>
					<Select.Item value="pet">Pet</Select.Item>
					<Select.Item value="vehicle">Vehicle</Select.Item>
					<Select.Item value="house">House</Select.Item>
				</Select.Content>
			</Select.Root>
		</Label>
		<br />
		<Popover.Root>
			<Popover.Trigger asChild let:builder>
				<Button
					variant="outline"
					class={cn(
						'w-[280px] justify-start text-left font-normal',
						!value && 'text-muted-foreground'
					)}
					builders={[builder]}
				>
					<CalendarIcon class="mr-2 h-4 w-4" />
					{value ? df.format(value.toDate(getLocalTimeZone())) : 'Pick a date'}
				</Button>
			</Popover.Trigger>
			<Popover.Content class="w-auto p-0">
				<Calendar bind:value initialFocus />
			</Popover.Content>
		</Popover.Root>
		<Button class="mt-4" on:click={addExpense}>Add Expense</Button>
	</fieldset>
</div>
