describe("Constructor tests", () => {
  it("should drag bun in bun constructor", () => {
    cy.prepare();
    cy.get("[data-id=essential-element-bun]").as("card");
    cy.get("[data-test-id=bun-constructor]").as("targetBlock");

    cy.get("@card").trigger('dragstart');
    cy.get("@targetBlock").trigger('drop');

    cy.get("@targetBlock").find(".constructor-element").should("exist");
  });

  it("should not drag main or sauce in bun constructor", () => {
    cy.prepare();
    cy.get("[data-id=essential-element-main]").as("cardMain");
    cy.get("[data-id=essential-element-sauce]").as("cardSauce");

    cy.get("[data-test-id=bun-constructor]").as("targetBlock");

    cy.get("@cardMain").trigger('dragstart');
    cy.get("@targetBlock").trigger('drop');
    cy.get("@cardSauce").trigger('dragstart');
    cy.get("@targetBlock").trigger('drop');

    cy.get("@targetBlock").find(".constructor-element").should("not.exist");
  });

  it("should drag main or sauce in constructor", () => {
    cy.prepare();
    cy.get("[data-id=essential-element-main]").as("cardMain");
    cy.get("[data-id=essential-element-sauce]").as("cardSauce");
    cy.get("[data-test-id=constructor]").as("targetBlock");

    cy.get("@cardMain").trigger('dragstart');
    cy.get("@targetBlock").trigger('drop');
    cy.get("@cardSauce").trigger('dragstart');
    cy.get("@targetBlock").trigger('drop');

    cy.get("@targetBlock").find(".constructor-element").should('have.length', 2);
  });
});
