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
	export let data;

	let value: DateValue | undefined = undefined;
	let name: string;
	let amount: number;
	let status: string;
	let selection: Selection;
	let validation: any;

	async function getExp() {
		const expense = await db.expenses.get(parseInt(data.exp.id));
		if (expense) {
			name = expense.name;
			amount = expense.amount;
			selection = {
				value: expense.category,
				label: expense.category.charAt(0).toUpperCase() + expense.category.slice(1),
				disabled: false
			};
		}
	}
	getExp();

	interface Selection {
		value: 'food' | 'pet' | 'vehicle' | 'housing' | 'lifestyle';
		label: string;
		disabled: boolean;
	}

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	async function putExpense() {
		let spendDate: Date;

		if (value) spendDate = value.toDate('UTC');
		else spendDate = new Date();

		validation = Schema.safeParse({
			name,
			amount,
			category: selection?.value,
			payDate: spendDate,
			spendDate,
			account: 0
		});
		console.log(validation);

		if (validation.success) {
			try {
				const id = await db.expenses.put({
					id: parseInt(data.exp.id),
					name,
					amount: typeof amount === 'string' ? parseInt(amount) : amount,
					category: selection.value,
					payDate: spendDate,
					spendDate,
					account: 0
				});

				status = `Friend ${name} successfully added. Got id ${id}`;
				goto('/');
			} catch (error) {
				status = `failed to add ${name}`;
			}
		}
	}
	async function delExpense() {
		try {
			await db.expenses.delete(parseInt(data.exp.id));
			goto('/');
		} catch (error) {
			console.error(error);
		}
	}
</script>

<div class="p-4">
	<fieldset>
		<p>{status}</p>
		<p>{validation?.error?.issues[0].message}</p>
		<legend>Eddit expense</legend>
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
		<Button class="mt-4" on:click={putExpense}>Update</Button>
		<Button variant="destructive" class="mt-4" on:click={delExpense}>Delete</Button>
	</fieldset>
</div>
