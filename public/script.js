//Iteração de preço


//Seleção da lista de loss/profit

function filterCurrency(tipo) {
  const ativos = document.querySelectorAll('.ativo');

  ativos.forEach((ativo) => {
    const priceElement = ativo.querySelector('.only-price');
    const priceText = priceElement.textContent.match(/R\$ ([\d,]+)/);
    const price = priceText ? parseFloat(priceText[1].replace(',', '.')) : null;

    if (price !== null) {
      if (tipo === 'high' && priceElement.classList.contains('price-up')) {
        ativo.style.display = 'list-item';
      } else if (tipo === 'loss' && priceElement.classList.contains('price-down')) {
        ativo.style.display = 'list-item';
      } else if (tipo === 'all') {
        ativo.style.display = 'list-item';
      } else {
        ativo.style.display = 'none';
      }
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

//Comunicação da API com o sistema

document.addEventListener('DOMContentLoaded', () => {
  // Conectar ao WebSocket na porta 8080
  const socket = new WebSocket('ws://localhost:8080/quotes');

  // Evento de conexão
  socket.addEventListener('open', () => {
    console.log('Conectado ao WebSocket');
    socket.send('Hello Everybody');
  });

  // Evento de mensagem
  socket.addEventListener('message', (event) => {
    console.log('Mensagem recebida:', event.data);
    const jsonData = JSON.parse(event.data); // Parse o JSON recebido
    console.log('JSON Data:', jsonData);
    
    // Atualizar os preços das ações no DOM
    updateStockPrices(jsonData);
  });

  // Evento de desconexão
  socket.addEventListener('close', () => {
    console.log('Desconectado do WebSocket');
  });

  // Evento de erro
  socket.addEventListener('error', (error) => {
    console.error('Erro no WebSocket:', error);
  });

  function updateStockPrices(data) {
    for (const stock in data) {
      const priceData = data[stock];
      const listItem = document.getElementById(stock);

      if (listItem) {
        const priceElement = listItem.querySelector('.only-price');

        // Obter o preço anterior
        const oldPriceText = priceElement.textContent.match(/R\$ ([\d,]+)/);
        const oldPrice = oldPriceText ? parseFloat(oldPriceText[1].replace(',', '.')) : null;

        // Atualizar o preço
        const newPrice = priceData.toFixed(2);
        let arrow = '';

        console.log(`Old Price: ${oldPrice}, New Price: ${newPrice}`);

        // Determinar a direção do preço e ajustar a classe e a seta
        if (oldPrice !== null) {
          if (newPrice > oldPrice) {
            priceElement.classList.remove('price-down');
            priceElement.classList.add('price-up');
            arrow = '<img src="imgs/profit.svg" alt="up" class="arrow">';
          } else if (newPrice < oldPrice) {
            priceElement.classList.remove('price-up');
            priceElement.classList.add('price-down');
            arrow = '<img src="imgs/loss.svg" alt="down" class="arrow">';
          } else {
            priceElement.classList.remove('price-up', 'price-down');
          }
        } else {
          // Se não houver preço antigo, não adiciona nenhuma seta
          priceElement.classList.remove('price-up', 'price-down');
        }

        // Atualizar o conteúdo do elemento de preço
        priceElement.innerHTML = `R$ ${newPrice} ${arrow}`;
      } else {
        console.warn(`Item de lista com ID ${stock} não encontrado`);
      }
    }
  }
});

//Callback de alerta 
const socket = io("http://localhost:8081/");

socket.on('msg', (msg) => {
    alert(msg);
});
