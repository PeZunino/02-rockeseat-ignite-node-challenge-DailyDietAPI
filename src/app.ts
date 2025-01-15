import cookie from '@fastify/cookie';
import fastify from 'fastify';
import { mealsRoutes } from './routes/meals';
import { usersRoutes } from './routes/users';

const app = fastify();

app.register(cookie);

app.register(usersRoutes,{prefix:'/users'});

app.register(mealsRoutes,{prefix:'/meals'});


export default app;