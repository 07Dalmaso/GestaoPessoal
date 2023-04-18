const form = document.querySelector('form');

const tableBody = document.querySelector('#transaction-table-body');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const date = event.target.elements['transaction-date'].value;
  const description = event.target.elements['transaction-description'].value;
  const value = event.target.elements['transaction-value'].value;
  const category = event.target.elements['transaction-category'].value;

  const row = tableBody.insertRow();
  const dateCell = row.insertCell();
  const descriptionCell = row.insertCell();
  const valueCell = row.insertCell();
  const categoryCell = row.insertCell();

  dateCell.textContent = date;
  descriptionCell.textContent = description;
  valueCell.textContent = value;
  categoryCell.textContent = category;

  form.reset();

  form.elements['transaction-date'].focus();
});