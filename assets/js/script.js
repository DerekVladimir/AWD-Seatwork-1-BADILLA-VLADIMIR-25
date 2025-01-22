const valueInput = document.getElementById('value');
const nameInput = document.getElementById('name');
const tableOutput = document.getElementById('table-output');

let counter = 0;

let transactionList = [];

function AddTransaction() {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${counter + 1}</td>
        <td>${nameInput.value}</td>
        <td>${valueInput.value}</td>
        <td>
        <button class="btn btn-danger" onclick="DeleteTransaction(${counter})">Delete</button>
        </td>
    `;

    tableOutput.appendChild(newRow);

    transactionList.push({
        id: counter,
        name: nameInput.value,
        value: valueInput.value
    });

    localStorage.setItem('transactionList', JSON.stringify(transactionList));
    localStorage.setItem('counter', JSON.stringify (counter));

    counter++;
}