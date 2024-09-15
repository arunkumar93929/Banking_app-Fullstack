// Using Fetch API to interact with the backend

// Create Account
document.getElementById('createAccountForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const accountHolderName = document.getElementById('accountHolderName').value;
    const balance = document.getElementById('initialBalance').value;

    const response = await fetch('http://localhost:8080/api/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountHolderName, balance })
    });

    const result = await response.json();
    alert('Account created successfully: ' + result.id);
});

// Deposit
document.getElementById('depositForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const accountId = document.getElementById('depositAccountId').value;
    const amount = document.getElementById('depositAmount').value;

    await fetch(`http://localhost:8080/api/accounts/${accountId}/deposit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
    });

    alert('Deposit successful!');
});

// Withdraw
document.getElementById('withdrawForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const accountId = document.getElementById('withdrawAccountId').value;
    const amount = document.getElementById('withdrawAmount').value;

    await fetch(`http://localhost:8080/api/accounts/${accountId}/withdraw`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
    });

    alert('Withdrawal successful!');
});

// Delete Account
document.getElementById('deleteAccountForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const accountId = document.getElementById('deleteAccountId').value;

    await fetch(`http://localhost:8080/api/accounts/${accountId}`, {
        method: 'DELETE'
    });

    alert('Account deleted successfully!');
});

// Load Accounts
document.getElementById('loadAccounts').addEventListener('click', async () => {
    const response = await fetch('http://localhost:8080/api/accounts');
    const accounts = await response.json();

    const accountList = document.getElementById('accountList');
    accountList.innerHTML = ''; // Clear the list before loading

    accounts.forEach(account => {
        const li = document.createElement('li');
        li.textContent = `ID: ${account.id} - ${account.accountHolderName}, Balance: $${account.balance}`;
        accountList.appendChild(li);
    });
});
