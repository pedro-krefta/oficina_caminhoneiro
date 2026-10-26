const express = require('express')
const app = express()
const cors = require('cors')

const host = 'localhost'
const port = 3000

const conn = require('./db/conn')
require('./models/rel')

const authMiddleware = require('./middleware/auth.middleware')
const funcionarioController = require('./controller/funcionario.controller')                                     
const cargaController = require('./controller/carga.controller')
const entregaController = require('./controller/entrega.controller')                      
const motoristaController = require('./controller/motorista.controller')               
const authController = require('./controller/auth.controller')     

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.post('/funcionario', funcionarioController.cadastrar)
app.post('/login', authController.login)


app.get('/', (req,res)=>{
    res.status(200).json({message: 'aplicação rodando'})
})
app.use(authMiddleware)

app.post('/motorista', motoristaController.cadastrar)
app.get('/motoristas', motoristaController.listar)
app.get('/motorista/:nome', motoristaController.consultar)
app.delete('/motorista/:id', motoristaController.apagar)
app.put('/motorista/:id', motoristaController.atualizar)

app.post('/carga', cargaController.cadastar)
app.post('/entrega', entregaController.cadastar)


conn.sync()
.then(()=>{
    app.listen(port,host, ()=>{
        console.log(`servidor rodando em http://${host}:${port}`)
    })
})
.catch((err)=>{
    console.error('Erro ao conectar com o banco de dados!',err)
})