describe("Open existing theorem, UC1", () => {

    beforeEach(() => {
        cy.visit("/");
    });

    it("renders correctly", () => {
        cy.get('#__next').should("exist");
        cy.get("[data-cy=search]").should("exist");
        cy.get("[data-cy=main-ol]").should("exist");
    });

    it("naviagtes to single theorem page and back to main page", () => {
        cy.get('[data-cy=theorem-title]').first().click();
        cy.url().should('include', '/theorem/');
        cy.get('[data-cy=back]').click();
        cy.url().should('eq', 'http://localhost:3000/');
    });
});