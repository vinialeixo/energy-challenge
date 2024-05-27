import app from './server.js'; // Certifique-se de usar o caminho relativo correto

app.set('port', process.env.PORT || 5000);
const port = app.get('port');

app.listen(port, () => {
  console.log(`Servidor rodando no endereço http://localhost:${port}`);
});

