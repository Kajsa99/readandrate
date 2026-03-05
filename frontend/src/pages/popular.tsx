import { useState, useEffect, useMemo } from "react";
import FilterRating from "../components/filterrating";
import SortingBooks from "../components/sortingbooks";
import {
    applyRatingFilter,
    applySorting,
    type Book,
    type SortOption,
} from "../utils/filterUtils";
import BookCard from "../components/bookcard";

export default function Popularpage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // All/ default when opening page and also when clicking "Clear Filters"
    const [ratingFilter, setRatingFilter] = useState<string>("All");
    const [sortBy, setSortBy] = useState<SortOption>("default");

    useEffect(() => {
        const controller = new AbortController();

        const loadBooks = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch("http://localhost:3000/books", {
                    signal: controller.signal,
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setBooks(data);
            } catch (err: unknown) {
                if ((err as Error)?.name === "AbortError") return;
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

        loadBooks();

        return () => controller.abort();
    }, []);

    const filteredBooks = useMemo(() => {
        const filtered = applyRatingFilter(books, ratingFilter);
        return applySorting(filtered, sortBy);
    }, [books, ratingFilter, sortBy]);

    if (loading) {
        return <div className="p-4">Loading…</div>;
    }

    if (error) {
        return <div className="p-4 text-red-600">Error: {error}</div>;
    }

    return (
        <>
            <div className="pb-96">
                <div className="p-6 border-b border-stone-300 mb-6">
                    <h1 className="text-lg font-bold text-stone-900 flex items-center">
                        Popular Books
                    </h1>
                    <p className="text-sm text-stone-600">
                        Checkout the most popular books according to our users!
                        Only 4-5 ratings here!
                    </p>
                </div>
                <div className="px-10 mb-6 flex gap-6 items-end">
                    <div>
                        <label className="text-sm text-stone-600 block mb-2">
                            Filter by Rating:
                        </label>
                        <FilterRating
                            filter={ratingFilter}
                            onFilterChange={setRatingFilter}
                        />
                    </div>
                    <div>
                        <label className="text-sm text-stone-600 block mb-2">
                            Sort by:
                        </label>
                        <SortingBooks
                            sortBy={sortBy}
                            onSortChange={setSortBy}
                        />
                    </div>
                    <button
                        onClick={() => {
                            setRatingFilter("All");
                            setSortBy("default");
                        }}
                        className="bg-stone-400 hover:bg-amber-400 text-white px-4 py-2 rounded-md transition-colors"
                    >
                        Clear Filters
                    </button>
                </div>
                <div className="px-10">
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
            </div>
        </>
    );
}
