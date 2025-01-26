// the starting balance of the account//
let balance = 5000;
let transaction = [];

document.addEventListener("DOMContentLoaded", () => {
    const balanceDisplay = document.getElementById("balance"); 
    const transactionHistory = document.getElementById("transactionHistory");
    const amountInput = document.getElementById("amount");
//for balance display
    const updateBalance = () => {

        balanceDisplay.textContent = balance.toFixed(2);
};

    const renderTransaction = () => {
        transactionHistory.innerHTML = "";
        transaction.forEach((transaction, index) => {
            const li = document.createElement("li");
            li.textContent = `${transaction.type} $${transaction.amount} (Balance: $${transaction.balance})`;
            transactionHistory.appendChild(li);
        });
    };

    const addTransaction = (type, amount) => {
        if (type === "Withdraw" && amount > balance) {
            alert("Insufficient balance");
            return;
        }

        balance += type === "Deposit" ? amount : -amount;
        transaction.push({type, amount, balance});
        updateBalance();
        renderTransaction();
    };


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
    updateBalance();
    renderTransaction();
});






