/*
/* SPDX-License-Identifier: Apache-2.0
*/

import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';
import { MytwobywoAsset } from './mytwobywo-asset';

@Info({title: 'MytwobywoAssetContract', description: 'My Smart Contract' })
export class MytwobywoAssetContract extends Contract {

    @Transaction(false)
    @Returns('boolean')
    public async mytwobywoAssetExists(ctx: Context, mytwobywoAssetId: string): Promise<boolean> {
        const data: Uint8Array = await ctx.stub.getState(mytwobywoAssetId);
        return (!!data && data.length > 0);
    }

    @Transaction()
    public async createMytwobywoAsset(ctx: Context, mytwobywoAssetId: string, value: string): Promise<void> {
        const exists: boolean = await this.mytwobywoAssetExists(ctx, mytwobywoAssetId);
        if (exists) {
            throw new Error(`The mytwobywo asset ${mytwobywoAssetId} already exists`);
        }
        const mytwobywoAsset: MytwobywoAsset = new MytwobywoAsset();
        mytwobywoAsset.value = Number(value);
        const buffer: Buffer = Buffer.from(JSON.stringify(mytwobywoAsset));
        await ctx.stub.putState(mytwobywoAssetId, buffer);
    }

    @Transaction(false)
    @Returns('MytwobywoAsset')
    public async readMytwobywoAsset(ctx: Context, mytwobywoAssetId: string): Promise<MytwobywoAsset> {
        const exists: boolean = await this.mytwobywoAssetExists(ctx, mytwobywoAssetId);
        if (!exists) {
            throw new Error(`The mytwobywo asset ${mytwobywoAssetId} does not exist`);
        }
        const data: Uint8Array = await ctx.stub.getState(mytwobywoAssetId);
        const mytwobywoAsset: MytwobywoAsset = JSON.parse(data.toString()) as MytwobywoAsset;
        return mytwobywoAsset;
    }

    @Transaction()
    public async updateMytwobywoAsset(ctx: Context, mytwobywoAssetId: string, newValue: string): Promise<void> {
        const exists: boolean = await this.mytwobywoAssetExists(ctx, mytwobywoAssetId);
        if (!exists) {
            throw new Error(`The mytwobywo asset ${mytwobywoAssetId} does not exist`);
        }
        //const mytwobywoAsset: MytwobywoAsset = new MytwobywoAsset();
        const data: Uint8Array = await ctx.stub.getState(mytwobywoAssetId);
        const mytwobywoAsset: MytwobywoAsset = JSON.parse(data.toString()) as MytwobywoAsset;
        //const mytwobywoAsset: MytwobywoAsset = JSON.parse(data.toString()) as MytwobywoAsset;
        //const mytwobywoAsset: MytwobywoAsset = JSON.parse(data.toString   .values()) as MytwobywoAsset;
        //Number(mytwobywoAsset.value)
        //Number(newValue)
        mytwobywoAsset.value = Number(mytwobywoAsset.value) + Number(newValue);
        const buffer: Buffer = Buffer.from(JSON.stringify(mytwobywoAsset));
        await ctx.stub.putState(mytwobywoAssetId, buffer);
    }

    @Transaction()
    public async deleteMytwobywoAsset(ctx: Context, mytwobywoAssetId: string): Promise<void> {
        const exists: boolean = await this.mytwobywoAssetExists(ctx, mytwobywoAssetId);
        if (!exists) {
            throw new Error(`The mytwobywo asset ${mytwobywoAssetId} does not exist`);
        }
        await ctx.stub.deleteState(mytwobywoAssetId);
    }

}
