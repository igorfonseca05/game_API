require('dotenv').config()

// implementando modulos
const express = require('express')
const cors = require('cors')

// Executando o express
const app = express()
global.app = app

// Importando rotas
const router = require('./routes/routes')

// Configurando função de resposta padrão para nossa API
const functions = require('./inc/functions')

// -------------------------------------------------------------------------------------
// Carregando o cors para podemos obter requisições a nossa API de qualquer origem/dominio
app.use(cors({
    origin: "http://localhost:5173/", // use your actual domain name (or localhost), using * is not recommended
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true
}))

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

