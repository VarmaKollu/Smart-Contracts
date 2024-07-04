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

To exploit the  Do Trust Lender pool, you can follow these steps in the reenter.js test file:

#### *Steps to Exploit*

- Bob deploys `ReentersBob`, a contract designed to exploit `DoTrustLender`.

- `ReentersBob` calls `flashLoan` and manipulates its state before the final balance check, allowing Bob to drain all tokens into his account.

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
- The `flashLoan` function in `DoTrustLender` allows borrowing tokens without proper checks on the `target` contract's actions. This enables re-entrancy attacks where the `target` contract can repeatedly call back into `DoTrustLender`, manipulating token balances before final checks.

- Utilize the `ReentersBob` contract to perform the attack. This contract must be created and deployed with Alice's permissions.

- Connect Bob's address to `ReentersBob` and execute the `attack` function to exploit the vulnerability.

---

## Challenge 3

### Re-enter

To exploit the  simple lending pool that allows its users to deposit ETH, you can follow these steps in the reenter.js test file:

#### *Steps to Exploit*

- The smart contract `ReenterPool.sol` allows users to deposit ETH, withdraw ETH, and execute flash loans. It has a reentrancy vulnerability in the `withdraw` function.

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
-     Setup: Initializes Alice and Bob as signers and deploys the ReenterPool contract with an initial balance of 1000 ETH.
- Exploit: Bob deploys a contract ReentersBob that utilizes a reentrancy attack via the withdraw function of ReenterPool. The attack allows Bob's contract to repeatedly withdraw ETH from Alice's pool before updating the balance.

