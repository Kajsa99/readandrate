import { useState, useEffect } from "react";
import StarRating from "./starrating";

type Book = {
    id: number;
    title: string;
    aurthor: string;
    rating: number;
    comment: string | null;
    user?: string | null;
};

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
                    <li
                        key={b.id}
                        data-testid="book-item"
                        className="border border-stone-300 rounded-xl p-4 bg-white flex flex-col justify-between shadow-sm"
                    >
                        <div>
                            <div className="flex items-baseline justify-between mb-2">
                                <div className="flex-1">
                                    <p className="text-stone-900 text-xl font-serif">
                                        {b.title}
                                    </p>
                                    <p className="text-sm font-serif text-stone-600 line-clamp-1">
                                        written by {b.aurthor}
                                    </p>
                                </div>
                            </div>
                            {b.comment && (
                                <p className="text-md text-stone-700 mt-2 overflow-auto max-h-18">
                                    {b.comment}
                                </p>
                            )}
                            <div className="flex items-center justify-between mt-4 gap-2">
                                <p className="text-sm text-stone-500">
                                    {b.user ? `- ${b.user}` : ""}
                                </p>
                                <div className="flex items-center gap-1">
                                    <p className="text-sm text-stone-700">
                                        Rating:
                                    </p>
                                    <StarRating
                                        rating={b.rating}
                                        size="small"
                                    />
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
