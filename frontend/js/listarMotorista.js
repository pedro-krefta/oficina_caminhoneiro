const token = localStorage.getItem('token')

if (!token) {
    location.href = '../index.html'
}

const resposta = document.getElementById('resposta')
const btn_listar = document.getElementById('btn_listar')

btn_listar.addEventListener('click', (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/motoristas', {
        headers: {
            'Authorization': token
        }
    })
    .then(res => res.json())
    .then(dados => {

        if (dados.message) {
            resposta.innerHTML = `<p>${dados.message}</p>`
            return
        }

        resposta.innerHTML = `
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
                    ${dados.map(el => `
                        <tr>
                            <td>${el.codigo_motorista}</td>
                            <td>${el.nome}</td>
                            <td>${el.cnh}</td>
                            <td>${el.cpf}</td>
                            <td>${el.telefone}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `
    })
    .catch(err => {
        console.error('Erro ao listar os motoristas:', err)
        resposta.innerHTML = '<p>Erro ao listar os motoristas.</p>'
    })
})