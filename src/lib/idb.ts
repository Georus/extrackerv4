import Dexie, { type Table } from 'dexie';
import { z } from 'zod';

export const Schema = z.object({
	id: z.number().optional(),
	amount: z.number().positive(),
	name: z.string().min(1).max(50),
	category: z
		.enum(['food', 'pet', 'vehicle', 'housing', 'lifestyle'], {
			errorMap: (issue, ctx) => ({ message: 'Select category needed' })
		})
		.nullable(),
	payDate: z.date(),
	spendDate: z.date(),
	description: z.string().min(1).max(300).optional()
});

type Expense = z.infer<typeof Schema>;

export class subDexie extends Dexie {
	expenses!: Table<Expense>;

	constructor() {
		super('LocalExp');
		this.version(1).stores({
			expenses: '++id, amount, name, category, payDate, spendDate, description'
		});
	}
}
export const db = new subDexie();
