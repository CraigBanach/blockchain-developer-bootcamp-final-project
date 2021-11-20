const { equal } = require("assert");
const { catchRevert } = require("./exceptionsHelpers.js");

const cpf = artifacts.require("CouncilProjectFunding");

contract("CouncilProjectFunding", (accounts) => {
    const [_owner, alice] = accounts;

    const name = "Project 1";
    const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    const fundingNeeded = 1000;
    const thresholdBlock = 2000000;

    beforeEach(async () => {
        instance = await cpf.new();
    });

    describe("State", () => {
        it("should have a projectCount", async () => {
            equal(typeof instance.projectCount, 'function', "the contract has no count of projects");
        });

        it("should have a mapping of projects", async () => {
            equal(typeof instance.projects, 'function', "the contract has no mapping of projects");
        });
    });

    describe("addProject", () => {
        it("should be able to add a project", async () => {
            await instance.addProject(name, description, fundingNeeded, thresholdBlock);

            const result = await instance.projects.call(0);

            equal(
                result.name,
                name,
                "the name of the last added project does not match the expected value",
            );
            equal(
                result.description,
                description,
                "the description of the last added project does not match the expected value",
            );
            equal(
                result.fundingNeeded,
                fundingNeeded,
                "the funding required of the last added project does not match the expected value",
            );
            equal(
                result.thresholdBlock,
                thresholdBlock,
                "the threshold black of the last added project does not match the expected value",
            );
            equal(
                result.currentFundLevel,
                0,
                "the funding level of the last added project does not match the expected value",
            );
            equal(
                result.id,
                0,
                "the id of the last added project does not match the expected value",
            );
        });

        it("Should revert if name not supplied", async () => {
            await catchRevert(instance.addProject("", description, fundingNeeded, thresholdBlock));
        });

        it("Should revert if description not supplied", async () => {
            await catchRevert(instance.addProject(name, "", fundingNeeded, thresholdBlock));
        });

        it("Should revert if funding amount is zero", async () => {
            await catchRevert(instance.addProject(name, description, 0, thresholdBlock));
        });

        it("Should revert if threshold block is zero", async () => {
            await catchRevert(instance.addProject(name, description, fundingNeeded, 0));
        });
    });

    describe("fundProject", () => {
        it("Cannot fund a project that doesn't exist", async () => {
            await catchRevert(instance.fundProject(0));
        })
        
        it("Can fund a project that exists", async () => {
            await instance.addProject(name, description, fundingNeeded, thresholdBlock);
            await instance.fundProject(0, {value: '1000000000000000000'});

            const result = await instance.projects.call(0);

            equal(
                result.currentFundLevel,
                1000000000000000000,
                `the project has not been funded with the supplied ether`,
            );
        })

        it("Multiple accounts can fund a project", async () => {
            await instance.addProject(name, description, fundingNeeded, thresholdBlock);
            await instance.fundProject(0, {value: '1000000000000000000'});
            await instance.fundProject(0, {
                value: '2000000000000000000',
                from: alice
            });

            const result = await instance.projects.call(0);

            equal(
                result.currentFundLevel,
                3000000000000000000,
                `the project has not been funded with the supplied ether`,
            );
        })
    });
});