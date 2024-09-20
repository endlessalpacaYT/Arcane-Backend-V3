module.exports = async function (fastify, options) {
    fastify.post('/fortnite/api/game/v2/profile/:accountId/client/ClientQuestLogin', async (request, reply) => {
        const { accountId } = request.params;
    
        const profileData = {
            "profileRevision": 1,
            "profileId": "athena",
            "profileChangesBaseRevision": 1,
            "profileChanges": [
                {
                    "changeType": "itemAdded",
                    "itemId": "item123",
                    "item": {
                        "templateId": "CosmeticLocker:cosmeticlocker_athena",
                        "attributes": {
                            "locker_slots_data": {
                                "slots": {
                                    "Character": {
                                        "items": ["AthenaCharacter:CID_001_Athena_Commando_F_Default"]
                                    },
                                    "Backpack": {
                                        "items": ["AthenaBackpack:DefaultBackpack"]
                                    },
                                    "Pickaxe": {
                                        "items": ["AthenaPickaxe:DefaultPickaxe"]
                                    },
                                    "Dance": {
                                        "items": ["AthenaDance:EID_DanceMoves"]
                                    }
                                }
                            },
                            "item_seen": true,
                            "favorite": false
                        }
                    }
                }
            ],
            "commandRevision": 1,
            "serverTime": new Date().toISOString(),
            "responseVersion": 1
        };
    
        return reply.code(200).send(profileData);
    });
    
    fastify.post("/fortnite/api/game/v2/profile/:accountId/client/:operation", async (request, reply) => {
        const { operation } = request.params;
    
        switch (operation) {
            case "QueryProfile":
            case "ClientQuestLogin":
            case "RefreshExpeditions":
            case "GetMcpTimeForLogin":
            case "IncrementNamedCounterStat":
            case "SetHardcoreModifier":
            case "SetMtxPlatform":
            case "BulkEquipBattleRoyaleCustomization":
                return reply.code(200).send();  
            default:
                return reply.code(404).send({
                    errorCode: "arcane.errors.operation_not_found",
                    errorMessage: `Operation ${operation} not valid`,
                    messageVars: [operation],
                    numericErrorCode: 16035
                });
        }
    });
}