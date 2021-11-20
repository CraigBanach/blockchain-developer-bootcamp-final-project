# Contract security measures

## SWC-100 (Function default visibility)
All functions have an explicit visibility modifier

## SWC-103 (Floating pragma) 
Specific compiler pragma 0.8.9 used in contracts to avoid accidental bug inclusion through outdated compiler versions.

## Proper Use of require, assert and revert
Require used within modifiers to validate input before performing any actions.

## Use modifiers only for validations
Modifiers are only used for validating input

## Pull over push
After a project is cancelled, each user has to withdraw their own funds via pull.