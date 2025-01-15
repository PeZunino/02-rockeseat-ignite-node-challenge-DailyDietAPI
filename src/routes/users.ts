import {randomUUID} from 'node:crypto';
import { FastifyInstance } from 'fastify';
import {z} from 'zod';
import knex from '../database';
export async function usersRoutes(server:FastifyInstance){

	server.get('/', async (request,response)=>{
		const users = await knex('users')
			.select();

		response.status(200)
			.send(users);
	});

	server.post('/',async (request, response)=>{

		const createUserSchema = z.object({
			name: z.string(),
			email: z.string()
				.email()
		});

		const {
			email,name
		} = createUserSchema.parse(request.body);
  
		await knex('users')
			.insert({
				id: randomUUID(),
				name,
				email,
			});

		response.status(201)
			.send();
	});
}