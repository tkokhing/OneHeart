/*

fullAmount == requestAmount

newCampaignId  == campaignRef

updateCampaign  == makeDonation


*/



/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context } from 'fabric-contract-api';
import { ChaincodeStub, ClientIdentity } from 'fabric-shim';
import { CampaignContract } from '.';

import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import winston = require('winston');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext implements Context {
    public stub: sinon.SinonStubbedInstance<ChaincodeStub> = sinon.createStubInstance(ChaincodeStub);
    public clientIdentity: sinon.SinonStubbedInstance<ClientIdentity> = sinon.createStubInstance(ClientIdentity);
    public logger = {
        getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
        setLevel: sinon.stub(),
     };
}

describe('CampaignContract', () => {

    let contract: CampaignContract;
    let ctx: TestContext;

    beforeEach(() => {
        contract = new CampaignContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"campaign 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"campaign 1002 value"}'));
    });

    describe('#campaignExists', () => {

        it('should return true for a campaign', async () => {
            await contract.campaignExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a campaign that does not exist', async () => {
            await contract.campaignExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#Create A New Campaign', () => {

        it('should create a campaign', async () => {
            await contract.createCampaign(ctx, '1003', 'Requestor','Patience Invoice','Patience Story',1000);
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"campaign 1003 value"}'));
        });

        it('should throw an error for a campaign that already exists', async () => {
            await contract.createCampaign(ctx, '1003', 'Requestor','Patience Invoice','Patience Story',1000).should.be.rejectedWith(/The campaign 1003 already exists/);
        });

    });

    describe('#Query A Campaign using ID', () => {

        it('should return a campaign', async () => {
            await contract.readCampaignID(ctx, '1001').should.eventually.deep.equal({ value: 'campaign 1001 value' });
        });

        it('should throw an error for a campaign that does not exist', async () => {
            await contract.readCampaignID(ctx, '1003').should.be.rejectedWith(/The campaign 1003 does not exist/);
        });

    });
    /*
    describe('#Query A Campaign using Invoice number', () => {

        it('should return a campaign', async () => {
            await contract.readCampaignInv(ctx, 'ID = 1001').should.eventually.deep.equal({ value: 'campaign ID 1001 value' });
        });

        it('should throw an error for a campaign that does not exist', async () => {
            await contract.readCampaignInv(ctx, 'ID = 1003').should.be.rejectedWith(/The campaign ID 1003 does not exist/);
        });

    });
    */

    describe('#Donate to Campaign', () => {

        it('should update a campaign', async () => {
            await contract.makeDonation(ctx, '1001', 10000);
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"campaign 1001 new value"}'));
        });

        it('should throw an error for a campaign that does not exist', async () => {
            await contract.makeDonation(ctx, '1003', 10000).should.be.rejectedWith(/The campaign 1003 does not exist/);
        });

    });

    describe('#Conclude a Campaign', () => {

        it('should delete a campaign', async () => {
            await contract.deleteCampaign(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a campaign that does not exist', async () => {
            await contract.deleteCampaign(ctx, '1003').should.be.rejectedWith(/The campaign 1003 does not exist/);
        });

    });

});