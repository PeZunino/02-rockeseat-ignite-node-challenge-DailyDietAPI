import { randomUUID } from 'node:crypto';
import { FastifyInstance } from 'fastify';
import {z} from 'zod';
import knex from '../database';
import { verifySessionIdExistence } from '../middlewares/verify-session-id-existence';

export function mealsRoutes(server:FastifyInstance){

	server.delete('/:id',{
		preHandler:[
			verifySessionIdExistence
		]
	},async (request,response)=>{
		const deleteMealParamsSchema = z.object({
			id: z.string()
				.uuid()
		});
    
		const {id} = deleteMealParamsSchema.parse(request.params);

		const mealToBeRemoved = await knex('meals')
			.where({id})
			.first();

		if(!mealToBeRemoved){
			return response.status(404)
				.send({message: 'meal not found'});
		}

		await knex('meals')
			.where({id})
			.del();
    
		response.status(204);
	});

	server.put('/:id', {
		preHandler:[
			verifySessionIdExistence
		]
	},async (request,response)=>{
		
		const updateMealParamsSchema = z.object({
			id: z.string()
				.uuid()
		});
    
		const {id} = updateMealParamsSchema.parse(request.params);

		const mealToBeUpdated = await knex('meals')
			.where({id})
			.first();

		if(!mealToBeUpdated){
			return response.status(404)
				.send({message: 'meal not found'});
		}
    
		const editMealSchema = z.object({
			name: z.string()
				.nullable()
				.optional(),
			description: z.string()
				.nullable()
				.optional(),
			mealTime: z.coerce.date()
				.nullable()
				.optional(),
			isPartOfDiet: z.boolean()
				.nullable()
				.optional(),
		});

		const {
			description:newValueDescription,
			isPartOfDiet: newValueIsPartOfDiet,
			mealTime: newValueMealTime,
			name: newValueName
		} = editMealSchema.parse(request.body);

		const {
			description: currentDescription,
			is_part_of_diet: currentIsPartOfDiet, 
			mealTime: currentMealTime,
			name: currentName
		} = mealToBeUpdated;


		const newMealData = {
			description: newValueDescription ?? currentDescription,
			is_part_of_diet: newValueIsPartOfDiet ?? currentIsPartOfDiet,
			name: newValueName ?? currentName,
			mealTime: newValueMealTime?.toISOString() ?? currentMealTime,
		};
    
		await knex('meals')
			.where({id})
			.update(newMealData);
    
		response.status(200)
			.send({newMealData});
	});

	server.post('/',{
		preHandler:[
			verifySessionIdExistence
		]
	},async (request,response)=>{
		
		const createMealSchema = z.object({
			name: z.string(),
			description: z.string(),
			mealTime: z.coerce.date(),
			isPartOfDiet: z.boolean(),
		});
    
		const {
			description,isPartOfDiet,mealTime,name
		} = createMealSchema.parse(request.body);
    
		await knex('meals')
			.insert({
				id:randomUUID(),
				description,
				is_part_of_diet: isPartOfDiet,
				mealTime:new Date(mealTime)
					.toISOString(),
				name
			});

    
		response.status(200);
	
	});

	server.get('/:id', {
		preHandler:[
			verifySessionIdExistence
		]
	},async (request,response)=>{
		const getMealParamsSchema = z.object({
			id: z.string()
				.uuid()
		});
    
		const {id} = getMealParamsSchema.parse(request.params);

		const meal = await knex('meals')
			.where({id})
			.first();

		if(!meal){
			return response.status(404)
				.send({message: 'meal not found'});
		}
      
		response.status(200)
			.send({meal});
	});

	server.get('/',{
		preHandler:[
			verifySessionIdExistence
		]
	},async (request,response)=>{

		const {sessionId} = request.cookies;

		const meals = await knex('meals')
			.where('user_id',sessionId)
			.first();

		response.status(200)
			.send({meals});
	});
}