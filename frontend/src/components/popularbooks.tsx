import { useState, useEffect } from "react";

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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

                // Filter books with rating >= 4
                const popularBooks = allBooks.filter(
                    (book: Book) => book.rating >= 4,
                );

                setBooks(popularBooks);
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

    if (loading) {
        return <div className="p-4">Loading…</div>;
    }

    if (error) {
        return <div className="p-4 text-red-600">Error: {error}</div>;
    }

    if (books.length === 0) {
        return <div className="p-4">No popular books available.</div>;
    }

    return (
        <div className="w-full mx-auto my-6">
            <h2 className="text-md font-semibold mb-4 text-stone-700">
                Popular Books
            </h2>
            <ul className="grid grid-cols-3 gap-8 auto-rows-max max-h-96 pr-2">
                {books.map((b) => (
                    <li
                        key={b.id}
                        data-testid="book-item"
                        className="border border-stone-300 rounded-xl p-4 bg-white flex flex-col justify-between shadow-sm"
                    >
                        <div>
                            <div className="flex items-baseline justify-between mb-2">
                                <div className="flex-1">
                                    <p className="text-stone-900 text-lg">
                                        {b.title}
                                    </p>
                                    <p className="text-md text-stone-600 line-clamp-1">
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
                                    <span className="text-sm bg-amber-300 text-stone-700 px-2 py-1 rounded">
                                        {b.rating}/5
                                    </span>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
