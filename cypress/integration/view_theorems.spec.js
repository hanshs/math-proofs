describe("Open existing theorem, UC1", () => {

    beforeEach(() => {
        cy.visit("/");
    });

    it("renders correctly", () => {
        cy.get('#__next').should("exist");
        cy.get("[data-cy=search]").should("exist");
        cy.get("[data-cy=main-ol]").should("exist");
    });

    it("naviagtes to single theorem page", () => {
        cy.get('a[href*="theorem"]').first().click();
        cy.get('.text-xl').should("exist");
    });
});