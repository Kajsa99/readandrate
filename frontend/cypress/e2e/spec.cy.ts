// testing naviagtion links
describe("My Vite project", function () {
    it("visits my site", function () {
        cy.visit("http://localhost:5173/");
        cy.contains("Book Reviews").should("be.visible");
    });
});

describe("Go to book form page", function () {
    it("clicks book form page link", function () {
        cy.visit("http://localhost:5173/");
        cy.contains("Books").click();
        cy.contains("Add a new Book Review").should("be.visible");
        cy.url().should("include", "/books");
    });
});

describe("Go to user page", function () {
    it("clicks user page link", function () {
        cy.visit("http://localhost:5173/user");
        cy.contains("Users").click();
        cy.contains("Add New User").should("be.visible");
        cy.url().should("include", "/user");
    });
});

// testing user form submission
describe("Submit user form", function () {
    it("go to user form and submit", function () {
        cy.visit("http://localhost:5173/");
        cy.contains("Users").click();
        cy.get("#name").type("Pablo");
        cy.get("#email").type("Pablo@mail.com");
        cy.get("#submit").click();
        cy.get("#message")
            .should("be.visible")
            .contains("User added successfully!");
    });
});
