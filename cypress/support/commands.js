Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (name, lastname,
    email,phone,textDesc) => 
    { 
        cy.get('#firstName').type(name)
        cy.get('#lastName').type(lastname)
        cy.get('#email').type(email)
        cy.get('#phone').type(phone)
        cy.get('#open-text-area').type(textDesc, {delay: 0})
        cy.contains('button','Enviar').click()
    })