require('dotenv').config()

// implementando modulos
const express = require('express')
const path = require('path')
const cors = require('cors')

// Executando o express
const app = express()
global.app = app

// Importando rotas
const router = require('./routes/routes')

// Evento de conexão com a base de dados
const { dbEvents, closeConnection } = require('./models/game')

// -------------------------------------------------------------------------------------
// Carregando o cors para podemos obter requisições a nossa API de qualquer origem/dominio
const corsOptions = {
    origin: [
        "http://localhost:3000", // Frontend em desenvolvimento
        "https://sua-api.vercel.app", // API hospedada no Vercel
    ],
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    credentials: 'include'
}

app.use(cors(corsOptions));

// Configurando função de resposta padrão para nossa API
const functions = require('./inc/functions')



// -------------------------------------------------------------------------------------
// Habilitando enviar e receber json
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));
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


process.on("SIGINT", async () => {
    await closeConnection()
    process.exit(0)
})

dbEvents.on('conectou', () => {
    app.listen(3000, () => {
        console.log('servidor on!')
        console.log('Acesse em http://localhost:3000')
    })
})

