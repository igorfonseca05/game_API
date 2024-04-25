
const mongoose = require('mongoose')

const functions = require('../inc/functions')

// Criando conexão com a base de dados
mongoose.connect(process.env.connection)
    .then(() => {
        global.app.emit('conectou')
        console.log('base conectada')
    })
    .catch((erro) => {
       return res.status(404).json(functions.response("Error", erro.message, 0, null))
    })


const gameShema = new mongoose.Schema({
    name: { type: String},
    description: {type: String},
    tags: [String],
    platform: { type: mongoose.Schema.Types.Mixed},
    steam_link: {type: String, default: ''},
    price: {type: mongoose.Schema.Types.Mixed},
    createdAt: {type: Date, default: new Date().getTime()}
  })

  const game = mongoose.model('game', gameShema, "game")

  module.exports = game