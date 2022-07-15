/// <reference types="Cypress" />

import paginaCadastro from '../support/pages/cadastro'

describe('cadastro', function () {

    context('Quando vamos criar um usuário novo', function () {
        const usuario = {
            name: 'Teste',
            email: 'teste@nda.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.task('removeUser', usuario.email)
                .then(function (result) {
                    console.log(result)
                })
        })

        it('Deve cadastrar com sucesso', function () {
            paginaCadastro.abrePagina()
            paginaCadastro.form(usuario)
            paginaCadastro.submit()
            paginaCadastro.toast.validaTexto('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        })
    })

    context('Quando o email já existe', function () {
        const usuario = {
            name: 'Teste',
            email: 'teste@nda.com',
            password: 'pwd123',
            is_provider: true
        }
        before(function () {
            cy.criaUsuarioViaAPI(usuario)
        })

        it('Não deve cadastrar o usuário', function () {
            paginaCadastro.abrePagina()
            paginaCadastro.form(usuario)
            paginaCadastro.submit()
            paginaCadastro.toast.validaTexto('Email já cadastrado para outro usuário.')
        })
    })

    context('Quando digitar email com formato incorreto', function () {
        const usuario = {
            name: 'Teste',
            email: 'teste.nda.co.uk',
            password: 'pwd123',
        }

        it('Deve exibir mensagem de alerta', function () {
            paginaCadastro.abrePagina()
            paginaCadastro.form(usuario)
            paginaCadastro.submit()
            paginaCadastro.validaMensagemAlerta('Informe um email válido')
        })
    })

    context('Quando a senha é muito curta', function () {
        const senhas = ['1', '12', '123', '1234', '12345']

        beforeEach(function () {
            paginaCadastro.abrePagina()
        })

        senhas.forEach(function (p) {
            it('Não deve cadastrar com a senha: ' + p, function () {
                const usuario = {
                    name: 'Teste',
                    email: 'teste@nda.co.uk',
                    password: p
                }
                paginaCadastro.form(usuario)
                paginaCadastro.submit()
            })
        })

        afterEach(function () {
            paginaCadastro.validaMensagemAlerta('Pelo menos 6 caracteres')
        })
    })

    context('Quando não preencho nenhum dos campos', function () {
        const mensagens = ['Nome é obrigatório', 'E-mail é obrigatório', 'Senha é obrigatória']

        before(function () {
            paginaCadastro.abrePagina()
            paginaCadastro.submit()
        })

        mensagens.forEach(function (m) {
            it('Deve exibir a mensagem "' + m + '"', function () {
                paginaCadastro.validaMensagemAlerta(m)
            })
        })
    })
})