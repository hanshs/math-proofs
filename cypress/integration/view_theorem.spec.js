describe("Viewing a theorem, UC-1", () => {

    let claim = "Cypress testing viewing theorem";
    let step1 = "Cypress testing viewing theorem step1";
    let subStep1 = "Cypress testing viewing theorem subStep1";
    let step2 = "Cypress testing viewing theorem step2";

    let id = '';

    beforeEach(() => {
        cy.visit("/create");
        cy.get('[data-cy=claim-div] [data-cy=claim-field]').type(claim);
        cy.get('[data-cy=steps-div] [data-cy=claim-field]').type(step1);
        cy.get('[data-cy=steps-div] [data-cy=add-btn]').click();
        cy.get('[data-cy=steps-div] [data-cy=claim-field]').eq(1).type(subStep1);
        cy.get('[data-cy=add-step]').click();
        cy.get('[data-cy=steps-div]>ol>li').eq(1).within(() => {
            cy.get('[data-cy=claim-field]').type(step2);
        });
        cy.get('[data-cy=create-btn]').click()
        cy.wait(2000);
        cy.url().then(urlString => {
            id = urlString.replace('http://localhost:3000/theorem/', '');
        });
        cy.visit("/");
    });

    afterEach(() => {
        cy.request('DELETE', 'api/theorem/' + id);
    });

    it("redirects to the single theorem page", () => {
        cy.get('[data-cy=main-ol]>li').eq(-1).within(() => {
            cy.get('[data-cy=theorem-title]').click();
        });
        cy.url().should('include', '/theorem/');
    });

    it("contains the correct claim, steps and substeps", () => {
        cy.visit("theorem/" + id);
        cy.get('[data-cy=theorem-claim]').contains(claim);
        cy.get('[data-cy=theorem-ol]>li').eq(0).within(() => {
            cy.get('[data-cy=claim]').click();

            cy.get('[data-cy=claim]').eq(0).within(() => {
                cy.contains(step1);
            });
            cy.get('[data-cy=claim]').eq(1).within(() => {
                cy.contains(subStep1);
            });
        });

        cy.get('[data-cy=theorem-ol]>li').eq(1).within(() => {
            cy.get('[data-cy=claim]').contains(step2);
        });
    });

})