import type { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('meals',(table)=>{
		table.uuid('id')
			.primary();
		
		table.string('name')
			.notNullable();

		table.string('description')
			.notNullable();

		table.dateTime('mealTime')
			.notNullable();

		table.boolean('is_part_of_diet')
			.notNullable();

		table.uuid('user_id')
			.references('user.id')	
			.notNullable();

		table.timestamps(true, true);
	});
}


export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('meals');
}

//Nome, Descrição, Data e Hora, Está dentro ou não da dieta