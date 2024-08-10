describe("Popup tests", () => {
  it("should open ingredient popup after click on element", () => {
    cy.prepare();
    cy.get("div[data-id=essential-element-bun]").first().click();
    cy.url().should("include", "/ingredients/essential-element-bun");
    cy.get('[data-test-id="title"]').should("have.text", "Ингредиент");
    cy.get('[data-test-id="calories"]').should("have.text", "420");
    cy.get('[data-test-id="proteins"]').should("have.text", "10");
    cy.get('[data-test-id="fat"]').should("have.text", "20");
    cy.get('[data-test-id="carbohydrates"]').should("have.text", "30");
  });

  it("should close popup after click on close button", () => {
    cy.prepareIngredientPopup();
    cy.get('#modal-root [data-test-id="close"]').first().click();
    cy.get('#modal-root').should('be.empty');
    cy.url().should('equal', 'http://localhost:3000/');
  });

  it("should close popup after click on empty space", () => {
    cy.prepareIngredientPopup();
    cy.get('body').click(0, 0);
    cy.get('#modal-root').should('be.empty');
    cy.url().should('equal', 'http://localhost:3000/');
  });
});
