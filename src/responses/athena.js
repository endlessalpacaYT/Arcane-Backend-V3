const fs = require('fs');
const path = require('path');

module.exports = async function (fastify, options) {
    fastify.post('/fortnite/api/game/v2/profile/:accountId/client/ClientQuestLogin', async (request, reply) => {
        const { accountId } = request.params;
    
        const profileData = require("./DefaultProfiles/athena.json");
    
        return reply.code(200).send(profileData);
    });
    
    fastify.post("/fortnite/api/game/v2/profile/:accountId/client/:operation", async (request, reply) => {
        const { operation } = request.params;
        
        const profilesPath = path.join(__dirname, './DefaultProfiles');
        
        const loadProfile = (profileName) => {
          const filePath = path.join(profilesPath, `${profileName}.json`);
          if (fs.existsSync(filePath)) {
            return JSON.parse(fs.readFileSync(filePath, 'utf8'));
          } else {
            return null;
          }
        };
        
        switch (operation) {
          case "QueryProfile":
            const profileData = loadProfile('athena'); 
            if (profileData) {
              return reply.code(200).send(profileData);
            } else {
              return reply.code(404).send({
                errorCode: "arcane.errors.profile_not_found",
                errorMessage: "Profile data not found",
                numericErrorCode: 404
              });
            }
    
          case "ClientQuestLogin":
            const questProfile = loadProfile('campaign'); 
            if (questProfile) {
              return reply.code(200).send(questProfile);
            } else {
              return reply.code(404).send({
                errorCode: "arcane.errors.quest_profile_not_found",
                errorMessage: "Quest profile data not found",
                numericErrorCode: 404
              });
            }
    
          case "BulkEquipBattleRoyaleCustomization":
            const athenaProfile = loadProfile('athena'); 
            if (athenaProfile) {
              athenaProfile.customization = {
                "character": "AthenaCharacter:CID_001_Athena_Commando_F_Default",
                "backpack": "AthenaBackpack:DefaultBackpack",
                "pickaxe": "AthenaPickaxe:DefaultPickaxe",
                "emote": "AthenaDance:EID_DanceMoves"
              };
              return reply.code(200).send(athenaProfile);
            } else {
              return reply.code(404).send({
                errorCode: "arcane.errors.athena_profile_not_found",
                errorMessage: "Athena profile not found",
                numericErrorCode: 404
              });
            }
    
          case "SetMtxPlatform":
            const commonCoreProfile = loadProfile('common_core'); 
            if (commonCoreProfile) {
              commonCoreProfile.mtxPlatform = "eg1~ArcaneV2";
              return reply.code(200).send(commonCoreProfile);
            } else {
              return reply.code(404).send({
                errorCode: "arcane.errors.mtx_platform_not_found",
                errorMessage: "MTX platform not found",
                numericErrorCode: 404
              });
            }
    
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