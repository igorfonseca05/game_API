
const express = require('express')

const router = express.Router()

// Configurando função de resposta padrão para nossa API
const functions = require('../inc/functions')

// Importando Model do mongoDB

const game = require('../models/game')

// -------------------------------------------------------------------------------------
// Routes
router.get('/', (req, res) => {
    res.json(functions.response('succes', 'API is Running', 0, null))
})

router.get('/games', async (req, res) => {

    try {
        const dados = await game.find({}).lean().exec()        
        res.json(functions.response('success', 'Dados obtidos com sucesso', dados.length, dados))

    } catch (error) {
        res.json(functions.response('Error', error.message, 0, null))
        
    }
})

// Obter os dados por ID, usamos uma função de middleware
router.get('/games/:id', getGame, async (req, res) => {
    try {
        const dado =  await game.findById(req.params.id)
        res.status(200).json(functions.response('success', 'Dados obtidos com sucesso', dado.length, dado))

    } catch(error) {
        return res.json(functions.response('Error', error.message, 0, null)) 
    }
    
})

// Rota para postar dado na API
router.post('/', async (req, res) => {

    // Usando schema para obter dados
    const gameShema = new game({
        name: req.body.name,
        description: req.body.description,
        tags: req.body.tags,
        platform: req.body.platform,
        steam_link: req.body.steam_link,
        price: req.body.price,
    })

    // Tentando salvar os dados
    try {
        const newGame = await gameShema.save()
        res.status(200).json(functions.response("Success", "Dados postados com sucesso", newGame.length, newGame))
    } catch (error) {
        res.status(404).json(functions.response('Error', error.message,0, null))
        
    }
})

router.put('/games/:id', getGame, async(req, res) => {
    if(req.body) {
        try {
            const dado = await game.findByIdAndUpdate(req.params.id, req.body, {new: true})
             res.status(200).json(functions.response('Success', 'Dado atualizado', dado.length, dado))
         } catch (error) {
             res.status(404).json(functions.response('Error', 'Erro ao atualizar dado', 0, null))
         }
    }
})

router.delete('/games/:id', getGame, async(req, res) => {
    try {
       const dado = await game.findByIdAndDelete(req.params.id)
        res.status(200).json(functions.response('Success', 'Dado deletado', dado.length, dado))
    } catch (error) {
        res.status(404).json(functions.response('Error', 'Erro ao deletar dado', 0, null))
        
    }
})


// Função de middleware para verificar se elemento com o id especificado existe
async function getGame (req, res, next) {
    try {
        foundGame = await game.findById(req.params.id)

        if(foundGame === null) {
            throw new Error('Game not found!')
        }

    } catch(error) {
        return res.json(functions.response('Error', error.message, 0, null)) 
    }

    next()
} 



module.exports = router