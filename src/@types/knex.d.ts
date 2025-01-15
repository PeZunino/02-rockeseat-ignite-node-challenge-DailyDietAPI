// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Knex} from 'knex';

declare module 'knex/types/tables'{
	export interface Tables{
		users:{
			id:string,
			name:string,
			email:string,
			created_at:string,
			updated_at:string,
			session_id?:string

		},
		meals:{
			id:string,
			name:string,
			description:string,
			mealTime:string,
			is_part_of_diet:boolean,
			created_at: string,
			updated_at: string,
			user_id:string,
		}
	}
}