import { useEffect, useState } from "react";
import BookCard, { type Book } from "./bookcard";

export default function Bookreviews() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        const load = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch("http://localhost:3000/books", {
                    signal: controller.signal,
                });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data: Book[] = await res.json();
                setBooks(data);
            } catch (err: unknown) {
                if ((err as Error)?.name === "AbortError") return;
                setError((err as Error).message ?? "Failed to load books");
            } finally {
                setLoading(false);
            }
        };
        load();
        return () => controller.abort();
    }, []);

    return (
        <div className="w-full mx-auto my-6">
            <h2 className="text-md font-semibold mb-4 text-stone-700">
                Recent Book Reviews
            </h2>
            {loading && <p className="text-stone-500">Loading…</p>}
            {error && (
                <p className="text-red-600">
                    Error loading book reviews: {error}
                </p>
            )}
            {!loading && !error && books.length === 0 && (
                <p className="text-stone-500">No reviews yet.</p>
            )}
            <ul className="grid grid-cols-3 gap-8 auto-rows-max max-h-96 pr-2">
                {books.map((b) => (
                    <BookCard key={b.id} book={b} />
                ))}
            </ul>
        </div>
    );
}
