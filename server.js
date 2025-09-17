const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para decodificar dados de formulário
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// **Configuração CRÍTICA:** Define a pasta 'public' como a base para arquivos estáticos.
// Isso significa que o navegador acessa '/images/Log_1.jpeg', e o servidor entende
// que deve procurar em 'public/images/Log_1.jpeg'.
app.use(express.static(path.join(__dirname, 'public')));

// --- ROTAS PARA SERVIR AS PÁGINAS HTML ---

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/sobre', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'sobre.html'));
});

app.get('/servicos', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'servicos.html'));
});

app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contato.html'));
});

// --- ROTA PARA RECEBER DADOS DO FORMULÁRIO ---

app.post('/enviar-mensagem', (req, res) => {
    const { name, email, subject, message } = req.body;

    console.log('--- Nova Mensagem Recebida ---');
    console.log(`Nome: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Assunto: ${subject}`);
    console.log(`Mensagem: ${message}`);
    console.log('-----------------------------');

    // Resposta de sucesso para o cliente
    res.status(200).json({ success: true, message: 'Mensagem enviada com sucesso! Agradecemos o seu contato.' });
});

// Inicia o servidor e exibe uma mensagem clara
app.listen(PORT, () => {
    console.log(`✅ Servidor R10Log iniciado com sucesso!`);
    console.log(`💻 Acesse o site em: http://localhost:${PORT}`);
});