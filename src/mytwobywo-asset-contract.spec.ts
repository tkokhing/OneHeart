/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context } from 'fabric-contract-api';
import { ChaincodeStub, ClientIdentity } from 'fabric-shim';
import { MytwobywoAssetContract } from '.';

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

describe('MytwobywoAssetContract', () => {

    let contract: MytwobywoAssetContract;
    let ctx: TestContext;

    beforeEach(() => {
        contract = new MytwobywoAssetContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"mytwobywo asset 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"mytwobywo asset 1002 value"}'));
    });

    describe('#mytwobywoAssetExists', () => {

        it('should return true for a mytwobywo asset', async () => {
            await contract.mytwobywoAssetExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a mytwobywo asset that does not exist', async () => {
            await contract.mytwobywoAssetExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createMytwobywoAsset', () => {

        it('should create a mytwobywo asset', async () => {
            await contract.createMytwobywoAsset(ctx, '1003', 'mytwobywo asset 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"mytwobywo asset 1003 value"}'));
        });

        it('should throw an error for a mytwobywo asset that already exists', async () => {
            await contract.createMytwobywoAsset(ctx, '1001', 'myvalue').should.be.rejectedWith(/The mytwobywo asset 1001 already exists/);
        });

    });

    describe('#readMytwobywoAsset', () => {

        it('should return a mytwobywo asset', async () => {
            await contract.readMytwobywoAsset(ctx, '1001').should.eventually.deep.equal({ value: 'mytwobywo asset 1001 value' });
        });

        it('should throw an error for a mytwobywo asset that does not exist', async () => {
            await contract.readMytwobywoAsset(ctx, '1003').should.be.rejectedWith(/The mytwobywo asset 1003 does not exist/);
        });

    });

    describe('#updateMytwobywoAsset', () => {

        it('should update a mytwobywo asset', async () => {
            await contract.updateMytwobywoAsset(ctx, '1001', 'mytwobywo asset 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"mytwobywo asset 1001 new value"}'));
        });

        it('should throw an error for a mytwobywo asset that does not exist', async () => {
            await contract.updateMytwobywoAsset(ctx, '1003', 'mytwobywo asset 1003 new value').should.be.rejectedWith(/The mytwobywo asset 1003 does not exist/);
        });

    });

    describe('#deleteMytwobywoAsset', () => {

        it('should delete a mytwobywo asset', async () => {
            await contract.deleteMytwobywoAsset(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a mytwobywo asset that does not exist', async () => {
            await contract.deleteMytwobywoAsset(ctx, '1003').should.be.rejectedWith(/The mytwobywo asset 1003 does not exist/);
        });

    });

});
