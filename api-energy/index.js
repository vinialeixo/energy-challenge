import app from './routes/app.js'; // Certifique-se de usar o caminho relativo correto

const Port = 3000;

app.listen(Port, () => {
  console.log(`Servidor rodando no endereço http://localhost:${Port}`);
});

