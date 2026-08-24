const clock = document.querySelector('#clock');
const alertBanner = document.querySelector('#alertBanner');
const stopSearch = document.querySelector('#stopSearch');
const departures = [...document.querySelectorAll('.departure')];
const busRows = [...document.querySelectorAll('.bus-table .table-row:not(.table-head)')];

function updateClock() {
  clock.textContent = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit' }).format(new Date());
}

updateClock();
setInterval(updateClock, 1000);

document.querySelector('.close-alert').addEventListener('click', () => {
  alertBanner.style.display = 'none';
});

stopSearch.addEventListener('input', (event) => {
  const query = event.target.value.toLowerCase().trim();
  departures.forEach((departure) => {
    departure.hidden = query && !departure.textContent.toLowerCase().includes(query);
  });
  busRows.forEach((row) => {
    row.hidden = query && !row.textContent.toLowerCase().includes(query);
  });
});

document.querySelectorAll('.bus').forEach((bus) => {
  bus.addEventListener('click', () => {
    const selected = bus.dataset.bus;
    document.querySelectorAll('.bus').forEach((item) => item.classList.remove('selected'));
    bus.classList.add('selected');
    const row = busRows.find((item) => item.textContent.includes(selected));
    if (row) row.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});

document.querySelectorAll('.map-controls button').forEach((control) => {
  control.addEventListener('click', () => {
    const canvas = document.querySelector('.map-canvas');
    canvas.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.015)' }, { transform: 'scale(1)' }], { duration: 280 });
  });
});