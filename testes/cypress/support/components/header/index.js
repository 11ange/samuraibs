import { el } from './elements'

class Header {
    usuarioLogado(nomeUsuario) {
        cy.get(el.headerNomeCompleto, { timeout: 7000 })
            .should('be.visible')
            .should('have.text', nomeUsuario)
    }
}

export default new Header()