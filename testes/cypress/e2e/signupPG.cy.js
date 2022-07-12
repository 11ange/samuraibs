/// <reference types="Cypress" />

describe('cadastro', function () {
    // const nome = 'Nada'
    // const email = 'nada@nda.com'
    // const senha = 'pwd123'

    //definindo a massa de teste
    const usuario = {
        nome: 'Nada',
        email: 'nada@nda.com',
        senha: 'pwd123'
    }

    it('Deve cadastrar um novo usuário', function () {
        // removendo usuário já cadastrado para que a massa seja sempre válida
        //cy.task('removeUser', email)
        cy.task('removeUser', usuario.email)
            .then(function (result) {
                console.log(result)
            })

        cy.visit('/signup')
        // cy.get('input[placeholder="Nome"]').type(nome)
        // cy.get('input[placeholder="E-mail"]').type(email)
        // cy.get('input[placeholder="Senha"]').type(senha)
        cy.get('input[placeholder="Nome"]').type(usuario.nome)
        cy.get('input[placeholder="E-mail"]').type(usuario.email)
        cy.get('input[placeholder="Senha"]').type(usuario.senha)

        cy.contains('button', 'Cadastrar').click()
        
        //validação do resultado esperado
        cy.get('.toast')
            .should('be.visible')
            .find('p')
            .should('have.text', 'Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
    })

    it('Deve exibir mensagem de email já cadastrado', function () {
        cy.visit('/signup')
        // cy.get('input[placeholder="Nome"]').type(nome)
        // cy.get('input[placeholder="E-mail"]').type(email)
        // cy.get('input[placeholder="Senha"]').type(senha)

        const usuario2 = {
            name: 'Teste',
            email: 'teste@nda.com',
            password: 'pwd123',
            is_provider: true
        }

        cy.task('removeUser', usuario2.email)
            .then(function (result) {
                console.log(result)
            })

        cy.request(
            'POST',
            'http://localhost:3333/users',
            usuario2
        ).then(function (response) {
            expect(response.status).to.eq(200)
        })

        cy.get('input[placeholder="Nome"]').type(usuario2.name)
        cy.get('input[placeholder="E-mail"]').type(usuario2.email)
        cy.get('input[placeholder="Senha"]').type(usuario2.password)

        cy.contains('button', 'Cadastrar').click()

        cy.get('.toast')
            .should('be.visible')
            .find('p')
            .should('have.text', 'Email já cadastrado para outro usuário.')
    })
})