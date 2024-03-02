import Dexie, { type Table } from 'dexie';
import { z } from 'zod';

export const Schema = z.object({
	id: z.number().optional(),
	amount: z.coerce.number(),
	name: z.string().min(1).max(50),
	category: z.enum(['food', 'pet', 'vehicle', 'housing', 'lifestyle'], {
		errorMap: () => ({ message: 'Category selected required' })
	}),
	payDate: z.date(),
	spendDate: z.date(),
	description: z.string().min(1).max(300).optional(),
	account: z.number().min(0)
});

export type Expense = z.infer<typeof Schema>;

export const accSchema = z.object({
	id: z.number().optional(),
	name: z.string().min(1),
	type: z.enum(['debit', 'credit', 'savings']),
	balance: z.number().min(0).optional(),
	color: z.string(),
	rate: z.number().min(0).optional(),
	cut: z.number().min(1).optional()
});

export type Account = z.infer<typeof accSchema>;

export class subDexie extends Dexie {
	expenses!: Table<Expense>;
	accounts!: Table<Account>;

	constructor() {
		super('LocalExp');
		this.version(1).stores({
			expenses: '++id, amount, name, category, payDate, spendDate, description, account',
			accounts: '++id, name, type, balance, color, rate, cut'
		});
	}
}

export const db = new subDexie();
