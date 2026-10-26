const token = localStorage.getItem('token')

if (!token) {
location.href = '../index.html'
}

const resposta_consultNome = document.getElementById('resposta_consultNome')
const btn_consultarNome = document.getElementById('btn_consultarNome')

btn_consultarNome.addEventListener('click', (e) => {
e.preventDefault()

const nome = document.getElementById('nome').value

fetch(`http://localhost:3000/motorista/buscarNome/${encodeURIComponent(nome)}`, {
    headers: {
        'Authorization': token
    }
})
.then(res => res.json())
.then(dados => {

    if (!dados || dados.message) {
        return resposta_consultNome.innerHTML =
            `<p>${dados.message || 'Motorista não encontrado!'}</p>`
    }

    resposta_consultNome.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>CNH</th>
                    <th>CPF</th>
                    <th>Telefone</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>${dados.codigo_motorista}</td>
                    <td>${dados.nome}</td>
                    <td>${dados.cnh}</td>
                    <td>${dados.cpf}</td>
                    <td>${dados.telefone}</td>
                </tr>
            </tbody>
        </table>
    `
})
.catch(err => {
    console.error('Erro ao consultar o motorista:', err)
    resposta_consultNome.innerHTML = '<p>Erro ao consultar o motorista!</p>'
   })
})