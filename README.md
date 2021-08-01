# OneHeart Crowdfunding Project 
This is a project by Team 1 of IMVCS-1101. 

I covered (i) Enterprise Design Thinking (EDT), (ii) developed the coding for the Smart Contract and (iii) profiles in the IBM Blockchain Platform, while the other three members looked into other aspects. 

**Project Outcome**: Out of six, we were the _**only team**_ that had developed a working prototype blockchain architecture. What this means that all the transactions (or, donations) were made via our dedicated OneHeart gateway that I developed. In addition, the donations were added up instantaneously and recorded on the blockchain enforced by the Smart Contract - the most crucial feature demostrating that C.P.I.F had reached. 

**Documentation** I hope that this recording can help future learners embarking on a blockchain development journey, as well as charting out what is next for myself now that the project has ended. But first, a brief outline of what this project is about. Here goes...

--------------------------------------

## Overview
Crowdfunding is a way of raising funds by asking the public for a, large or small, amount of money as a form of donation. This project aims to create a new business process using blockchain technology. 

### Current Situation
Below listed 5 problems with the current business process which our team had identified.

![](images/problem.gif)

### Reviewed Business Process 
Combining the used of blockchain technology and a reviewed on the business process, the proposed solution is as shown.  

![](images/business_process-blockchain.gif)

### Communications
This is the first draft design of the software coding communications flow between client application, blockchain consortium, and authorization and resource servers. 

![](images/features_and_security.png)

### Architecture 
Implementing the software communications flow into the architecture. 

![](images/oneheart_arch.png)

--------------------------------------
## My Coding Development Journey
The codes are modified from open source in the IBM tutorial, tested using 1 and 2 Orgs templates* (2 CA, 2 peer, 1 channel) **before** moving onto the IBM Blockchain Platform. 

(*see Step four*): https://cloud.ibm.com/docs/blockchain-sw-251?topic=blockchain-sw-251-develop-vscode#develop-vscode-guided-tutorials

_**My 2 cents worth...**_ Obviously to build your own blockchain, modify from the examples to form your _Organizations_, _Channels_, _Ordering Services_ and others to suit your needs. I strongly recommend that you copy and paste the tutorials out so that you can make you own notes along the way. Also do screenshoots to capture the changes, and purposely do the wrong steps so that to test out different settings/scenarios. _I did all of these_. Consider this! If plainly follow the tutorial shown below can build up a blockchain, everyone would have successfully done so, **but it is not**. 


**Sample Network Tutorial series**  
IBM has rich tutorial resources! I followed this three-part tutorial series that explain the process of creating a simple multi-node Hyperledger Fabric network that builds on Kubernetes allowing the deployment of a smart contract. Here are some key points to note: 

* Most of the IBM tutorial are in [Hyperledger Fabric v1.4](https://hyperledger-fabric.readthedocs.io/en/release-1.4/), like the one i referenced to. However, I ran it on Fabric v2.x. i.e. the peers and channels created in IBM Blockchain Platform (IBP) must be running a Fabric v2.x image too. You have to catch the difference. 
* The goodness of this tutorial is that it tells you when to check your Wallet, i.e. progressively check if you are on the right direction.
* With sample usernames and pw, it tells you at which configuration to make reference to them, thus making sure you do not go wrong. 

**Tutorial 1 - Build a network**
Follow this tutorial to build up a basic blockchain network with one organization and an ordering service. In my own words, you are playing the role of Developer A for Org A kick-starting a blockchain network.  
> https://cloud.ibm.com/docs/blockchain/howto?topic=blockchain-ibp-console-build-network#ibp-console-build-network  

There are three videos guides embedded in tutorial 1 as shown:
  * [Deploy a peer using the IBM Blockchain Platform](https://www.youtube.com/watch?v=PAC0PPPFxLE&t=15s) 
  * [Deploy an ordering service using the IBM Blockchain Platform](https://www.youtube.com/watch?v=lapmfN_tucg&t=10s) 
  * [Create and join a channel using the IBM Blockchain Platform](https://www.youtube.com/watch?v=iFAl66ee-Qs) 


**Tutorial 2 - Join a network** 
How can a consortium work with just one organization? So, study this tutorial (no video guide for this) to create more organizations and add them the network that you built. What is not stated clearly is that you are playing this role of Developer B from Org B creating your organization **in the different machine** in order to join an existing network created in tutorial 1. This is what in the real-world is happening. For learning purpose, you probably doubled-role and creating the all these on the same machine like what I did. But, know the difference!
> https://cloud.ibm.com/docs/blockchain?topic=blockchain-ibp-console-join-network#ibp-console-join-network


**Tutorial 3 - Deploy a smart contract on the network using Fabric v2.x** 
Finally, deploy your smart contract on a network. 
> https://cloud.ibm.com/docs/blockchain?topic=blockchain-ibp-console-smart-contracts-v2#ibp-console-smart-contracts-v2

--------------------------------------

## Proof Of Concept

With the above, I had successful built, tested and proven a working prototype blockchain which our team presented on 22 July 2021. 


--------------------------------------

## What's Next for Me

The journey never stops. There are more to dive into. 
* configure IBP on different machine simulating a different org while adding more attributes and peers
* develop Smart Contract in other languages with more complexity 
* create cloud native (client) applications to interface with the blockchain
* continue to research deeper into cybersecurity fences 

<b>Above ALL, and Always<b>
 
--------------------------------------
