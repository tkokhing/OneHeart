/*

fullAmount == requestAmount

newCampaignId  == campaignRef

updateCampaign  == makeDonation



*/













/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';
import { Campaign } from './campaign';

@Info({title: 'CampaignContract', description: 'OneHeart Project' })
export class CampaignContract extends Contract {
        
    @Transaction(false)
    @Returns('boolean')
    public async campaignExists(ctx: Context, campaignId: string): Promise<boolean> {
        const data: Uint8Array = await ctx.stub.getState(campaignId);
        return (!!data && data.length > 0);
    }

    @Transaction()
    public async createCampaign(ctx: Context, campaignId: string, Requestor: string, patienceInv: string, campaignStory: string, requestAmount: number): Promise<void> {
        const exists: boolean = await this.campaignExists(ctx, patienceInv);
        if (exists) {
            throw new Error(`The campaign using Invoice number:[ ${patienceInv} ] already exists. Please verify your campaign request`);
        }
         
        const campaign: Campaign = new Campaign();
        // takes in all input to campaign(), set initial donate amount system gen campaign ID as 0 
        campaign.requestAmount = requestAmount;
        campaign.donateAddUp = 0;
        campaign.Requestor = Requestor;
        campaign.patienceInv = patienceInv;
        campaign.campaignStory = campaignStory;
        campaign.campaignRef = 0;
        campaign.campaignRef = Number(Math.random().toString(8).substring(5));  
        //currentCampaign.newCampaignId = Math.random().toString(5).substring(3);   
        //campaignId = newCampaignId
        const buffer: Buffer = Buffer.from(JSON.stringify(campaign));
        await ctx.stub.putState(campaignId, buffer);
        console.info('============= Campaign raised successfully, System Generated Reference ID for our reference ===========');
        console.info(campaign.campaignRef);

    }


    @Transaction(false)
    @Returns('Campaign')
    public async readCampaignID(ctx: Context, campaignId: string): Promise<Campaign> {
        const exists: boolean = await this.campaignExists(ctx, campaignId);
        if (!exists) {
            throw new Error(`The campaign ${campaignId} does not exist`);
        }
        const data: Uint8Array = await ctx.stub.getState(campaignId);
        const campaign: Campaign = JSON.parse(data.toString()) as Campaign;
        return campaign;
    }
    /*
    @Transaction(false)
    @Returns('Campaign')
    public async readCampaignInv(ctx: Context, patienceInv: string): Promise<Campaign> {
        const exists: boolean = await this.campaignExists(ctx, patienceInv);
        if (!exists) {
            throw new Error(`The campaign ${patienceInv} does not exist`);
        }
        const data: Uint8Array = await ctx.stub.getState(patienceInv);
        const campaign: Campaign = JSON.parse(data.toString()) as Campaign;
        return campaign;
    }
    */
    @Transaction()
    public async makeDonation(ctx: Context, campaignId: string, newDonationAmount: number): Promise<void> {
        const exists: boolean = await this.campaignExists(ctx, campaignId);
        if (!exists) {
            throw new Error(`The campaign ${campaignId} does not exist`);
        }
        const data: Uint8Array = await ctx.stub.getState(campaignId);
        const campaign: Campaign = JSON.parse(data.toString()) as Campaign;

        campaign.donateAddUp = campaign.donateAddUp + newDonationAmount;
        const buffer: Buffer = Buffer.from(JSON.stringify(campaign));
        await ctx.stub.putState(campaignId, buffer);
    }

    @Transaction()
    public async deleteCampaign(ctx: Context, campaignId: string): Promise<void> {
        const exists: boolean = await this.campaignExists(ctx, campaignId);
        if (!exists) {
            throw new Error(`The campaign ${campaignId} does not exist`);
        }
        await ctx.stub.deleteState(campaignId);
    }


}
