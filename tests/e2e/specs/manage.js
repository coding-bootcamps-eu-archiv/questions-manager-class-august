describe("Manage Route Test", () => {
  it("has a create button", async () => {
    cy.visit("/manage");

    cy.get("#create-session");
  });

  it("creates a new session and the session is visible in the overview", () => {
    cy.visit("/manage");
    cy.get("#create-session").trigger("click");
    const dummyTitle = "Q&A with Günther Jauch";
    const dummyDescription = "Session zum Thema Bildzeitung und ihm.";

    cy.get("#titleSession").type(dummyTitle);
    cy.get("#descriptionSession").type(dummyDescription);
    cy.get(".sessions__add-button").trigger("click");

    cy.url().should("contain", "manage/edit");
    cy.get("div.session__title").should("have.text", dummyTitle);
    cy.get("div.session__desc").should("have.text", dummyDescription);
  });
});
