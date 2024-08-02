//Seleção da lista de loss/profit

function filterCurrency(tipo) {
  const ativos = document.querySelectorAll('.ativo');

  ativos.forEach((ativo) => {
    if (tipo === 'high' && ativo.classList.contains('profit-price')) {
      ativo.style.display = 'list-item';
    } else if (tipo === 'loss' && ativo.classList.contains('loss-price')) {
      ativo.style.display = 'list-item';
    } else if (
      tipo === 'all' ||
      (tipo === '' && ativo.classList.contains('graph'))
    ) {
      ativo.style.display = 'list-item';
    } else {
      ativo.style.display = 'none';
    }
  });
}

window.onload = () => filterCurrency('high');

document.getElementById('order-asc').addEventListener('click', function () {
  filterCurrency('high');
});

document.getElementById('order-desc').addEventListener('click', function () {
  filterCurrency('loss');
});

document.addEventListener('click', function (event) {
  if (!event.target.closest('button')) {
    filterCurrency('all');
  }
});

// Ativação de botão high/loss
const buttons = document.querySelectorAll('.button-switcher');

buttons.forEach((button) => {
  buttons.forEach((btn) => btn.classList.remove('active'));

  button.addEventListener('click', (event) => {
    event.stopPropagation();
    buttons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
  });
});

document.addEventListener('click', () => {
  buttons.forEach((btn) => btn.classList.remove('active'));
});
