pragma solidity ^0.4.11;

import "zeppelin-solidity/contracts/crowdsale/Crowdsale.sol";
import "zeppelin-solidity/contracts/token/MintableToken.sol";

contract RetToken is MintableToken {
    string public name = "REasSET";
    string public symbol = "RET";
    uint256 public decimals = 5;
    uint256 public INITIAL_SUPPLY = 10000000000;
}

contract RetTokenCrowdsale is Crowdsale {
    function RetTokenCrowdsale(uint256 _startBlock, uint256 _endBlock, uint256 _rate, address _wallet) Crowdsale(_startBlock, _endBlock, _rate, _wallet) {
    }

    function createTokenContract() internal returns (MintableToken) {
        return new RetToken();
    }
}