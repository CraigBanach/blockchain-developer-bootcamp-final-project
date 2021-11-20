# Design patterns used

## Access Control Design Patterns

- `Ownable` design pattern used in two functions: `deployProjectFunds()` and `returnUnusedFunds`.

## Inheritance and Interfaces

- `CouncilProjectFunding` contract inherits the OpenZeppelin `Ownable` contract to enable ownership for sending large amount of funds.