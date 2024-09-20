const fastify = require('fastify');
const crypto = require('crypto');

const token = crypto.randomBytes(32).toString('hex');
let current_email;

module.exports = async function (fastify, options) {
  fastify.post('/account/api/oauth/token', async (request, reply) => {
    console.log('Received request: ', request.body);
    
    const { grant_type, username, password, token_type } = request.body || {};

    if (grant_type !== 'password') {
        return reply.code(400).send({ error: 'arcane.errors.unsupported_grant_type', error_description: 'Only password grant type is supported' });
    }

    if (!username || !password) {
        return reply.code(400).send({ error: 'arcane.errors.invalid.credentials', error_description: 'Username and password are required' });
    }

    current_email = username;
    
    return reply.code(200).send({
            access_token: token,
            expires_in: 28800,
            expires_at: new Date(Date.now() + 28800 * 1000).toISOString(), 
            token_type: 'bearer',
            refresh_token: token,
            refresh_expires: 86400,
            refresh_expires_at: new Date(Date.now() + 86400 * 1000).toISOString(), 
            account_id: 'ArcaneV2',
            client_id: 'arcane',
            internal_client: true,
            client_service: 'fortnite',
            displayName: 'ArcaneV2',
            app: 'fortnite',
            in_app_id: 'ArcaneV2',
            device_id: 'arcane'
    });
  });

  fastify.post('/account/api/oauth/verify', async (request, reply) => {
    return reply.code(200).send({
            access_token: token,
            expires_in: 28800,
            expires_at: new Date(Date.now() + 28800 * 1000).toISOString(), 
            token_type: 'bearer',
            refresh_token: token,
            refresh_expires: 86400,
            refresh_expires_at: new Date(Date.now() + 86400 * 1000).toISOString(), 
            account_id: 'ArcaneV2',
            client_id: 'arcane',
            internal_client: true,
            client_service: 'fortnite',
            displayName: 'ArcaneV2',
            app: 'fortnite',
            in_app_id: 'ArcaneV2',
            device_id: 'arcane'
    });
  });

  fastify.get('/account/api/public/account/:accountId', async (request, reply) => {
    return reply.code(200).send({
      "id": request.params.accountId,
      "displayName": "ArcaneV2",
      "email": current_email
    });
  });  

  fastify.delete('/account/api/oauth/sessions/kill', async (request, reply) => {
    return reply.code(200).send({ message: 'Sessions killed' });
  });

  fastify.delete('/account/api/oauth/sessions/kill/:token', async (request, reply) => {
    return reply.code(200).send({ message: 'Session killed' });
  });  
};