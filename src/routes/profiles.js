const mongoose = require("mongoose");

const User = require('../Models/user/user.js');
const UserV2 = require('../Models/user/userv2.js');
const BattlePass = require('../Models/profile/BattlePass.js');

const athena = require("../responses/DefaultProfiles/athena.json");

module.exports = async function (fastify, options) {
    fastify.post('/fortnite/api/game/v2/profile/:accountId/client/QueryProfile', async (request, reply) => {
        const { accountId } = request.params;
    
        let user = await UserV2.findOne({ Account: accountId }) || await User.findOne({ accountId: accountId });
        if (!user) {
            return reply.code(404).send({
                error: 'arcane.errors.user_not_found',
                error_description: 'User not found in the database'
            });
        }

        let battlePass = await BattlePass.findOne({ accountId });
        if (!battlePass) {
            battlePass = new BattlePass({ accountId });
            await battlePass.save();
        }
    
        const updatedProfile = {
            ...athena,
            battlePass: {
                currentLevel: battlePass.currentLevel,
                currentTier: battlePass.currentTier,
                unlockedRewards: battlePass.unlockedRewards
            }
        };
    
        return reply.code(200).send(updatedProfile);
    });
    
    fastify.post('/fortnite/api/game/v2/profile/:accountId/client/SetCosmeticLoadout', async (request, reply) => {
        const { accountId } = request.params;
        const { bannerIcon, bannerColor } = request.body || {};
    
        return reply.code(200).send(athena);
    });
}