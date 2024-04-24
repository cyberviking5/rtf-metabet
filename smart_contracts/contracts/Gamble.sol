// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Gamble {
    address private immutable owner;
    uint256 public immutable entryFee;
    uint256 public winner=0;

    struct User {
        bool hasEntered;
    }


    mapping(address => User) public users;
    mapping(address => uint256) public gamblersToAmountBet;
    mapping(address=>uint256) public BetOn;
    address[] public gamblers;

    event UserEntered(address user, uint256 amount);
    event UserWon(address user, uint256 amount);
    event UserLost(address user, uint256 amount);

    constructor(uint256 _entryFee) {
        owner = msg.sender;
        entryFee = _entryFee;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function enter(uint256 Bet_On) public payable {
        require(msg.value >= (entryFee/10**18), "Insufficient entry fee");
        require(!users[msg.sender].hasEntered, "You have already entered");
        gamblersToAmountBet[msg.sender] = msg.value;
        BetOn[msg.sender]=Bet_On;
        gamblers.push(msg.sender);
        users[msg.sender].hasEntered = true;
        emit UserEntered(msg.sender, msg.value);
    }

    function withdraw() public onlyOwner payable  {
        payable(owner).transfer(address(this).balance);
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getEntryFee() public view returns (uint256) {
        return entryFee;
    }

    function getUserEntryStatus(address user) public view returns (bool) {
        return users[user].hasEntered;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function setWinner(uint256 win) public  onlyOwner{
        winner=win;
    }
}