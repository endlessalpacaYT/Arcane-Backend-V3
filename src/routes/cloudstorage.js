module.exports = async function (fastify, options) {
    fastify.post('/fortnite/api/cloudstorage/system', async (request, reply) => {
        return reply.code(200).send([]);
    });
    
    fastify.get('/fortnite/api/cloudstorage/user/:accountId', async (request, reply) => {
        const { accountId } = request.params;
    
        return reply.code(200).send([
        {
        uniqueFilename: `${accountId}-ClientSettings.Sav`,
        filename: 'ClientSettings.Sav',
        hash: 'd41d8cd98f00b204e9800998ecf8427e',
        hash256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        length: 0,
        contentType: 'application/octet-stream',
        uploaded: new Date().toISOString(),
        storageType: 'S3',
        },
        ]);
    });
    
    fastify.post('/fortnite/api/cloudstorage/user/:accountId/file/:fileName', async (request, reply) => {
        const { accountId, fileName } = request.params;
    
        console.log(`Uploaded file: ${fileName} for account: ${accountId}`);
        return reply.code(200).send({
          uniqueFilename: `${accountId}-${fileName}`,
          filename: fileName,
          hash: 'd41d8cd98f00b204e9800998ecf8427e',
          hash256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
          length: 0,
          contentType: 'application/octet-stream',
          uploaded: new Date().toISOString(),
          storageType: 'S3',
        });
    });    
}