// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("prepare", () => {
  cy.visit("http://localhost:3000/");
  cy.intercept("GET", "https://norma.nomoreparties.space/api/ingredients", {
    fixture: "ingredients",
  }).as("getData");
  cy.wait("@getData");
});

Cypress.Commands.add("prepareIngredientPopup", () => {
  cy.visit("http://localhost:3000/");
  cy.intercept("GET", "https://norma.nomoreparties.space/api/ingredients", {
    fixture: "ingredients",
  }).as("getData");
  cy.wait("@getData");
  cy.get("div[data-id=essential-element-bun]").first().click();
  cy.url().should("include", "/ingredients/essential-element-bun");
});
