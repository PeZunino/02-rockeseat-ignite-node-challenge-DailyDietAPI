import { execSync } from 'node:child_process';
import request from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect,it } from 'vitest';
import app from '../app';

describe('User routes', ()=>{
	beforeAll(async ()=>{
		await app.ready();
	});

	afterAll(async()=>{
		await app.close();
	});

	beforeEach(()=>{
		execSync('npm run knex migrate:rollback --all');

		execSync('npm run knex migrate:latest');
	});

	it('should be able to create a user', async()=>{
		await request(app.server)
			.post('/users')
			.send({
				name: 'pedro',
				email: 'pedro@gmail.com',
			})
			.expect(201);
	});

	it('should be able to list all users', async()=>{
		const newUser = {
			name: 'pedro',
			email: 'pedro@gmail.com',

		};

		const createUserResponse = await request(app.server)
			.post('/users')
			.send(newUser)
			.expect(201);

		const cookies = createUserResponse.get('Set-Cookie') ?? [];

		const listUsersResponse = await request(app.server)
			.get('/users')
			.set('Cookie',cookies)
			.expect(200);

		console.log('listUsersResponse',listUsersResponse.body.users);

		console.log('newUser',newUser);

		expect(listUsersResponse.body.users)
			.toEqual([
				expect.objectContaining(newUser)
			]);
	});
});