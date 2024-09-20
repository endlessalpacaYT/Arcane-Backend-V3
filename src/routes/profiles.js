module.exports = async function (fastify, options) {
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