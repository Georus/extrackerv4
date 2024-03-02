<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { accSchema, db } from '$lib/idb';

	let name: string;
	let type: string;
	let balance = 0;

	let validation: any;

	async function addAccount() {
		validation = accSchema.safeParse({
			name,
			type,
			balance: 0,
			color: 'blue'
		});
		console.log(validation);
		if (validation.success) {
			console.log('trying to add');
			try {
				console.log(validation.data);
				await db.accounts.add(validation.data);
				goto('/');
			} catch (error) {
				console.error(error);
			}
		}
	}
</script>

<section class="p-4">
	<Label>
		Name:
		<Input bind:value={name} />
	</Label>
	<br />
	<Label>
		Balance:
		<Input type="number" bind:value={balance} />
	</Label>
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
			<RadioGroup.Item value="Savings" id="r3" />
			<Label for="r3">Savings</Label>
		</div>
		<RadioGroup.Input name="spacing" />
	</RadioGroup.Root>
	<br />
	<Button on:click={addAccount}>Create</Button>
</section>
