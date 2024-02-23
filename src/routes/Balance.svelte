<script>
	import { db } from '$lib/idb';

	let debit = 10000;
	let credit = 32000;

	// db.expenses
	// 	.filter((exp) => exp.spendDate.getMonth() === 2)
	// 	.toArray()
	// 	.then((exps) => {
	// 		for (const exp of exps) {
	// 			console.log(exp);
	// 		}
	// 	});
</script>

<div class="grid grid-cols-2 gap-2">
	<div class="flex justify-between rounded bg-blue-600 p-1">
		<span>Debit</span>
		<span>{debit}</span>
	</div>
	<div class="flex justify-between rounded bg-yellow-600 p-1">
		<span>Credit</span>
		<span>{credit}</span>
	</div>
</div>
