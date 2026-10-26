const Carga = require('../models/carga')

const cadastar = async(req,res)=>{
    const valores = req.body

    try{
        await Carga.create(valores)
        res.status(200).json({message: 'Carga cadastrada com sucesso'})
    }catch(err){
        res.status(400).json({message: 'erro ao cadastrar'})
        console.error('erro ao cadastrar')
    }

}

module.exports = {cadastar}