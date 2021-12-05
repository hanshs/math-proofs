describe("Deleting theorem, UC-11", () => {
    
    let claim = "Cypress testing theorem deletion";
    let step = "Cypress testing theorem deletion step1";

    beforeEach(() => {        
        cy.visit("/create");
        cy.get('[data-cy=claim-div] [data-cy=claim-field]').type(claim);
        cy.get('[data-cy=steps-div] [data-cy=claim-field]').type(step);
        cy.get('[data-cy=create-btn]').click();
        cy.visit("/");
    });

    it("deletes a theorem", () => {
        cy.get('[data-cy=signout]').should("exist");
        cy.get('[data-cy=main-ol]>li').eq(-1).within(() => {
            cy.get('[data-cy=theorem-title]').click();
        });
        cy.get('[data-cy=delete-theorem]').click();
        cy.on('window:confirm', (text) => {
            expect(text).to.contains('Are you sure?');
            return true;
        });
        cy.url().should('eq', 'http://localhost:3000/');
    });

    it("keeps the theorem if deletion is not confirmed", () => {
        cy.get('[data-cy=signout]').should("exist");
        cy.get('[data-cy=main-ol]>li').eq(-1).within(() => {
            cy.get('[data-cy=theorem-title]').click();
        });
        cy.get('[data-cy=delete-theorem]').click();
        cy.on('window:confirm', () => false);
        
        cy.get('[data-cy=theorem-claim]').should("contain", claim);
        
        cy.url().then(urlString => {
            let url = '/api' + urlString.replace('http://localhost:3000', '');
            cy.request('DELETE', url);
        });

        cy.visit("/");
        cy.get('[data-cy=main-ol]').not().contains(claim);
    });

});