require('dotenv').config()

const mongoose = require('mongoose')
const Event = require('events')
// const { error } = require('console')

const dbEvents = new Event()

// Criando conexão com a base de dados
mongoose.connect(process.env.stringConnection)
    .then(() => {
        dbEvents.emit('conectou')
        console.log('base conectada')
    })
    .catch((erro) => {
        console.log(erro.message)
    })


const gameShema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    tags: [String],
    platform: { type: mongoose.Schema.Types.Mixed },
    steam_link: { type: String, default: '' },
    price: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: new Date().getTime() }
})

const game = mongoose.model('game', gameShema, "game")

module.exports = { game, dbEvents }