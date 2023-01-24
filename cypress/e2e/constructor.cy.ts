describe('template spec', () => {
  beforeEach(() => {
    // Устанавливаем токены:
    window.localStorage.setItem('refreshToken', JSON.stringify('test-refreshToken'));
    window.localStorage.setItem('token', 'test-accessToken');

    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('postOrder');

    cy.visit('http://localhost:3000');
  });

  it('Show ingredient detail info in modal', () => {
    cy.get('[class^=burger-ingredients-item_ingredient__]').first().click();
    cy.get('[class^=burger-ingredients-item_ingredient__]')
      .first()
      .find('[class^=burger-ingredients-item_name__]')
      .invoke('text')
      .as('name');
    cy.get('#modal').find('[class^=modal_header__]').should('have.text', 'Детали ингредиента');
    cy.get('#modal').get('@name').should('exist');
  });

  it('DnD ingredient and check active order btn and create order', () => {
    cy.get('[class^=burger-constructor-list-parts_]').as('targetBlock');

    // start
    cy.get('@targetBlock').should('be.empty');
    cy.get('[class^=burger-constructor_result__]').should('not.exist');

    // DnD first element not bun
    cy.get('#main')
      .find('[class^=burger-ingredients-item_ingredient__]')
      .first()
      .as('mainIngredient')
      .trigger('dragstart');

    let ingredientName: string;
    cy.get('@mainIngredient')
      .find('[class^=burger-ingredients-item_name__]')
      .then(($ingredientName) => {
        ingredientName = $ingredientName.text();
      });
    cy.get('@targetBlock').trigger('drop');

    // DnD success
    cy.get('@targetBlock')
      .find('.constructor-element__text')
      .should(($name) => {
        const name = $name.text();
        expect(name).to.equal(ingredientName);
      });

    // createOrderBtn added
    cy.get('[class^=burger-constructor_result__]').find('button').as('createOrderButton');
    cy.get('@createOrderButton').should('exist').and('be.disabled');

    // add bun ingredient & createOrderButton is not disable
    cy.get('#bun')
      .find('[class^=burger-ingredients-item_ingredient__]')
      .first()
      .as('mainIngredient')
      .trigger('dragstart');
    cy.get('@targetBlock').trigger('drop');
    cy.get('@createOrderButton').should('not.be.disabled');

    // Create order
    cy.get('@createOrderButton').click();
    cy.get('#modal').find('[class^=order-details_order-result__]').contains('123').should('exist');
  });
});
