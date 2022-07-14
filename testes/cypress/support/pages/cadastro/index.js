import { el } from './elements'

import toast from '../../components/toast'

class PaginaDeCadastro {
    constructor() {
        this.toast = toast
    }
    abrePagina() {
        cy.visit('/signup')
    }

    form(usuario) {
        cy.get(el.name).type(usuario.name)
        cy.get(el.email).type(usuario.email)
        cy.get(el.password).type(usuario.password)
    }

    submit() {
        cy.contains(el.botaoCadastro).click()
    }
    validaMensagemAlerta(expectText){
        cy.contains('.alert-error',expectText)
        .should('be.visible')
    }

}

export default new PaginaDeCadastro()