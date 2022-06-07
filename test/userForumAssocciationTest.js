const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const mockServer = require("mockttp").getLocal();

const { expect } = chai;

describe('Chai-fetch', () => {
    beforeEach(() => mockServer.start(8080));
    afterEach(() => mockServer.stop());

    describe('.responseText', () => {
        it('should match responses with matching bodies', () => {
            mockServer.forGet('/usersForums/1/2').thenReply(201, 'matching body')
            .then(() =>
                expect(fetch('http://localhost:4444/usersForums/1/2')).to.have.responseText('matching body')
            );
        });
    });
});