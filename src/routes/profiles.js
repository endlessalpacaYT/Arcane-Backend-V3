const mongoose = require("mongoose");

const User = require('../Models/user/user.js');
const UserV2 = require('../Models/user/userv2.js');

module.exports = async function (fastify, options) {
    fastify.post('/fortnite/api/game/v2/profile/:accountId/client/QueryProfile', async (request, reply) => {
        const { accountId } = request.params;
    
        let user = await UserV2.findOne({ Account: accountId }) || await User.findOne({ accountId: accountId });
        if (!user) {
            return reply.code(404).send({
                error: 'arcane.errors.user.not_found',
                error_description: 'User not found in mongodb'
            });
        }
        
        let currentRvn = 1;  
        let currentCommandRevision = 0;  

        currentRvn++;  
        currentCommandRevision++;

        const profileData = {
            "created": user.Create || user.created || new Date().toISOString(),
            "updated": new Date().toISOString(),
            "rvn": 1,  
            "wipeNumber": 1,
            "accountId": accountId,
            "profileId": "common_public",
            "version": "no_version",
            "items": {
                "Token:Arcane": {
                    "templateId": "Token:Arcane",
                    "attributes": {
                        "item_seen": true
                    },
                    "quantity": 1
                }
            },
            "stats": {
                "attributes": {
                    "inventory_limit_bonus": 0
                }
            },
            "commandRevision": 0  
        };
    
        return reply.code(200).send(profileData);
    });
    
    fastify.post('/fortnite/api/game/v2/profile/:accountId/client/SetCosmeticLoadout', async (request, reply) => {
        const { accountId } = request.params;
        const { bannerIcon, bannerColor } = request.body || {};
    
        if (!bannerIcon || !bannerColor) {
            return reply.code(400).send({
                error: 'arcane.errors.missing.banner_data',
                error_description: 'Banner icon and color are required'
            });
        }
    
        const profileChanges = {
            profileChanges: [
                {
                    changeType: "itemAttrChanged",
                    itemId: "ArcaneId",  
                    item: {
                        attributes: {
                            banner_icon: bannerIcon,
                            banner_color: bannerColor
                        }
                    }
                }
            ],
            profileRevision: 2,  
            serverTime: new Date().toISOString(),
            responseVersion: 1
        };
    
        return reply.code(200).send(profileChanges);
    });
}