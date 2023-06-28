pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract EventTicket is ERC1155, Ownable {

    // Ticket Data Structure
    struct Ticket {
        unint256 price;
        unint256 maxPerBatch;
        unint256 totalMinted;
    }

    // Mapping of Ticket ID to ticket details
    mapping(unint256 => Ticket) public tickets;

    // USDC contract address
    address public usdcAddress;

    // Events
    event TicketMinted(uint256 indexed id, uint256 amount, uint256 price, uint256 maxPerBatch);
    event maxPerBatchUpdated(uint256 indexed id, ) 

}