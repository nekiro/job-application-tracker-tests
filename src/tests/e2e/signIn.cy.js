beforeEach(() => {
  cy.visit('/sign-in');
});

after(() => {
  cy.visit('/sign-in');
});

describe('sign-in', () => {
  it('should render the page', () => {
    cy.url()
      .should('include', `sign-in`)
      .get('form')
      .should('be.visible')
      .get('#email')
      .should('be.visible')
      .get('#password')
      .should('be.visible')
      .get('.chakra-button')
      .should('have.text', 'Sign in');
  });

  it('should return verification error', () => {
    cy.get('#email')
      .type('foo')
      .get('#password')
      .type('bar')
      .get('.chakra-button')
      .click()
      .get('[id$=-feedback]')
      .should('be.visible');
  });

  it('should redirect to panel', () => {
    cy.get('#email')
      .type(Cypress.env('USER_EMAIL'))
      .get('#password')
      .type(Cypress.env('USER_PASSWORD'))
      .get('.chakra-button')
      .click()
      .url()
      .should('include', 'app');
  });

  it('should redirect to sign up page', () => {
    cy.get('.chakra-link')
      .should('have.text', 'Sign up now!')
      .click()
      .url()
      .should('include', 'register');
  });
});
