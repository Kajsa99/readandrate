export type Book = {
    id: number;
    title: string;
    aurthor: string;
    rating: number;
    comment: string | null;
    user?: string | null;
};

export function applyRatingFilter(books: Book[], filter: string): Book[] {
    let filtered = books;

    if (filter === "All") {
        return filtered;
    } else if (filter === "Popular") {
        filtered = books.filter((book) => book.rating >= 4);
    } else if (filter === "Average") {
        filtered = books.filter((book) => book.rating > 2 && book.rating < 4);
    } else if (filter === "Bad") {
        filtered = books.filter((book) => book.rating <= 2);
    }

    return filtered.sort((a: Book, b: Book) => b.rating - a.rating);
}

export type SortOption =
    | "default"
    | "title-asc"
    | "title-desc"
    | "author-asc"
    | "author-desc";

export function applySorting(books: Book[], sortBy: SortOption): Book[] {
    const sorted = [...books];

    const compare = (
        left: string | null | undefined,
        right: string | null | undefined,
        direction: "asc" | "desc",
    ) => {
        const leftValue = left ?? "";
        const rightValue = right ?? "";
        return direction === "asc"
            ? leftValue.localeCompare(rightValue)
            : rightValue.localeCompare(leftValue);
    };

    switch (sortBy) {
        case "default":
            break;
        case "title-asc":
            sorted.sort((a, b) => compare(a.title, b.title, "asc"));
            break;
        case "title-desc":
            sorted.sort((a, b) => compare(a.title, b.title, "desc"));
            break;
        case "author-asc":
            sorted.sort((a, b) => compare(a.aurthor, b.aurthor, "asc"));
            break;
        case "author-desc":
            sorted.sort((a, b) => compare(a.aurthor, b.aurthor, "desc"));
            break;
    }

    return sorted;
}
