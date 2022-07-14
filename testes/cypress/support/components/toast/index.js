import { el } from './elements'

class Toast {
    validaTexto(textoEsperado) {
        cy.get(el.toaster)
            .should('be.visible')
            .find('p')
            .should('have.text', textoEsperado)
    }
}

export default new Toast()