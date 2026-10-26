const Entrega = require('../models/entrega')

const cadastar = async(req,res)=>{
    const valores = req.body 

    try{
        await Entrega.create(valores)
        res.status(200).json({message: 'Entrega cadastrada com sucesso'})
    }catch(err){
        res.status(400).json({message: 'erro ao cadastrar'})
        console.error('erro ao cadastrar')
    }
}

const listar = async(req,res)=>{
    try{
        const dados = await Entrega.findAll()
        res.status(200).json(dados)
    }catch(err){
        console.error('Erro ao listar a entrega',err)
        res.status(500).json({message: 'Erro ao listar a entrega!'})
    }
}

module.exports = {cadastar}