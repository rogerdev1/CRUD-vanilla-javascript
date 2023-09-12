const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = new FormData(form)
    const dadosForm = Object.fromEntries(formData)

    adicionaUser(dadosForm.nome, dadosForm.email)

    const inputForm = document.querySelectorAll('form input')
    inputForm.forEach( input => {
        input.value = ''
    })
})

const adicionaUser = (nome, email) => {

    const divImgUser = document.createElement('div')
    const imgUser = document.createElement('img')
    imgUser.setAttribute('src', 'svg-user-login.svg')
    imgUser.classList.add('imgUser')

    divImgUser.appendChild(imgUser)

    const divDadosUser = document.createElement('div')
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


    const divUsuarios = document.createElement('div')
    divUsuarios.classList.add('usuarios')

    divUsuarios.appendChild(divImgUser)
    divUsuarios.appendChild(divDadosUser)
    divUsuarios.appendChild(divCloseBtn)

    document.querySelector('main').appendChild(divUsuarios)

    // return(
    //     `
    //         <div id="imgUser">
    //             <img src="svg-user-login.svg" alt="foto de perfil" width="60px">
    //         </div>
    //         <div id="dadosUser">
    //             <h3>${nome}/h3>
    //             <span>${email}</span>
    //         </div>
    //         <div id="divCloseBtn">
    //             <button>X</button>
    //         </div>

    //     `
    // )
}
