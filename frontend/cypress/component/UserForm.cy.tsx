import { UserForm } from "../../src/components/userform";

// Testing the same as in e2e test but as component
describe("UserForm.cy.tsx", () => {
    it("Test userform component", () => {
        const onUserAdded = cy.stub();

        // Mock API call for users
        cy.intercept("POST", "http://localhost:3000/users", {
            statusCode: 200,
            body: { success: true },
        }).as("addUser");

        cy.mount(<UserForm onUserAdded={onUserAdded} />);
        cy.get("#name").type("Fiona");
        cy.get("#email").type("feferona@example.com");
        cy.get("#submit").click();

        // Check success message is visible
        cy.get("#message")
            .should("be.visible")
            .contains("User added successfully!");

        // Form should be cleared after submission
        cy.get("#name").should("have.value", "");
        cy.get("#email").should("have.value", "");
    });

    it("should display error when API fails", () => {
        // Mock API failure
        cy.intercept("POST", "http://localhost:3000/users", {
            statusCode: 500,
        }).as("Error adding user:");

        cy.mount(<UserForm onUserAdded={() => {}} />);
        cy.get("#name").type("TestUser");
        cy.get("#email").type("test@example.com");
        cy.get("#submit").click();

        cy.wait("@Error adding user:");
        // Form data should remain on error
        cy.get("#name").should("have.value", "TestUser");
        cy.get("#email").should("have.value", "test@example.com");
        cy.get("#error-message").should("be.visible");
    });

    it("should validate required fields", () => {
        cy.mount(<UserForm onUserAdded={() => {}} />);
        // Try to submit with empty fields
        cy.get("#submit").click();
        cy.get("#name").should("have.value", "");
        cy.get("#email").should("have.value", "");
    });

    it("should clear success message after timeout", () => {
        cy.intercept("POST", "http://localhost:3000/users", {
            statusCode: 200,
            body: { success: true },
        }).as("addUser");

        cy.mount(<UserForm onUserAdded={() => {}} />);
        cy.get("#name").type("QuickTest");
        cy.get("#email").type("quick@example.com");
        cy.get("#submit").click();

        cy.get("#message").should("be.visible");
        cy.wait(3100); // Wait for message to disappear
        cy.get("#message").should("not.exist");
    });
});
