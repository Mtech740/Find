const form = document.getElementById('logForm');
const logTable = document.getElementById('logTable');
const search = document.getElementById('search');

let logs = JSON.parse(localStorage.getItem('fraudLogs')) || [];

function renderLogs(filtered = logs) {
  logTable.innerHTML = '';
  filtered.forEach((log, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${log.phone}</td>
      <td>${log.amount}</td>
      <td>${log.date}</td>
      <td>${log.note}</td>
    `;
    logTable.appendChild(row);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const phone = document.getElementById('phone').value.trim();
  const amount = document.getElementById('amount').value;
  const date = document.getElementById('date').value;
  const note = document.getElementById('note').value.trim();

  const newLog = { phone, amount, date, note };
  logs.push(newLog);
  localStorage.setItem('fraudLogs', JSON.stringify(logs));
  form.reset();
  renderLogs();
});

search.addEventListener('input', () => {
  const term = search.value.toLowerCase();
  const filtered = logs.filter(log =>
    log.phone.toLowerCase().includes(term) ||
    log.note.toLowerCase().includes(term)
  );
  renderLogs(filtered);
});

renderLogs();
