const Motorista = require('../models/motorista')
const cryptoJs = require('crypto-js')
const chave = '123'

const cadastrar = async(req,res)=>{
    const valores = req.body 

    if(!valores.nome || !valores.cnh || !valores.cpf || !valores.telefone){
        return res.status(404).json({message: 'digite todos os dados corretamente'})
    }

    try{
        const cnhHash = cryptoJs.AES.encrypt(valores.cnh, chave).toString()
        const cpfHash = cryptoJs.AES.encrypt(valores.cpf, chave).toString()

        await Motorista.create({
            nome: valores.nome,
            cnh: cnhHash,
            cpf: cpfHash,
            telefone: valores.telefone
        })

        res.status(200).json({message: 'cliente cadastrado com sucesso'})
    }catch(err){
        res.status(400).json({message: 'erro ao cadastrar motorista'})
        console.error('erro ao cadastrar')
    }
}

const listar = async(req,res)=>{
    try{
        const dados = await Motorista.findAll()
        res.status(200).json(dados)
    }catch(err){
        res.status(400).json({message: 'erro ao listar'})
        console.error('erro ao listar')
    }
}

const consultar = async(req,res)=>{
    const nome = req.params.nome

    try{
        const dados = await Motorista.findOne({where: {nome: nome}})
        res.status(200).json(dados)
    }catch(err){
        res.status(400).json({message: 'erro ao consultar'})
        console.error('erro ao consultar')
    }
}

const apagar = async(req,res)=>{
    const id = req.params.id

    try{
        let dados = await Motorista.findByPk(id)
        if(!dados){
        return res.status(400).json({message: 'erro ao achar motorista'})
        }
        dados = await Motorista.destroy({where: {codMotorista: id}})
        res.status(200).json({message:'Motorista excluido do sistema'})
    }catch(err){
        res.status(400).json({message: 'erro ao apagar'})
        console.error('erro ao apagar')
    }
}

const atualizar = async(req,res)=>{
    const valores = req.body
    const id = req.params.id

    try{
        let dados = await Motorista.findByPk(id)
        if(!dados){
            return res.status(404).json({message: 'motorista não encontrado'})
        }else{
            valores.cnh = cryptoJs.AES.encrypt(valores.cnh, chave).toString()
            valores.cpf = cryptoJs.AES.encrypt(valores.cpf, chave).toString()

            await Motorista.update(valores, {where: {codMotorista: id}})
            dados = await Motorista.findByPk(id)

            const bytes = cryptoJs.AES.decrypt(dados.cpf, chave)
            const cpfDescriptografado = bytes.toString(cryptoJs.enc.Utf8)

            res.status(200).json({
                codigo_Motorista: dados.codMotorista,
                nome: dados.nome,
                email: dados.email,
                cpf: cpfDescriptografado,
                telefone: dados.telefone
            })
        }
    }catch(err){
        res.status(400).json({message: 'erro ao atualizar'})
    }
}
module.exports = {cadastrar,listar,consultar,apagar,atualizar}