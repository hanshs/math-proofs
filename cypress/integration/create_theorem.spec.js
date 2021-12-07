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

    it("does not create a theorem with an empty statement", () => {
        let claim = "Cypress testing theorem creation";
        let step1 = "Cypress testing theorem creation step1";

        cy.get('[data-cy=create-link]').click();
        cy.get('[data-cy=claim-div] [data-cy=claim-field]').type(claim);
        cy.get('[data-cy=steps-div] [data-cy=claim-field]').type(step1);
        cy.get('[data-cy=add-step]').click();
        cy.get('[data-cy=create-btn]').click();
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Please delete or fill empty proof steps and statements!');
            return true;
        });
        cy.get('[data-cy=back]').click();
        cy.get('[data-cy=main-ol]').within(() => {
            cy.get(claim).should("have.length", 0);
        });
    });

    it("creates a theorem with a step that has a subproof", () => {
        let claim = "Cypress testing theorem creation";
        let step1 = "Cypress testing theorem creation step1";
        let subProof = "Cypress testing theorem creation subProof";

        cy.get('[data-cy=create-link]').click();
        cy.get('[data-cy=claim-div] [data-cy=claim-field]').type(claim);
        cy.get('[data-cy=steps-div] [data-cy=claim-field]').type(step1);

        cy.get('[data-cy=add-subproof]').click();
        cy.get('[data-cy=subproof]').within(() => {
            cy.get('[data-cy=claim-field]').type(subProof);
        });
        cy.get('[data-cy=create-btn]').click();
        cy.wait(3000);
        cy.get('[data-cy=theorem-ol]').contains(subProof);
        cy.url().then((urlString) => {
            let url = '/api' + urlString.replace('http://localhost:3000', '');
            cy.request('DELETE', url);
        })      
        cy.visit("/");
    });

    it("deletes a subproof during theorem creation", () => {
        let claim = "Cypress testing theorem creation";
        let step1 = "Cypress testing theorem creation step1";
        let subProof = "Cypress testing theorem creation subProof";

        cy.get('[data-cy=create-link]').click();
        cy.get('[data-cy=claim-div] [data-cy=claim-field]').type(claim);
        cy.get('[data-cy=steps-div] [data-cy=claim-field]').type(step1);

        cy.get('[data-cy=add-subproof]').click();
        cy.get('[data-cy=subproof]').within(() => {
            cy.get('[data-cy=claim-field]').type(subProof);
        });

        cy.get('[data-cy=del-subproof]').click();
        cy.get(subProof).should("have.length", 0);

        cy.visit("/");
    });
});