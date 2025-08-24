Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'Henrique',
    lastName: 'Silva',
    email: 'henriquesd@gmail.com',
    text: 'teste.'
}) => {
  cy.get('#firstName').type(data.firstName) //Pega o campo pelo id e insere um texto 
  cy.get('#lastName').type(data.lastName) //Pega o campo pelo id e insere um texto 
  cy.get('#email').type(data.email) //Pega o campo pelo id e insere um texto
  cy.get('#open-text-area').type(data.text) //Pega o campo pelo id e insere um texto com delay de 0
  cy.get('button[type="submit"]').click() //Pega o botão pelo seletor e clica
})

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })