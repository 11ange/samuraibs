/// <reference types="Cypress" />

import paginaLogin from '../support/pages/login'
import paginaDash from '../support/pages/dash'

describe('Login', function () {
    context('Quando o usuario é muito bom', function () {
        const usuario = {
            name: 'Master',
            email: 'master@nada.com',
            password: 'abc123',
            is_provider: true
        }

        before(function () {
            cy.criaUsuarioViaAPI(usuario)
        })
        it('ele deve conseguir fazer o login', function () {
            paginaLogin.abreLogin()
            paginaLogin.form(usuario)
            paginaLogin.submit()
            paginaDash.header.usuarioLogado(usuario.name)
        })
    })
})