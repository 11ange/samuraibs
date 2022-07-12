/// <reference types="Cypress" />
//import {faker} from '@faker-js/faker'

/* it('Usuário já cadastrado', function(){
    const nome = 'Nada'
    const email = 'nada@nda.com'
    const senha = 'pwd123'

    cy.visit('/signup')
    cy.get('input[placeholder="Nome"]').type(nome)
    cy.get('input[placeholder="E-mail"]').type(email)
    cy.get('input[placeholder="Senha"]').type(senha)

    cy.contains('button','Cadastrar').click()

    cy.get('.toast')
        .should('be.visible')
        .find('p')
        .should('have.text','Email já cadastrado para outro usuário.')
}) 

it('Deve cadastrar um novo usuário', function(){
    const nome = 'Nada'
    const email = faker.internet.email()
    const senha = 'pwd123'

    cy.visit('/signup')
    cy.get('input[placeholder="Nome"]').type(nome)
    cy.get('input[placeholder="E-mail"]').type(email)
    cy.get('input[placeholder="Senha"]').type(senha)

    cy.contains('button','Cadastrar').click()

    cy.get('.toast')
        .should('be.visible')
        .find('p')
        .should('have.text','Agora você pode fazer seu login no Samurai Barbershop!')
}) */


it('Deve cadastrar um novo usuário', function(){
    const nome = 'Nada'
    const email = 'nada@nda.com'
    const senha = 'pwd123'

    cy.visit('/signup')
    cy.get('input[placeholder="Nome"]').type(nome)
    cy.get('input[placeholder="E-mail"]').type(email)
    cy.get('input[placeholder="Senha"]').type(senha)
,
    cy.intercept('POST','/users', {
        statusCode: 200
    }).as('postUser')

    cy.contains('button','Cadastrar').click()

    cy.wait('@postUser')

    cy.get('.toast')
        .should('be.visible')
        .find('p')
        .should('have.text','Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
})