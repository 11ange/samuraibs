/// <reference types="Cypress" />

describe('cadastro', function () {

    context('Quando vamos criar um usuário novo', function () {
        const usuario = {
            nome: 'Nada',
            email: 'nada@nda.com',
            senha: 'pwd123'
        }

        before(function () {
            cy.task('removeUser', usuario.email)
                .then(function (result) {
                    console.log(result)
                })
        })

        it('Deve cadastrar com sucesso', function () {
            cy.visit('/signup')

            cy.get('input[placeholder="Nome"]').type(usuario.nome)
            cy.get('input[placeholder="E-mail"]').type(usuario.email)
            cy.get('input[placeholder="Senha"]').type(usuario.senha)

            cy.contains('button', 'Cadastrar').click()

            cy.get('.toast')
                .should('be.visible')
                .find('p')
                .should('have.text', 'Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        })
    })

    context('Quando o email já existe', function () {
        
        const usuario2 = {
            name: 'Teste',
            email: 'teste@nda.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
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
        })

        it('Não deve cadastrar o usuário', function () {
            cy.visit('/signup')

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
})