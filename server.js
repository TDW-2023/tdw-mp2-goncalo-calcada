const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();

// Adicione aqui as rotas do seu aplicativo, se necessário

// Configuração do proxy para contornar o CORS
app.use('/api', createProxyMiddleware({ target: 'https://www.cheapshark.com', changeOrigin: true }));

// Servir os arquivos estáticos do diretório 'build'
app.use(express.static(path.join(__dirname, 'build')));

// Configuração da rota para qualquer caminho - isso garante que o React Router lide com as rotas no lado do cliente
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Adicione outras configurações de servidor Express, se necessário

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor está ouvindo na porta ${port}`);
});
