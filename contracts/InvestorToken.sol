pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract InvestorToken is ERC20{

    address public minter;
    constructor() ERC20("Investor Token", "ITKN"){
        minter = msg.sender;
        _mint(minter, 10000*(10**18));
       
    }
    function transferToken(address _buyer, uint amount) external {
        _transfer(minter, _buyer , amount);
    }
    function burn(address _tokenholder, uint _amount) external {
        _burn(_tokenholder, _amount);
    }

}