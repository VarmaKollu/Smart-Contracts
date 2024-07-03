const { ethers } = require("hardhat");
const { expect } = require("chai");
const challengeName = "Do Not Trust Challenge";

describe(challengeName, function () {
  let alice, bob;

  const TOKENS_IN_POOL = ethers.utils.parseEther("1000000");

  before(async function () {
    /** SETUP SCENARIO - DON'T CHANGE ANYTHING HERE */
    [alice, bob] = await ethers.getSigners();

    const CalyptusToken = await ethers.getContractFactory("CalyptusToken", alice);
    const DoTrustLender = await ethers.getContractFactory("DoTrustLender", alice);

    this.token = await CalyptusToken.deploy();
    this.pool = await DoTrustLender.deploy(this.token.address);

    await this.token.transfer(this.pool.address, TOKENS_IN_POOL);

    expect(await this.token.balanceOf(this.pool.address)).to.equal(TOKENS_IN_POOL);
    expect(await this.token.balanceOf(bob.address)).to.equal("0");
  });

  it("Exploit", async function () {
    /** CODE YOUR EXPLOIT HERE  */
    const ExploitDoTrustLender = await ethers.getContractFactory("ExploitDoTrustLender", bob);
    const exploit = await ExploitDoTrustLender.deploy(this.pool.address, bob.address);

    await exploit.attack();
  });

  after(async function () {
    /** SUCCESS CONDITIONS */
    if (
      expect(await this.token.balanceOf(bob.address)).to.equal(TOKENS_IN_POOL) &&
      expect(await this.token.balanceOf(this.pool.address)).to.equal("0")
    ) {
      console.log(`You have passed the ${challengeName}.`);
    }
  });
});
