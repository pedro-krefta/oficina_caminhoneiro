const Funcionario = require('../models/funcionario')
const cryptoJs = require('crypto-js')
const chave = '123'

const login = async(req,res)=>{
    const {email,senha} = req.body

    if(!email || !senha){
        return res.status(404).json({message: 'insira todos os dados '})
    }

    try{
        const funcionario = await Funcionario.findOne({where: {email: email}})

        if(!funcionario){
            return  res.status(404).json({message: 'Funcionario não encontrado!'})
        }

        const bytes = cryptoJs.AES.decrypt(senha, chave)
        const senhaDec = bytes.toString(cryptoJs.enc.Utf8)

        const tempo = 3 * 60 * 60 * 1000
        const tempoToken = Date.now() + tempo

        const payload = {
            idFuncionario: funcionario.codFuncionario,
            nome: funcionario.nome,
            expiraEm: tempoToken
        }

        const token = cryptoJs.AES.encrypt(JSON.stringify(payload), chave).toString()

        return res.status(200).json({
            message: 'Login realizado com sucesso!',
            nome: funcionario.nome,
            token: token
        })
    }catch(err){
        res.status(400).json({message: 'erro ao realizar login'})
        console.error('erro ao realizar login')
    }
}

module.exports = {login}