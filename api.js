require('dotenv').config()

// implementando modulos
const express = require('express')
const cors = require('cors')

// Executando o express
const app = express()
 global.app = app

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Importando rotas
const router = require('./routes/routes')

// Configurando função de resposta padrão para nossa API
const functions = require('./inc/functions')

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

app.use((req, res, next) => {
    res.locals.minha = 'oi'
    next()
})


app.use(router)

app.on('conectou', () => {
    app.listen(3000, () => {
        console.log('servidor on!')
        console.log('Acesse em http://localhost:3000')
    })
})

// -------------------------------------------------------------------------------------
// Carregando o cors para podemos obter requisições a nossa API de qualquer origem/dominio
app.use(cors())
