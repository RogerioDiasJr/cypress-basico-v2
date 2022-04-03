/// <reference types="Cypress" />

beforeEach(() => {
    cy.visit('./src/index.html')
    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  })

describe('Central de Atendimento ao Cliente TAT', function() {
    it('verifica o mensagem de erro desaparece depois de 3 segundos', function() {
        cy.clock()
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
        cy.tick(3000)
        cy.get('.error').should('not.be.visible')       

    })
    Cypress._.times(1, () => {
        it('verifica o mensagem de sucesso desaparece depois de 3 segundos', function() {
            const longText = Cypress._.repeat('Test ', 20)
            cy.clock()
            cy.fillMandatoryFieldsAndSubmit('Bruce', 'Wayne', 
            'Wayne@email.com','3333333', longText)
            cy.get('.success').should('be.visible')
            cy.tick(3000)
            cy.get('.success').should('not.be.visible')
          })
        })

        it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
            cy.get('.success')
              .should('not.be.visible')
              .invoke('show')
              .should('be.visible')
              .and('contain', 'Mensagem enviada com sucesso.')
              .invoke('hide')
              .should('not.be.visible')
            cy.get('.error')
              .should('not.be.visible')
              .invoke('show')
              .should('be.visible')
              .and('contain', 'Valide os campos obrigatórios!')
              .invoke('hide')
              .should('not.be.visible')
          })

        it('preenche a area de texto usando o comando invoke', () =>{

            const longText = Cypress._.repeat('Test ', 20)
            cy.get('#open-text-area')
              .invoke('val',longText)
              .should('have.value',longText)

          })

        it('faz uma requisição HTTP', ()=>{
            cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
              .should(function(response){
                  const {status, statusText, body} = response
                  expect(status).to.equal(200)
                  expect(statusText).to.equal('OK')
                  expect(body).to.include('CAC TAT')
              })

        

        
        })

        it.only('Acha o gato', ()=>{
            cy.get('#cat')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
        })

})