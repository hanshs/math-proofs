/// <reference types="cypress" />

describe("Open existing theorem, UC1", () => {
    beforeEach(() => {
        cy.visit("/");
    })

    it("renders correctly", () => {
        cy.get('#__next').should("exist");
        cy.get('a[href*="signin"]').should("exist");
        cy.get("#search-field").should("exist");
        cy.get(".w-full").should("exist");
    });

    it("navigates to sign-in page", () => {
        cy.get('a[href*="signin"]').click();
        cy.get(".signin").should("exist");
    });

    it("naviagtes to single theorem page", () => {
        cy.get('a[href*="theorem"]').first().click();
        cy.get('.text-xl').should("exist");
    });

    it("filters theorems accoring to entered search phrase", () => {
        const phrase = "Theorem statement";
        cy.get("#search-field").type(phrase);
        cy.get('a[href*="theorem"]')
            .should("have.length", 1)
            .first()
            .should("have.text", "Example theorem statement");
    });
});