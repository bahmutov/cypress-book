/// <reference types="cypress" />
describe('cypress-book', () => {
  it('works 🌍', () => {
    cy.visit('https://example.cypress.io')
    cy.log('**checking the header ✅**')
    cy.contains('h1', 'Kitchen Sink').should('be.visible')
    cy.screenshot('hello-world', { capture: 'runner', log: false })

    // you can take screenshot of the app only
    cy.screenshot('hello-world-page', {
      clip: { x: 0, y: 0, width: 700, height: 500 },
    })
  })
})
