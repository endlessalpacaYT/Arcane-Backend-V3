const fastify = require('fastify');
const crypto = require('crypto');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const User = require('../Models/user/user.js');
const UserV2 = require('../Models/user/userv2.js');
const { error } = require('console');

const token = crypto.randomBytes(32).toString('hex');
let current_email;
let current_username;
let current_accountId;

module.exports = async function (fastify, options) {
  fastify.post('/account/api/oauth/token', async (request, reply) => {
    console.log('Received request: ', request.body);
    
    const { grant_type, username, password, token_type } = request.body || {};

    if (grant_type !== 'password') {
        console.error("A Unsupported Grant Type Was Requested: " + grant_type);
        return reply.code(400).send({
                error: 'arcane.errors.unsupported_grant_type',
                error_description: 'Only password grant type is supported' 
        });
    }

    if (!username || !password) {
        console.error("Missing Credentials On Login");
        return reply.code(400).send({
                error: 'arcane.errors.missing.credentials',
                error_description: 'Username and password are required' 
        });
    }

    let user = await UserV2.findOne({ Email: username }) || await User.findOne({ email: username });
    if (!user) {
        console.error("User Not Found In DB")
        return reply.code(404).send({
            error: 'arcane.errors.user.not_found',
            error_description: 'User not found in mongodb'
        })
    } else {
        const validPassword = await bcrypt.compare(password, user.Password || user.password);
        if (!validPassword) {
            console.error("An Invalid Password Was Sent");
            return reply.code(400).send({
                error: 'arcane.errors.invalid_password',
                error_description: 'An invalid password was sent'
            })
        }
        current_email = username;
        current_username = user.Username || user.username;
        if (!current_username){
            console.error("Username Not Found In The User Model");
            reply.code(404).send({
                error: 'arcane.errors.username.not_found',
                error_description: 'Username not found in the user model'
            })
        }
        current_accountId = user.Account || user.accountId;
        if (!current_accountId) {
            console.error("AccountID Is Not Found In The User Model");
            return reply.code(404).send({
                error: 'arcane.errors.accoundid.not_found',
                error_description: 'AccountID not found in the user model'
            })
        }
    }
    
    return reply.code(200).send({
            access_token: token,
            expires_in: 28800,
            expires_at: new Date(Date.now() + 28800 * 1000).toISOString(), 
            token_type: 'bearer',
            refresh_token: token,
            refresh_expires: 86400,
            refresh_expires_at: new Date(Date.now() + 86400 * 1000).toISOString(), 
            account_id: current_accountId,
            client_id: 'arcane',
            internal_client: true,
            client_service: 'fortnite',
            displayName: current_username,
            app: 'fortnite',
            in_app_id: current_accountId,
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
            account_id: current_accountId,
            client_id: 'arcane',
            internal_client: true,
            client_service: 'fortnite',
            displayName: current_username,
            app: 'fortnite',
            in_app_id: current_accountId,
            device_id: 'arcane'
    });
  });

  fastify.get('/account/api/public/account/:accountId', async (request, reply) => {
    return reply.code(200).send({
      "id": request.params.accountId,
      "displayName": current_username,
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