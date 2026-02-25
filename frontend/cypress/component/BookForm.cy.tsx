import Bookform from "../../src/components/bookform";

describe("Bookform Component", () => {
    beforeEach(() => {
        // Mock the API endpoint for GET /users
        cy.intercept("GET", "http://localhost:3000/users", {
            statusCode: 200,
            body: [
                { id: 1, name: "Svenne", email: "banan@example.com" },
                { id: 2, name: "Pickle", email: "Rick@example.com" },
            ],
        }).as("getUsers");

        cy.intercept("POST", "http://localhost:3000/books", {
            statusCode: 201,
            body: { success: true },
        }).as("addBook");

        cy.mount(<Bookform />);
        cy.wait("@getUsers");
    });

    it("should render the form with all fields", () => {
        cy.get('input[placeholder="Enter book title"]').should("exist");
        cy.get('input[placeholder="Enter author\'s name"]').should("exist");
        cy.get('textarea[placeholder*="additional comments"]').should("exist");
        cy.get("select").should("have.length", 2);
        cy.get("button").contains("Add Review").should("exist");
    });

    it("should fill form and submit successfully", () => {
        cy.get('input[placeholder="Enter book title"]').type("Dracula");
        cy.get('input[placeholder="Enter author\'s name"]').type("Bram Stoker");
        cy.get('textarea[placeholder*="additional comments"]').type(
            "First gothic horror novel I read, really like it!",
        );
        cy.get("select").first().select("5");
        cy.get("select").last().select("Svenne");
        cy.get("button").contains("Add Review").click();

        cy.wait("@addBook").its("response.statusCode").should("eq", 201);
    });

    // checks the user dropdown shows both mock data names
    it("should populate user dropdown", () => {
        cy.get("select")
            .last()
            .should("contain", "Svenne")
            .and("contain", "Pickle");
    });
});
