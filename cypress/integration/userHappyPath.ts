/// <reference types="cypress" />

context('720p resolution', () => {
  beforeEach(() => {
    /**
     * Run these tests as if in a desktop browser,
     * with a 720p monitor
     */
    cy.viewport(1280, 720)
  })
  describe('User happy path', () => {
    it('Succesfully creates a Post and Likes it', () => {
      cy.login();
      cy.visit('/')
      cy.contains('Search Interview').should('exist')
      cy.get('.add-button').click()
      cy.get('input[name="title"]').type('Test Post From Cypress')
      cy.get('input[name="client"]').type('Cypress client')
      cy.get('.ql-editor p').type('Text from Cypress')
      cy.contains('Submit').click()
      cy.get('.swal2-confirm').click()
      cy.contains('Test Post From Cypress').should('exist')
      cy.contains('Test Post From Cypress').click()
      cy.get('button[data-testid="likes-button"]').click()
      cy.contains('1').should('exist')
      cy.get('button[data-testid="delete-button"]').click()
      cy.get('.swal2-confirm').click()     
      cy.wait(2000)
      cy.get('.swal2-confirm').click()
      cy.contains('Test Post From Cypress').should('not.exist')
    })
  })
})

export {}
