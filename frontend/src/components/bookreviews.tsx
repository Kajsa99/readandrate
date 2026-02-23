import { useEffect, useState } from "react";

type Book = {
    id: number;
    title: string;
    aurthor: string;
    rating: number;
    comment: string | null;
    user?: string | null;
};

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
        <div className="w-full max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Book Reviews</h2>
            {loading && <p className="text-stone-400">Loading…</p>}
            {error && (
                <p className="text-red-400">Error loading books: {error}</p>
            )}
            {!loading && !error && books.length === 0 && (
                <p className="text-stone-400">No reviews yet.</p>
            )}
            <ul className="space-y-3">
                {books.map((b) => (
                    <li
                        key={b.id}
                        className="border border-stone-700 rounded p-3 bg-stone-800"
                    >
                        <div className="flex items-baseline justify-between">
                            <div>
                                <p className="font-medium text-stone-100">
                                    {b.title}
                                </p>
                                <p className="text-sm text-stone-400">
                                    by {b.aurthor} {b.user ? `• ${b.user}` : ""}
                                </p>
                            </div>
                            <span className="text-sm bg-stone-700 text-stone-100 px-2 py-0.5 rounded">
                                {b.rating}/5
                            </span>
                        </div>
                        {b.comment && (
                            <p className="mt-2 text-stone-200">{b.comment}</p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
