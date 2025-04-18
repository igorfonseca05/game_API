require('dotenv').config()

const mongoose = require('mongoose')
const Event = require('events')
// const { error } = require('console')

const dbEvents = new Event()

let connection

// Criando conexão com a base de dados
function connectDB() {
    if (!connection) {
        connection = mongoose.connect(process.env.stringConnection)
            .then(() => {
                dbEvents.emit('conectou')
                console.log('base conectada')
            })
            .catch((erro) => {
                console.log(erro.message)
            })
    }
    return connection
}

connectDB()


async function closeConnection() {
    if (connection) {
        await mongoose.connection.close()
        console.log('Conexão com o banco encerrada.')
        connection = null
    }
}

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

module.exports = { game, dbEvents, closeConnection }