const cryptoJs = require('crypto-js')
const chave = '123'

function authMiddleware(req,res,next){
    const token = req.headers['authorization']

    if(!token){
        return res.status(401).json({message: 'Acesso negado! Faça o login novamente!'})
    }

    try{
        const bytes = cryptoJs.AES.decrypt(token, chave)
        const dadosDescriptografados = bytes.toString(cryptoJs.enc.Utf8)

        if(!dadosDescriptografados){
            return res.status(403).json({message: 'acesso proibido'})
        }

        const payload = JSON.parse(dadosDescriptografados)

        if(Date.now() > payload.expiraEm){
            res.status(401).json({message: 'sessão expirada faça login novamente!'})
        }

        req.usuario = payload

        next()
    }catch(err){
        console.error('falha na autentificação',err)
        return res.status(401).json({message: 'Falha na autenticação'})
    }
}

module.exports = authMiddleware 