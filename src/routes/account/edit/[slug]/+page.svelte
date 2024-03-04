<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { accSchema, db } from '$lib/idb';
	import { Save, Trash } from 'lucide-svelte';

	export let data;

	let name: string;
	let type: string;
	let balance = 0;
	let color: string;
	let rate: number | undefined;
	let cut: number | undefined;

	let validation: any;

	db.accounts.get(parseInt(data.acc.id)).then((acc) => {
		if (acc) {
			name = acc.name;
			type = acc.type;
			balance = acc.balance || 0;
			color = acc.color;
			rate = acc.rate;
			cut = acc.cut;
		}
	});

	async function putAccount() {
		validation = accSchema.safeParse({
			id: parseInt(data.acc.id),
			name,
			type,
			balance,
			color,
			rate,
			cut
		});
		console.log(validation);
		if (validation.success) {
			console.log('trying to add');
			try {
				console.log(validation.data);
				await db.accounts.put(validation.data);
				goto('/');
			} catch (error) {
				console.error(error);
			}
		}
	}

	async function delAccount() {
		try {
			await db.accounts.delete(parseInt(data.acc.id));
			goto('/');
		} catch (error) {
			console.error(error);
		}
	}
</script>

<section class="p-4">
	<div class="flex justify-end space-x-2">
		<Button variant="destructive" on:click={delAccount}><Trash /></Button>

		<Button on:click={putAccount}><Save /></Button>
	</div>
	<Label>
		Name:*
		<Input bind:value={name} />
	</Label>
	<br />
	<Label>
		Balance:
		{#if type === 'credit'}
			*
		{/if}
		<Input type="number" bind:value={balance} />
	</Label>
	<br />

	<Label for="c1">Color:</Label>
	<input type="color" bind:value={color} id="c1" />
	<br />
	<br />

	<RadioGroup.Root bind:value={type} class="flex justify-between px-4">
		<div class="flex items-center space-x-2">
			<RadioGroup.Item value="debit" id="r1" />
			<Label for="r1">Debit</Label>
		</div>
		<div class="flex items-center space-x-2">
			<RadioGroup.Item value="credit" id="r2" />
			<Label for="r2">Credit</Label>
		</div>
		<div class="flex items-center space-x-2">
			<RadioGroup.Item value="savings" id="r3" />
			<Label for="r3">Savings</Label>
		</div>
		<RadioGroup.Input name="spacing" />
	</RadioGroup.Root>
	<br />

	{#if type === 'credit'}
		<Label>
			Rate:
			<Input type="number" bind:value={rate} />
		</Label>
		<br />
		<Label>
			Cut:
			<Input type="number" bind:value={cut} />
		</Label>
		<br />
	{/if}

	{#if type === 'savings'}
		<div>Work in progress...</div>
	{/if}
</section>
