import fastify from 'fastify';

const server = fastify();

server.listen({port: 3333})
	.then(()=>console.log('Listen on port 3333'));