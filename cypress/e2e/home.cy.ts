describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders the Home component with initial state', () => {
    cy.get('input[placeholder="Enter 3 or more characters"]').should('exist');
    cy.get('button').contains('Search by Users').should('exist');
  });

  it('handles input change and initiates user search', () => {
    cy.intercept('GET', '**/search/users?*', {
      fixture: 'searchUsers.json',
    }).as('searchUsers');

    cy.get('input[placeholder="Enter 3 or more characters"]').type('testuser');
    cy.wait('@searchUsers');

    cy.get('.UserCard').should('exist');
    cy.get('.UserCard').contains('testuser').should('exist');
  });

  it('handles search type change to repositories', () => {
    cy.intercept('GET', '**/search/repositories?*', {
      fixture: 'searchRepositories.json',
    }).as('searchRepositories');

    cy.get('input[placeholder="Enter 3 or more characters"]').type('testrepo');
    cy.get('button').contains('Search by Users').click();
    cy.get('.ListboxOption').contains('Repositories').click();

    cy.wait('@searchRepositories');

    cy.get('.RepoCard').should('exist');
    cy.get('.RepoCard').contains('testrepo').should('exist');
  });

  it('displays error message when search fails', () => {
    cy.intercept('GET', '**/search/users?*', {
      statusCode: 500,
      body: { message: 'Error fetching data' },
    }).as('searchUsersError');

    cy.get('input[placeholder="Enter 3 or more characters"]').type('testuser');
    cy.wait('@searchUsersError');

    cy.get('.text-error')
      .contains('Error loading data. Please try again')
      .should('exist');
  });

  it('handles infinite scrolling and loads more results', () => {
    cy.intercept('GET', '**/search/users?*page=1*', {
      fixture: 'searchUsersPage1.json',
    }).as('searchUsersPage1');
    cy.intercept('GET', '**/search/users?*page=2*', {
      fixture: 'searchUsersPage2.json',
    }).as('searchUsersPage2');

    cy.get('input[placeholder="Enter 3 or more characters"]').type('testuser');
    cy.wait('@searchUsersPage1');

    cy.get('.UserCard').should('have.length', 20);

    cy.scrollTo('bottom');
    cy.wait('@searchUsersPage2');

    cy.get('.UserCard').should('have.length', 40);
  });
});
