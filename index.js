const form = document.querySelector('form')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const formData = new FormData(form)
    const dadosForm = Object.fromEntries(formData)

    await postDados(dadosForm)
    await removerDados()

    const inputForm = document.querySelectorAll('form input')
    inputForm.forEach( input => {
        input.value = ''
    })
})

const getDados = async () => {
    let url = 'https://reqres.in/api/users?page=2'

    await fetch(url)
        .then(resposta => resposta.json())
        .then(dados => {
            dados.data.forEach(dado => {
                adicionaUser(dado.id, dado.first_name, dado.email)
            })
        })
}

getDados()

const adicionaUser = (id, nome, email) => {

    const divImgUser = document.createElement('div')
    const imgUser = document.createElement('img')
    imgUser.setAttribute('src', 'svg-user-login.svg')
    imgUser.classList.add('imgUser')

    divImgUser.appendChild(imgUser)

    const divDadosUser = document.createElement('div')
    divDadosUser.classList.add('divDadosUser')
    const h3Nome = document.createElement('h3')
    h3Nome.innerHTML = nome
    const spanEmail = document.createElement('span')
    spanEmail.innerHTML = email

    divDadosUser.appendChild(h3Nome)
    divDadosUser.appendChild(spanEmail)

    const divCloseBtn = document.createElement('div')
    divCloseBtn.classList.add('divCloseBtn')
    const closeBtn = document.createElement('button')
    closeBtn.classList.add('closeBtn')
    closeBtn.innerHTML = 'X'

    divCloseBtn.appendChild(closeBtn)

    const divUsuario = document.createElement('div')
    divUsuario.setAttribute('dataIdUser', id)
    divUsuario.classList.add('usuario')


    divUsuario.appendChild(divImgUser)
    divUsuario.appendChild(divDadosUser)
    divUsuario.appendChild(divCloseBtn)

    const divUsuarios = document.querySelector('div.usuarios')


    divUsuarios.appendChild(divUsuario)

}

const postDados = async (dadosForm) => {
    let url = 'https://reqres.in/api/users?page=2'

    await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dadosForm)
    })
        .then(resposta => resposta.json())
        .then(dados =>{
            adicionaUser(dados.id, dados.nome, dados.email)
        })

}

const removerDados = async () => {


    document.querySelectorAll('.divCloseBtn').forEach( btn => {

        btn.addEventListener('click', async (e) => {
            if(window.confirm('Tem certaza que deseja excluir este registro?')){
                if(e.target.classList.contains('closeBtn')){

                    const userExcluido = e.target.closest('.usuario')
                    const id = userExcluido.getAttribute('dataiduser')

                    let url =`https://reqres.in/api/users/${id}`
                    await fetch(url, {
                        method: 'DELETE',
                    }).then( resposta => {
                        if(resposta.ok){
                            console.log('click')
                            userExcluido.remove()
                        }
                    })
                }
            }
        })
    })
}
