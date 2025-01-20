import { execSync } from 'node:child_process';
import request from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect,it } from 'vitest';
import app from '../app';

describe('Meals routes', ()=>{
	beforeAll(async ()=>{
		await app.ready();
	});

	afterAll(async ()=>{
		await app.close();
	});

	// let cookies:string[] = [];

	beforeEach(async ()=>{
		execSync('npm run knex migrate:rollback --all');

		execSync('npm run knex migrate:latest');
	});

	it('should be able to create a meal', async ()=>{
		const userResponse = await request(app.server)
			.post('/users')
			.send({
				name: 'pedro',
				email: 'pedro@gmail.com',
  
			})
			.expect(201);

		const cookies = userResponse.get('Set-Cookie') ?? [];

		await request(app.server)
			.post('/meals')
			.set('Cookie', cookies)
			.send({
				name: 'Janta',
				description: 'Arroz, feijão e 2 ovos',
				isPartOfDiet: true,
				mealTime: '2025-01-16T20:00:02.331Z'
			}) 
			.expect(201);
	});

	it('should be able to list all meals', async ()=>{
		const userResponse = await request(app.server)
			.post('/users')
			.send({
				name: 'pedro',
				email: 'pedro@gmail.com',

			})
			.expect(201);

		const cookies = userResponse.get('Set-Cookie') ?? [];

		await request(app.server)
			.post('/meals')
			.set('Cookie',cookies)
			.send({
				name: 'Janta',
				description: 'Arroz, feijão e 2 ovos',
				isPartOfDiet: true,
				mealTime: '2025-01-16T20:00:02.331Z'
			});

		const listMealsResponse = await request(app.server)
			.get('/meals') 
			.set('Cookie',cookies)
			.expect(200);

		expect(listMealsResponse.body.meals)
			.toHaveLength(1);

		expect(listMealsResponse.body.meals[0].name)
			.toBe('Janta');
	});

	it('should be able to get a specific meal', async()=>{
		const user = {
			name: 'pedro',
			email: 'pedro@gmail.com',

		};

		const meal = {
			name: 'Janta',
			description: 'Arroz, feijão e 2 ovos',
			isPartOfDiet: true,
			mealTime: '2025-01-16T20:00:02.331Z'
		};

		const expectedMeal = {
			name: 'Janta',
			description: 'Arroz, feijão e 2 ovos',
			is_part_of_diet: 1,
			mealTime: '2025-01-16T20:00:02.331Z'
		};

		const userResponse = await request(app.server)
			.post('/users')
			.send(user)
			.expect(201);

		const cookies = userResponse.get('Set-Cookie') ?? [];

		await request(app.server)
			.post('/meals')
			.set('Cookie',cookies)
			.send(meal);
		
		const listMealsResponse = await request(app.server)
			.get('/meals') 
			.set('Cookie',cookies)
			.expect(200);

		const mealId = listMealsResponse.body.meals[0].id;

		const mealResponse = await request(app.server)
			.get(`/meals/${mealId}`)
			.set('Cookie', cookies)
			.expect(200);

		expect(mealResponse.body)
			.toEqual({meal: expect.objectContaining(expectedMeal)});
	});

	it('should be able to update a meal', async()=>{
		const user = {
			name: 'pedro',
			email: 'pedro@gmail.com',

		};

		const meal = {
			name: 'Janta',
			description: 'Arroz, feijão e 2 ovos',
			isPartOfDiet: true,
			mealTime: '2025-01-16T20:00:02.331Z'
		};

		const mealUpdated = {
			name: 'Almoço',
			description: '3 fatias de pizza',
			isPartOfDiet: false,
			mealTime: '2025-01-16T12:00:02.331Z'
		};

		const mealUpdatedExpected = {
			name: 'Almoço',
			description: '3 fatias de pizza',
			is_part_of_diet: false,
			mealTime: '2025-01-16T12:00:02.331Z'
		};

		const userResponse = await request(app.server)
			.post('/users')
			.send(user)
			.expect(201);

		const cookies = userResponse.get('Set-Cookie') ?? [];

		await request(app.server)
			.post('/meals')
			.set('Cookie',cookies)
			.send(meal);
		
		const listMealsResponse = await request(app.server)
			.get('/meals') 
			.set('Cookie',cookies)
			.expect(200);

		const mealId = listMealsResponse.body.meals[0].id;

		const mealUpdatedResponse = await request(app.server)
			.put(`/meals/${mealId}`)
			.set('Cookie', cookies)
			.send(mealUpdated)
			.expect(200);

		expect(mealUpdatedResponse.body.meal)
			.toEqual(expect.objectContaining(mealUpdatedExpected));
	});

	it('should be able to delete a meal', async()=>{
		const user = {
			name: 'pedro',
			email: 'pedro@gmail.com',

		};

		const meal = {
			name: 'Janta',
			description: 'Arroz, feijão e 2 ovos',
			isPartOfDiet: true,
			mealTime: '2025-01-16T20:00:02.331Z'
		};

	
		const userResponse = await request(app.server)
			.post('/users')
			.send(user)
			.expect(201);

		const cookies = userResponse.get('Set-Cookie') ?? [];

		await request(app.server)
			.post('/meals')
			.set('Cookie',cookies)
			.send(meal);
		
		const listMealsResponse = await request(app.server)
			.get('/meals') 
			.set('Cookie',cookies)
			.expect(200);

		const mealId = listMealsResponse.body.meals[0].id;

		await request(app.server)
			.delete(`/meals/${mealId}`)
			.set('Cookie',cookies)
			.expect(204);
	});

	it('should be able to get summary', async()=>{
		const user = {
			name: 'pedro',
			email: 'pedro@gmail.com',

		};

		const userResponse = await request(app.server)
			.post('/users')
			.send(user)
			.expect(201);

		const cookies = userResponse.get('Set-Cookie') ?? [];

		await request(app.server)
			.post('/meals')
			.set('Cookie',cookies)
			.send({
				name: 'Café da manhã',
				description: '2 pães, queijo e cefé preto',
				isPartOfDiet: true,
				mealTime: '2025-01-16T06:00:02.331Z'
			});
		
		await request(app.server)
			.post('/meals')
			.set('Cookie',cookies)
			.send({
				name: 'Almoço',
				description: 'Arroz, feijão e 2 ovos',
				isPartOfDiet: true,
				mealTime: '2025-01-16T12:00:02.331Z'
			});
		
		await request(app.server)
			.post('/meals')
			.set('Cookie',cookies)
			.send({
				name: 'Café da tarde',
				description: 'Brigadeiro e café preto',
				isPartOfDiet: false,
				mealTime: '2025-01-16T15:00:02.331Z'
			});
		
		await request(app.server)
			.post('/meals')
			.set('Cookie',cookies)
			.send({
				name: 'Janta',
				description: 'Arroz e feijão',
				isPartOfDiet: true,
				mealTime: '2025-01-16T20:00:02.331Z'
			});

		const summaryResponse = await request(app.server)
			.get('/meals/summary')
			.set('Cookie',cookies)
			.expect(200);

		expect(summaryResponse.body.summary)
			.toEqual({
				mealsAmount: 4,
				amountMealsOnDiet: 3,
				amountMealsOutOfDiet: 1,
				bestStreak: 2
	
			});
	});
});