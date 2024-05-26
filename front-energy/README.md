# Configurar e executar a aplicação

- Dentro do diretório do frontend (lumi-challenge-app) `cd lumi-challenge-app`
Execute: 
    - `npm install` (instala as dependências do projeto)
    - `npm run start` (inicia a aplicação)


### Utilização

- Acesse http://localhost:3000/ 
    - a página inicial será a de [Dashboard](http://localhost:3000/dashboard). Por enquanto ela não irá mostrar nenhum dado, até que as faturas sejam envidas e processadas.
- Para enviar e processar as faturas clique em [Faturas](http://localhost:3000/invoices).
- Escolha as faturas a serem processadas e clique em **Processar**. Aguarde o processamento.
- Ainda na página de faturas você pode filtrar pelo **número do cliente** exibido no campo de seleção e visualizar as faturas processadas disponíveis também para download, basta clicar em cima de algum item da lista exibida.
- Clicando em [Dashboard](http://localhost:3000/dashboard) você já conseguirá ver os dados das faturas de acordo com o tempo em dois gráficos, podendo filtrar também pelo **código do cliente** no campo de seleção.