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
      cy.get('.ql-editor p').type('Text from Cypress')

      cy.contains('Submit').click()

      cy.wait(2000)

      cy.get('.swal2-confirm').click()

      cy.wait(2000)

      cy.contains('Test Post From Cypress').click()

      cy.wait(2000)

      cy.get('button[data-testid="edit-button"]').should('exist')

      cy.get('button[data-testid="edit-button"]').click()

      cy.url().should('include', '/edit')

      cy.contains('.MuiButton-root', /Update/i).should('exist')
    })
  })
})

export {}
