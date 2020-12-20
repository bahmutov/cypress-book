/// <reference types="cypress" />
describe('cypress-book', () => {
  it('works 🌍', () => {
    cy.visit('https://example.cypress.io')
    cy.log('**checking the header ✅**')
    cy.contains('h1', 'Kitchen Sink').should('be.visible')
    cy.screenshot('hello-world', { capture: 'runner', log: false })
  })
})
