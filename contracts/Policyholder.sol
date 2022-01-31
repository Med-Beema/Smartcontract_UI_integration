//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Policyholder{
mapping(address => bool) public approvedHolders;
mapping(address => string) public holdersIpfsHash;
uint constant public coverFees = 1 ether;

function depositCoverFees(string memory _ipfsHash) public payable{
    require(msg.value == coverFees);
    approvedHolders[msg.sender]=true;
    holdersIpfsHash[msg.sender]=_ipfsHash;
}

}