/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object, Property } from 'fabric-contract-api';

@Object()
export class Campaign {

    @Property()
    // required value that patience owes
    public requestAmount: number;

    // patience invoice from hospital meant to authenticate from Hos server aka Resource Server 
    public patienceInv: string;

    // patience story or plea statement
    public campaignStory: string;

    // for auto creation of campaign ID, to be written to campaignId
    public campaignRef: number

    // Requestor name as registered 
    public Requestor: string;

    // progressive donation receives from public donors
    public donateAddUp: number;

}
