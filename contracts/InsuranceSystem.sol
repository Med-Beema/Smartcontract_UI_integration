pragma solidity ^0.8.0;

import "./InvestorToken.sol";

contract InsuranceSystem{

InvestorToken public investorToken;

constructor(address _investorTokenAddress){
    investorToken = InvestorToken(_investorTokenAddress);
}
/*Claim Parameters */
enum ClaimStatus{
    Accepted,
    Rejected,
    Voting 
}
struct ClaimDetails{
        string ClaimIpfs;
        string holdersDetailsIpfsHash;
        ClaimStatus status; 
        uint256 numberOfVotesFor;
        uint256 numberOfVotesAgainst;
        address Claimer;
        uint256 VotingTime;
        uint256 TotalVotes; 
    }
uint public claimID = 0;
mapping(uint => ClaimDetails) public PolicyholdersClaimDetails;

/*Policyholder buy cover fees paramenters*/

mapping(address => bool) public approvedHolders; //Policy holders
mapping(address => string) public holdersDetailsIpfsHash; //policyholder to theirdetailsIpfs 
uint constant public coverFees = 1 ether;
uint constant public claimAmount = 10 ether; 
mapping(address=>uint256) public investedTokens;
mapping(address => bool) public voterHasVoted;

//policyholder buy cover  FOR POLICYHOLDERS

function submitPolicyHolder(string memory _holderDetailsipfsHash) public {
    /////only once 
    
    holdersDetailsIpfsHash[msg.sender]=_holderDetailsipfsHash;
}


function depositCoverFees() public payable{
    /////only once 
    bytes memory detailsIpfs = bytes(holdersDetailsIpfsHash[msg.sender]);
    require(detailsIpfs.length!=0 );
    require(msg.value == coverFees);
    approvedHolders[msg.sender]=true;
    
}


//submit claim  For POLICYHOLDERS
function submitClaim(string memory  _claimIpfs) public returns(uint256){
    bytes memory detailsIpfs = bytes(holdersDetailsIpfsHash[msg.sender]);
        require(detailsIpfs.length!=0 );
        claimID++;
        uint votingStart = block.timestamp+86400; 
        PolicyholdersClaimDetails[claimID] = ClaimDetails( _claimIpfs,holdersDetailsIpfsHash[msg.sender], ClaimStatus.Voting, 0,0,msg.sender,votingStart,0);
        return claimID;

    }
 // FOR POLICYHOLDERS

function getClaimAmount(uint _claimId) public AfterVotingPeriod(_claimId) isPolicyHolder(_claimId) isClaimAccepted(_claimId){
    
    payable(msg.sender).transfer(claimAmount);
}

//depositing capital For INVESTOR
function depostCapital() public payable {
        require(msg.value > coverFees);
        investedTokens[msg.sender]+=msg.value;
        investorToken.transferToken(msg.sender, msg.value*100);


    }

//Voting functions FOR INVESTORS
function votefor(uint256 _claimId) public isNotPolicyHolder(_claimId) BeforeVotingPeriod(_claimId) isInvestor() Hasvoted(){

    PolicyholdersClaimDetails[_claimId].numberOfVotesFor += investedTokens[msg.sender]/(10**18);
    PolicyholdersClaimDetails[_claimId].TotalVotes += investedTokens[msg.sender]/(10**18);
    voterHasVoted[msg.sender] = true;

    }


function voteAgainst(uint256 _claimId) public isNotPolicyHolder(_claimId) BeforeVotingPeriod(_claimId) isInvestor() Hasvoted() {
    
    require(investedTokens[msg.sender] > 0);
   
    PolicyholdersClaimDetails[_claimId].numberOfVotesAgainst += investedTokens[msg.sender]/(10**18); 
    PolicyholdersClaimDetails[_claimId].TotalVotes += investedTokens[msg.sender]/(10**18);

    }

function VotingResults(uint _claimId) public returns(ClaimStatus) {
    
    if(PolicyholdersClaimDetails[_claimId].VotingTime > block.timestamp){
        return PolicyholdersClaimDetails[_claimId].status;
    }
    else if(PolicyholdersClaimDetails[_claimId].VotingTime < block.timestamp){
        uint256 votesForRatio = (PolicyholdersClaimDetails[_claimId].numberOfVotesFor/PolicyholdersClaimDetails[_claimId].TotalVotes)*100;
        if(votesForRatio>=70)
        {
            PolicyholdersClaimDetails[_claimId].status= ClaimStatus.Accepted;
            return PolicyholdersClaimDetails[_claimId].status;
        }
        else {
            PolicyholdersClaimDetails[_claimId].status= ClaimStatus.Rejected;
            return PolicyholdersClaimDetails[_claimId].status;
        }
    }

    


}
//withdraw FOR INVESTOR
function withdrawCapital(uint _amount) public isInvestor(){
    investorToken.burn(msg.sender,_amount*(10**18));
    payable(msg.sender).transfer(_amount*(10**18));
    investedTokens[msg.sender]-= _amount*(10**18);
 }


/*MODIFIERS*/


modifier AfterVotingPeriod(uint256 _claimId) {
    require(PolicyholdersClaimDetails[_claimId].VotingTime < block.timestamp);
    
    _;
}
modifier isPolicyHolder(uint _claimId){
    require(PolicyholdersClaimDetails[_claimId].Claimer==msg.sender);
    _;
}
modifier isClaimAccepted(uint _claimId) {
    require(PolicyholdersClaimDetails[_claimId].status == ClaimStatus.Accepted);
    _;
}
modifier isNotPolicyHolder(uint _claimId){
    require(PolicyholdersClaimDetails[_claimId].Claimer!=msg.sender);
    _;
}
modifier BeforeVotingPeriod(uint256 _claimId) {
    require(PolicyholdersClaimDetails[_claimId].VotingTime > block.timestamp);
    
    _;
}
modifier Hasvoted(){
    require(voterHasVoted[msg.sender] == false);
    _;
}
modifier isInvestor(){
    require(investedTokens[msg.sender]> coverFees);
    _;
}




}