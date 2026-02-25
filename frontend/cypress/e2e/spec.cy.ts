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
        cy.contains("Add Review").click();
        cy.contains("Add Book Review").should("be.visible");
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

describe("Go to popular books page", function () {
    it("clicks popular books page link", function () {
        cy.visit("http://localhost:5173/");
        cy.contains("Popular Books").click();
        cy.contains("Popular Books").should("be.visible");
        cy.url().should("include", "/popular");
    });
});

// testing user form submission, vill get automatic error since pablo alerady exist
describe("Submit user form", function () {
    it("go to user form and submit", function () {
        cy.visit("http://localhost:5173/");
        cy.contains("Users").click();
        cy.get("#name").type("Pablo");
        cy.get("#email").type("Pablo@mail.com");
        cy.get("#submit").click();
        cy.get("#error-message").should("be.visible");
    });
});
