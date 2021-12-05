describe("Search theorems, UC-12", () => {

    let claim = "Cypress testing searching theorem";
    let step = "Cypress testing searching theorem step1";

    let id = '';

    beforeEach(() => {
        cy.visit("/create");
        cy.get('[data-cy=claim-div] [data-cy=claim-field]').type(claim);
        cy.get('[data-cy=steps-div] [data-cy=claim-field]').type(step);
        cy.get('[data-cy=create-btn]').click()
        cy.wait(1000);
        cy.url().then(urlString => {
            id = urlString.replace('http://localhost:3000/theorem/', '');
        });
        cy.visit("/");
    });

    afterEach(() => {
        cy.request('DELETE', 'api/theorem/' + id);
    });

    it("finds the correct theorem by claim", () => {
        cy.get('[data-cy=search]').type(claim);
        cy.get('[data-cy=main-ol]').within(() => {
            cy.get('[data-cy=theorem-title]').contains(claim).should("have.length", 1);
        });
    });

    it("finds the correct theorem by step", () => {
        cy.get('[data-cy=search]').type(step);
        cy.get('[data-cy=main-ol]').within(() => {
            cy.get('[data-cy=theorem-title]').contains(claim).should("have.length", 1);
        });
    });

    it("does not find a theorem by random search phrase", () => {
        cy.get('[data-cy=search]').type('asöfiawenawkljflsduhaöslkrnal');
        cy.get('[data-cy=main-ol]>li').should("have.length", 0);
    });
});