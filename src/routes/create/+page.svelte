<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Calendar } from '$lib/components/ui/calendar';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Popover from '$lib/components/ui/popover';
	import * as Select from '$lib/components/ui/select/index';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { Schema, db } from '$lib/idb';
	import { cn } from '$lib/utils';
	import { today, DateFormatter, getLocalTimeZone, type DateValue } from '@internationalized/date';
	import { Calendar as CalendarIcon } from 'lucide-svelte';
	import { selAccount } from '$lib/store';

	let value: DateValue | undefined = today(getLocalTimeZone());
	let name: string;
	let amount: number;
	let status = '';
	let selection: Selection;
	let transaction = 'expense';
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

		if (transaction === 'expense') amount = amount * -1;

		validation = Schema.safeParse({
			name,
			amount,
			category: selection?.value,
			payDate: spendDate,
			spendDate,
			account: $selAccount
		});
		console.log(validation);
		if (validation.success) {
			console.log('trying to add');
			try {
				console.log(validation.data);
				await db.expenses.add(validation.data);
				goto('/');
			} catch (error) {
				status = `failed to add ${name}`;
			}
		}
	}
</script>

<div class="p-4">
	<fieldset>
		<legend class="my-1 text-lg font-semibold">Add new expense</legend>
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
		<RadioGroup.Root bind:value={transaction} class="flex justify-between px-4">
			<div class="flex items-center space-x-2">
				<RadioGroup.Item value="expense" id="r1" />
				<Label for="r1">Expense</Label>
			</div>
			<div class="flex items-center space-x-2">
				<RadioGroup.Item value="income" id="r2" />
				<Label for="r2">Income</Label>
			</div>
			<div class="flex items-center space-x-2">
				<RadioGroup.Item value="transfer" id="r3" />
				<Label for="r3">Transfer</Label>
			</div>
			<RadioGroup.Input name="spacing" />
		</RadioGroup.Root>
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
	<button on:click={() => console.log(transaction)}>test</button>
</div>
