const {Carga,Motorista,Funcionario,Entrega} = require('./models/rel')
const conn = require('./db/conn')

async function asyncDB(){
    try{
        await conn.sync({force: true})
        console.log('sincronizando')
    }catch(err){
        console.error('erro ao sincronizar')
    }finally{
        await conn.close()
        console.log('encerrando')
    }
}

asyncDB()