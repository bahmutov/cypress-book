/// <reference types="cypress" />
describe('cypress-book social image', () => {
  // GitHub suggests the resolution of 1280×640px for best display
  it('captures an image', { viewportWidth: 1280, viewportHeight: 640 }, () => {
    cy.visit('https://example.cypress.io')
    cy.log('**checking the header ✅**')
    cy.contains('h1', 'Kitchen Sink').should('be.visible')

    cy.screenshot('social-image', {
      clip: { x: 0, y: 0, width: 1280, height: 640 },
    })
  })
})
