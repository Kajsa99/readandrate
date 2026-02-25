import PopularBooks from "../../src/components/PopularBooks";

// TDD for Popular books filter, now works as filter by rating component
describe("PopularBooks Component", () => {
    // Mock book data
    const mockBooks = [
        {
            id: 1,
            title: "The Great Gatsby",
            aurthor: "F. Scott Fitzgerald",
            rating: 5,
            comment: "Excellent book",
            user: "Bastian",
        },
        {
            id: 2,
            title: "To Kill a Mockingbird",
            aurthor: "Harper Lee",
            rating: 5,
            comment: "Masterpiece",
            user: "Eric",
        },
        {
            id: 3,
            title: "1984",
            aurthor: "George Orwell",
            rating: 4,
            comment: "Very good dystopian novel",
            user: "Emmy",
        },
        {
            id: 4,
            title: "Pride and Prejudice",
            aurthor: "Jane Austen",
            rating: 3,
            comment: "Good, but long",
            user: "Molly",
        },
        {
            id: 5,
            title: "The Catcher in the Rye",
            aurthor: "J.D. Salinger",
            rating: 2,
            comment: "Not my style",
            user: "Skepparn",
        },
        {
            id: 6,
            title: "Moby Dick",
            aurthor: "Herman Melville",
            rating: 1,
            comment: "Too boring",
            user: "Diana",
        },
    ];

    beforeEach(() => {
        // Mock the API endpoint for GET /books
        cy.intercept("GET", "http://localhost:3000/books", {
            statusCode: 200,
            body: mockBooks,
        }).as("getBooks");
    });

    it("renders a list of books with rating >= 4", () => {
        cy.mount(<PopularBooks />);
        cy.wait("@getBooks");

        // Should display only 3 books with rating 5 and 4 from mock data
        cy.get('[data-testid="book-item"]').should("have.length", 3);
    });

    it("displays only Very Good (4) and Excellent (5) rated books", () => {
        cy.mount(<PopularBooks />);
        cy.wait("@getBooks");

        // Check each book's rating badge shows correct value
        cy.get('[data-testid="book-item"]')
            .first()
            .contains("5")
            .should("exist");
        cy.get('[data-testid="book-item"]').eq(1).contains("5").should("exist");
        cy.get('[data-testid="book-item"]').eq(2).contains("4").should("exist");
    });

    it("filters to Popular by default (rating >= 4)", () => {
        cy.mount(<PopularBooks />);
        cy.wait("@getBooks");

        cy.get('[data-testid="book-item"]').should("have.length", 3);
        cy.contains("The Great Gatsby").should("exist");
        cy.contains("To Kill a Mockingbird").should("exist");
        cy.contains("1984").should("exist");
        cy.contains("Pride and Prejudice").should("not.exist");
    });

    it("filters to Average when selected (rating = 3)", () => {
        cy.mount(<PopularBooks />);
        cy.wait("@getBooks");

        cy.get('[data-testid="filter-select"]').select("Average");

        cy.get('[data-testid="book-item"]').should("have.length", 1);
        cy.contains("Pride and Prejudice").should("exist");
        cy.contains("1984").should("not.exist");
    });

    it("filters to Bad when selected (rating 1-2)", () => {
        cy.mount(<PopularBooks />);
        cy.wait("@getBooks");

        cy.get('[data-testid="filter-select"]').select("Bad");

        cy.get('[data-testid="book-item"]').should("have.length", 2);
        cy.contains("The Catcher in the Rye").should("exist");
        cy.contains("Moby Dick").should("exist");
        cy.contains("The Great Gatsby").should("not.exist");
    });

    it("shows error state on API failure", () => {
        // Mock API to return error
        cy.intercept("GET", "http://localhost:3000/books", {
            statusCode: 500,
            body: { error: "Internal Server Error" },
        }).as("getErrorBooks");

        cy.mount(<PopularBooks />);
        cy.wait("@getErrorBooks");
    });

    it("loads data on component mount", () => {
        cy.mount(<PopularBooks />);
        cy.get("@getBooks");
    });
});
