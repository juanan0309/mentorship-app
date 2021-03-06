/// <reference types="cypress" />

context('720p resolution', () => {
  beforeEach(() => {
    /**
     * Run these tests as if in a desktop browser,
     * with a 720p monitor
     */
    cy.viewport(1280, 720)
  })

  describe('User owner can edit his own post', () => {
    it('Successfully edit a post', () => {
      cy.login()
      cy.visit('/')
      cy.get('.add-button').click()
      cy.get('input[name="title"]').type('Test Post From Cypress')
      cy.get('input[name="client"]').type('Test Client')
      cy.get('.ql-editor p').type('Text from Cypress')
      cy.contains('Submit').click()
      cy.get('.swal2-confirm').click()
      cy.contains('Test Post From Cypress').click()
      cy.get('button[data-testid="edit-button"]').should('exist')
      cy.get('button[data-testid="edit-button"]').click()
      cy.wait(2000)
      cy.url().should('include', '/edit')
      cy.contains('.MuiButton-root', /Update/i).should('exist')
      cy.contains('.MuiButton-root', /Update/i).click()
      cy.get('.swal2-confirm').click()
      cy.contains('Test Post From Cypress').click()
      cy.get('button[data-testid="delete-button"]').click()
      cy.get('.swal2-confirm').click()   
      cy.wait(2000)
      cy.get('.swal2-confirm').click()
    })
  })
})

export {}
