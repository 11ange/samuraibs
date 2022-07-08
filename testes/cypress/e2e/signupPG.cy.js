
describe('cadastro', function () {
    it('Deve cadastrar um novo usuário', function () {
        const nome = 'Nada'
        const email = 'nada@nda.com'
        const senha = 'pwd123'

        cy.task('removeUser', email)
            .then(function (result) {
                console.log(result)
            })

        cy.visit('/signup')
        cy.get('input[placeholder="Nome"]').type(nome)
        cy.get('input[placeholder="E-mail"]').type(email)
        cy.get('input[placeholder="Senha"]').type(senha)

        cy.contains('button', 'Cadastrar').click()

        cy.get('.toast')
            .should('be.visible')
            .find('p')
            .should('have.text', 'Agora você pode fazer seu login no Samurai Barbershop!')
    })

    it('Deve exibir mensagem de email já cadastrado', function () {
        const nome = 'Nada'
        const email = 'nada@nda.com'
        const senha = 'pwd123'

        cy.visit('/signup')
        cy.get('input[placeholder="Nome"]').type(nome)
        cy.get('input[placeholder="E-mail"]').type(email)
        cy.get('input[placeholder="Senha"]').type(senha)

        cy.contains('button', 'Cadastrar').click()

        cy.get('.toast')
            .should('be.visible')
            .find('p')
            .should('have.text', 'Email já cadastrado para outro usuário.')
    })
})