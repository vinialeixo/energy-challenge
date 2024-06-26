
### Banco de Dados

- Crie um banco de dados chamado **lumi** no PostgreSQL.

### Configuração do Backend

- No arquivo `.env`, atualize as credenciais do banco de dados:

    `DATABASE_URL="postgresql://**usuário**:**senha**@localhost:5432/lumi"`

- No diretório do backend (`api-energy`), execute:
    - `npm install` (instala as dependências)
    - `npm run start` (inicia a API)

### Configuração do Frontend

- No diretório do frontend (`front-energy`), execute:
    - `npm install` (instala as dependências)
    - `npm run start` (inicia a aplicação)



# Como Usar

- Acesse [http://localhost:3000/](http://localhost:3000/)
    - A página inicial é o [Dashboard](http://localhost:3000/dashboard). Por enquanto, não há dados exibidos até que as faturas sejam processadas.
- Para enviar e processar as faturas, vá para [Faturas](http://localhost:3000/invoices).
- Escolha as faturas a serem processadas e clique em **Processar**. Aguarde o processamento.
- Na página de faturas, você pode filtrar pelo **número do cliente** e visualizar as faturas processadas disponíveis para download, clicando nos itens da lista.
- No [Dashboard](http://localhost:3000/dashboard), visualize os dados das faturas em dois gráficos, com opção de filtrar pelo **código do cliente**.

