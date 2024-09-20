module.exports = async function (fastify, options) {
    fastify.get('/fortnite/api/cloudstorage/system', async (request, reply) => {
        return reply.code(200).send([]);
    });      
}