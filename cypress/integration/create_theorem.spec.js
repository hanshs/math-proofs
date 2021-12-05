describe("Testing theorem creation, UC-2, UC-6", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("checks that the user is signed in", () => {
        cy.get('[data-cy=signout]').should("exist");
        cy.get('[data-cy=create-link]').should("exist");
    });

    it("navigates to create page and checks if elements exist", () => {
        cy.get('[data-cy=create-link]').click();
        cy.get('[data-cy=claim-div]').should("exist");
        cy.get('[data-cy=steps-div]').should("exist");
        cy.get('[data-cy=claim-div] [data-cy=claim-field]').should("exist");
        cy.get('[data-cy=steps-div] [data-cy=claim-field]').should("exist");
        cy.get('[data-cy=claim-div] [data-cy=add-btn]').should("exist");
        cy.get('[data-cy=steps-div] [data-cy=add-btn]').should("exist");
        cy.get('[data-cy=add-step]').should("exist");
    });

    it("shows theorem preview and creation button", () => {
        let claim = "Cypress testing theorem preview";
        let step = "Cypress testing theorem preview step1";

        cy.get('[data-cy=create-link]').click();
        cy.get('[data-cy=claim-div] [data-cy=claim-field]').type(claim);
        cy.get('[data-cy=steps-div] [data-cy=claim-field]').type(step);
        
        cy.get('[data-cy=preview-div]').should("exist");
        cy.get('[data-cy=preview-div]').within(() => {
            cy.get('[data-cy=theorem-claim]').contains(claim);
            cy.get('ol>li').within(() => {
                cy.get('[data-cy=claim]').contains(step);
            });
        });
    });

    it("creates a theorem", () => {
        let claim = "Cypress testing theorem creation";
        let step1 = "Cypress testing theorem creation step1";
        let subStep1 = "Cypress testing theorem creation subStep1";
        let step2 = "Cypress testing theorem creation step2";

        cy.get('[data-cy=create-link]').click();
        cy.get('[data-cy=claim-div] [data-cy=claim-field]').type(claim);
        cy.get('[data-cy=steps-div] [data-cy=claim-field]').type(step1);
        cy.get('[data-cy=steps-div] [data-cy=add-btn]').click();

        cy.get('[data-cy=steps-div] [data-cy=claim-field]').eq(1).type(subStep1);

        cy.get('[data-cy=add-step]').click();
        cy.get('[data-cy=steps-div]>ol>li').eq(1).within(() => {
            cy.get('[data-cy=claim-field]').type(step2);
        });
        cy.get('[data-cy=create-btn]').click();
        
        cy.get('[data-cy=theorem-claim]').contains(claim)
        cy.get('[data-cy=delete-theorem]').click();
        cy.on('window:confirm', () => true);
        cy.visit("/");
    });

    it("deletes step during theorem creation", () => {
        let claim = "Cypress testing theorem creation";
        let step1 = "Cypress testing theorem creation step1";
        let step2 = "Cypress testing theorem creation step2";

        cy.get('[data-cy=create-link]').click();
        cy.get('[data-cy=claim-div] [data-cy=claim-field]').type(claim);
        cy.get('[data-cy=steps-div] [data-cy=claim-field]').type(step1);
        cy.get('[data-cy=add-step]').click();
        cy.get('[data-cy=steps-div]>ol>li').eq(1).within(() => {
            cy.get('[data-cy=claim-field]').type(step2);
        });
        cy.get('[data-cy=delete-step]').should("exist");
        cy.get('[data-cy=delete-step]').click();
        cy.get('[data-cy=steps-div]').within(() => {
            cy.get(step2).should("have.length", 0);
        });
        cy.visit("/");
    });
});