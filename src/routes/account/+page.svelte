<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { db } from '$lib/idb';
	import { SquarePen } from 'lucide-svelte';

	async function getAccs() {
		return await db.accounts.toArray();
	}
</script>

{#await getAccs() then accounts}
	{#each accounts as account}
		<div class="flex items-center">
			<span>{account.name}</span>
			<Button href={'/account/edit/' + account.id?.toString()} size="icon"><SquarePen /></Button>
		</div>
	{/each}
{/await}
