// Transactions
let balance = 5000;
let transaction = [];

document.addEventListener("DOMContentLoaded", () => {
    const balanceDisplay = document.getElementById("balance"); 
    const transactionHistory = document.getElementById("transactionHistory");
    const amountInput = document.getElementById("amount");
    
    // Save transactions to localStorage
    const saveTransactions = () => {
        localStorage.setItem("transactions", JSON.stringify(transaction));
    };

    // Load transactions from localStorage
    const loadTransactions = () => {
        const savedTransactions = localStorage.getItem("transactions");
        if (savedTransactions) {
            transaction = JSON.parse(savedTransactions);
            balance = transaction.length ? transaction[transaction.length - 1].balance : 5000;
            updateBalance();
            renderTransaction();
        }
    };

    // Update balance display
    const updateBalance = () => {
        balanceDisplay.textContent = balance.toFixed(2);
    };

    // Render transaction history
    const renderTransaction = () => {
        transactionHistory.innerHTML = "";
        transaction.forEach((transaction) => {
            const li = document.createElement("li");
            li.textContent = `${transaction.type}: $${transaction.amount.toFixed(2)} (Balance: $${transaction.balance.toFixed(2)})`;
            transactionHistory.appendChild(li);
        });
    };

    // Add a new transaction
    const addTransaction = (type, amount) => {
        if (type === "Withdraw" && amount > balance) {
            alert("Insufficient balance");
            return;
        }

        balance += type === "Deposit" ? amount : -amount;
        transaction.push({type, amount, balance});
        updateBalance();
        renderTransaction();
        saveTransactions(); // Save transactions to localStorage
    };

    // Clear all transactions
    const clearTransactions = () => {
        transaction = [];
        balance = 5000;
        updateBalance();
        renderTransaction();
        saveTransactions(); // Save the cleared state to localStorage
    };

    // Event listeners for deposit, withdraw, and clear buttons
    document.getElementById("deposit").addEventListener("click", () => {
        const amount = parseFloat(amountInput.value);
        if (!isNaN(amount) && amount > 0) {
            addTransaction("Deposit", amount);
        } else {
            alert("Enter a valid amount");
        }
        amountInput.value = "";
    });

    document.getElementById("withdraw").addEventListener("click", () => {
        const amount = parseFloat(amountInput.value);
        if (!isNaN(amount) && amount > 0) {
            addTransaction("Withdraw", amount);
        } else {
            alert("Enter a valid amount");
        }
        amountInput.value = "";
    });

    document.getElementById("clear").addEventListener("click", () => {
        clearTransactions();
    });

    loadTransactions(); // Load transactions from localStorage when the page loads
});
