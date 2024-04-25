require('dotenv').config()

// implementando modulos
const express = require('express')
const cors = require('cors')

// Executando o express
const app = express()
global.app = app
// -------------------------------------------------------------------------------------
// Carregando o cors para podemos obter requisições a nossa API de qualquer origem/dominio
app.use(cors())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.1.0:5173'); // Permitindo qualquer origem. Você pode substituir '*' pelo seu domínio específico.
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Métodos permitidos
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Cabeçalhos permitidos
    if (req.method === 'OPTIONS') {
        res.sendStatus(200); // Responde com 200 para solicitações OPTIONS
    } else {
        next();
    }
});

// Importando rotas
const router = require('./routes/routes')

// Configurando função de resposta padrão para nossa API
const functions = require('./inc/functions')


// -------------------------------------------------------------------------------------
// Habilitando enviar e receber json
app.use(express.json())

// -------------------------------------------------------------------------------------
// Parseando dados do corpo da requisição
app.use(express.urlencoded({ extended: true }))


// -------------------------------------------------------------------------------------
// Respondendo caso a API esteja disponivel
const API_avalible = true
app.use((req, res, next) => {
    if (API_avalible) {
        next()
    } else {
        res.json(functions.response('warning', 'API is not available', 0, null))
    }
})

// -------------------------------------------------------------------------------------
// Abrindo servidor
app.use(router)

app.on('conectou', () => {
    app.listen(3000, () => {
        console.log('servidor on!')
        console.log('Acesse em http://localhost:3000')
    })
})

