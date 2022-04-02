/// <reference types="Cypress" />

beforeEach(() => {
    cy.visit('./src/index.html')
  })

describe('Central de Atendimento ao Cliente TAT', function() {
    it('verifica o título da aplicação', function() {
        
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')

    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        
        const longTest = 'Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste ';

        cy.get('#firstName').type('Bruce')
        cy.get('#lastName').type('Wayne')
        cy.get('#email').type('Wayne@email.com')
        cy.get('#phone').type('33333333')
        cy.get('#open-text-area').type(longTest, {delay: 0})
        cy.get('.button').click()
        cy.get('.success').should('be.visible')
    })


    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        
      const longTest = 'Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste ';

      cy.get('#firstName').type('Bruce')
      cy.get('#lastName').type('Wayne')
      cy.get('#email').type('email.com')
      cy.get('#phone').type('33333333')
      cy.get('#open-text-area').type(longTest, {delay: 0})
      cy.get('.button').click()
      cy.get('.error').should('be.visible')
  })

  it('campo Phone deveia aceitar somente valores numéricos', function() {
        
    const longTest = 'Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste ';

    cy.get('#firstName').type('Bruce')
    cy.get('#lastName').type('Wayne')
    cy.get('#email').type('email.com')
    cy.get('#phone').type('Test phone').should('be.empty')
})
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
    const longTest = 'Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste ';
    cy.get('#firstName').type('Bruce')
    cy.get('#lastName').type('Wayne')
    cy.get('#email').type('email.com')
    cy.get('#phone').type('test')
    cy.get('#open-text-area').type(longTest, {delay: 0})
    cy.get('.button').click()
    cy.get('.error').should('be.visible')
  })

  it('campo Phone deveia ser obrigatorio', function() {
    cy.get('#firstName').type('Bruce')
    cy.get('#lastName').type('Wayne')
    cy.get('#email').type('email.com')
    cy.get('#phone').type('Test phone').should('be.empty')
    cy.get('#phone-checkbox').click()
    cy.get('.button').click()
    cy.get('.error').should('be.visible')
})


  it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {

    const longTest = 'Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste ';

    cy.get('#firstName')
      .type('Bruce')
      .should('have.a.value','Bruce')
      .clear()
      .should('be.empty')
    cy.get('#lastName')
      .type('Wayne')
      .should('have.a.value','Wayne')
      .clear()
      .should('be.empty')
    cy.get('#email')
      .type('Wayne@email.com')
      .should('have.a.value','Wayne@email.com')
      .clear()
      .should('be.empty')
    cy.get('#phone')
      .type('33333333333')
      .should('have.a.value','33333333333')
      .clear()
      .should('be.empty')
    cy.get('#open-text-area')
      .type(longTest)
      .should('have.a.value',longTest)
      .clear()
      .should('be.empty')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {

    cy.get('.button').click()
    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', function() {
    cy.fillMandatoryFieldsAndSubmit('Bruce', 'Wayne', 
    'Wayne@email.com','3333333', 'Teste')
    cy.get('.success').should('be.visible')
  })


  it('seleciona um produto (YouTube)', function() {
    cy.get('#product').select('YouTube').should('have.a.value','youtube')
  })

  it('seleciona um produto (Mentoria)', function() {
    cy.get('#product').select('Mentoria').should('have.a.value','mentoria')
  })

  it('seleciona um produto (Blog)', function() {
    cy.get('#product').select(1).should('have.a.value','blog')
  })

  it('marca o tipo de atendimento "Feedback"', function() {
      cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.a.value','feedback')
  })

  it('marca cada tipo de atendimento', function() {

    cy.get('input[type="radio"]')
      .each(($radio) => {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
})


it('marca ambos checkboxes, depois desmarca o último', function() {
  cy.get('input[type="checkbox"]')
    .as('checkboxes')
    .check()
    .last()
    .uncheck()
    .should('not.be.checked')
})

it('seleciona um arquivo da pasta fixtures', function() {
  cy.get('#file-upload')
  .should('not.have.value')
  .selectFile('cypress/fixtures/example.json')
  .should(($input) => {
    expect($input[0].files[0].name).to.equal('example.json')
  })
})

it('seleciona um arquivo simulando um drag-and-drop', function() {
  cy.get('#file-upload')
  .should('not.have.value')
  .selectFile('cypress/fixtures/example.json',{ action: 'drag-drop'})
  .should(($input) => {
    expect($input[0].files[0].name).to.equal('example.json')
  })

})

it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
  cy.fixture('example.json').as('sampleFile')
  cy.get('#file-upload')
  .should('not.have.value')
  .selectFile('@sampleFile')
  .should(($input) => {
    expect($input[0].files[0].name).to.equal('example.json')
  })
})


it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
  cy.get('a').should('have.attr', 'target', '_blank')
})

it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
  cy.get('a').invoke('removeAttr', 'target').click( )
  cy.contains('CAC TAT - Política de privacidade').should('be.visible')
})

it('testa a página da política de privavidade de forma independente', function() {
  cy.get('a').invoke('removeAttr', 'target').click( )
})


})