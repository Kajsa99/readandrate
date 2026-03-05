import { useState, useEffect } from "react";
import BookCard, { type Book } from "./bookcard";

export default function PopularBooks() {
    const [books, setBooks] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<string>("Popular");

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch("http://localhost:3000/books");

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const allBooks = await response.json();

                const sortedBooks = allBooks.sort(
                    (a: Book, b: Book) => b.rating - a.rating,
                );

                setBooks(sortedBooks);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to fetch books",
                );
                setBooks([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    useEffect(() => {
        let filtered = books;

        if (filter === "Popular") {
            filtered = books.filter((book) => book.rating >= 4);
        } else if (filter === "Average") {
            filtered = books.filter(
                (book) => book.rating > 2 && book.rating < 4,
            );
        } else if (filter === "Bad") {
            filtered = books.filter((book) => book.rating <= 2);
        }

        const sorted = filtered.sort((a: Book, b: Book) => b.rating - a.rating);
        setFilteredBooks(sorted);
    }, [books, filter]);

    if (loading) {
        return <div className="p-4">Loading…</div>;
    }

    if (error) {
        return <div className="p-4 text-red-600">Error: {error}</div>;
    }

    return (
        <div className="w-full mx-auto my-6">
            <select
                data-testid="filter-select"
                className="mb-4 bg-stone-500 text-white px-4 py-2 rounded-md"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            >
                <option value="Popular">Popular</option>
                <option value="Average">Average</option>
                <option value="Bad">Bad</option>
            </select>
            <ul className="grid grid-cols-3 gap-8 auto-rows-max max-h-96 pr-2">
                {filteredBooks.map((b) => (
                    <BookCard
                        key={b.id}
                        book={b}
                        dataTestId="book-item"
                        showRatingLabel
                    />
                ))}
            </ul>
        </div>
    );
}
