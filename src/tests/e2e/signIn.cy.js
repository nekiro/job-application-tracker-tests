beforeEach(() => {
  cy.visit('/sign-in');
});

after(() => {
  cy.visit('/sign-in');
});

const generateAllUtf8Str = () => {
  let str = '';
  for (let i = 0x7f; i < 0xbf; i++) {
    str += String.fromCharCode(i);
  }
  return str;
};

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
    cy.fillInputs([
      { input: '#email', value: 'foo' },
      { input: '#password', value: 'bar' },
    ])
      .get('.chakra-button')
      .click()
      .get('[id$=-feedback]')
      .should('be.visible');
  });

  it('should return verification error', () => {
    cy.fillInputs([
      { input: '#email', value: generateAllUtf8Str() },
      { input: '#password', value: generateAllUtf8Str() },
    ])
      .get('.chakra-button')
      .click()
      .get('[id$=-feedback]')
      .should('be.visible');
  });

  it('should redirect to panel', () => {
    cy.fillInputs([
      { input: '#email', value: Cypress.env('USER_EMAIL') },
      { input: '#password', value: Cypress.env('USER_PASSWORD') },
    ])
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
