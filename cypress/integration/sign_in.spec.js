describe("Signing in, UC14", () => {

    it("signs in to the app", () => {
        cy.visit("/");
        cy.get('a[href*="signin"]').click();
        cy.get(".signin").should("exist");
        cy.get(".signin").click();
        cy.get("form").click();
        cy.get('.js-sign-in-button').click();
    });
});