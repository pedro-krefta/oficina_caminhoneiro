const Carga = require('./carga')
const Entrega = require('./entrega')
const Motorista = require('./motorista')
const Funcionario = require('./funcionario')

Motorista.hasMany(Carga,{
    foreignKey: 'idMotorista',
    as:'cargaMotorista',
    onDelete: 'CASCADE'
})

Carga.belongsTo(Motorista,{
    foreignKey: 'idMotorista',
    as: 'motoristaCarga',
    allowNull: false
})

Carga.hasMany(Entrega,{
    foreignKey: 'idCarga',
    as: 'entregaCarga',
    onDelete: 'CASCADE'
})

Entrega.belongsTo(Carga,{
    foreignKey: 'idCarga',
    as: 'cargaEntrega',
    allowNull: false
})

module.exports = {Entrega,Carga,Funcionario,Motorista}