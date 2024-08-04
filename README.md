# Toro-Challenge
Instalação de dependências:
A priore temos que instalar o Docker para rodar o comando "docker run -p 8080:8080 toroinvest/quotesmock" que será responsável pela API dos preços/sigla ações, após isso iremos invocar a API do Websocket no Postman (isso acontece por que o Websocket não é uma API REST, ela funciona de forma bidirecional comunicando o cliente com o backend), utilizando o Socket.io como facilitador do processo de consumo da API com o desafio.

Rodar o desafio:
Após configurado o socket.io iremos definir uma url diferente da url do projeto, no caso utilizamos o http://localhost:8080 para o Socket.io e o http://localhost:8081 para refletir o desafio.

Testes Automatizados:
Para testar o desafio iremos utilizar o Cypress, porém devido a demanda da semana e a complexidade do desafio não me permitiram montar o cenário para apresentar no Cypress (peço perdão :(). 
