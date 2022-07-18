
describe('constructor', () => {

  Cypress.Cookies.defaults({
    preserve: "token"
  })

  afterEach(() => {
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  it('Авторизация проходит успешно', () => {
    cy.visit('http://localhost:3000/login');
    cy.wait(1000);

    cy.get('[name="email"]').first().type('toshig48@mail.ru');
    cy.get('[name="password"]').first().type('Qwerty');

    cy.get('[name="submit-button"]').first().click();
    cy.wait(1000);
    cy.get('[data-at="main-title"]').should('exist');
  })

  it('Открытие модального окна с описанием ингридиента проходит успешно', () => {
    cy.get('[data-at="burger-ingredients"]').contains('Говяжий метеорит').first().click();
    cy.get('[data-at="modal-title"]').should('exist');
    cy.get('[data-at="ingredient-name"]').contains('Говяжий метеорит').should('exist');
    cy.wait(2000);
    cy.get('[data-at="modal-title"]').find('svg').first().click();
    cy.wait(2000);
  })

  it('Перетаскивание ингридиентов проходит успешно', () => {
    cy.get('[data-at="burger-ingredients"]').contains('Краторная булка').first().trigger('dragstart');
    cy.get('[data-at="burger-constructor"]').first().trigger('drop');
    cy.get('[data-at="burger-constructor"]').contains('Краторная булка').should('exist');
    cy.wait(1000);
    cy.get('[data-at="burger-ingredients"]').contains('Соус Spicy-X').first().trigger('dragstart');
    cy.get('[data-at="burger-constructor"]').first().trigger('drop');
    cy.get('[data-at="burger-constructor"]').contains('Соус Spicy-X').should('exist');
    cy.wait(1000);
    cy.get('[data-at="burger-ingredients"]').contains('Биокотлета из марсианской Магнолии').first().trigger('dragstart');
    cy.get('[data-at="burger-constructor"]').first().trigger('drop');
    cy.get('[data-at="burger-constructor"]').contains('Биокотлета из марсианской Магнолии').should('exist');
    cy.wait(2000);
  })

  it('Создание заказа проходит успешно', () => {
    cy.get('[name="create-order"]').first().click();
    cy.wait(15000);
    cy.get('[data-at="modal-title"]').should('exist');
    cy.get('[data-at="modal-create-order-started-cooking"]').contains('Ваш заказ начали готовить').should('exist');
    cy.wait(5000);
    cy.get('[data-at="modal-title"]').find('svg').first().click();
  })
})
