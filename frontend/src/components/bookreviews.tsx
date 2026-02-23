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
        <div className="w-full mx-auto my-6 bg-stone-900 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Book Reviews</h2>
            {loading && <p className="text-stone-400">Loading…</p>}
            {error && (
                <p className="text-red-400">
                    Error loading book reviews: {error}
                </p>
            )}
            {!loading && !error && books.length === 0 && (
                <p className="text-stone-400">No reviews yet.</p>
            )}
            <ul className="grid grid-cols-3 gap-8 auto-rows-max max-h-96 overflow-y-auto pr-2">
                {books.map((b) => (
                    <li
                        key={b.id}
                        className="border border-stone-700 rounded-xl p-4 bg-stone-800 flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-baseline justify-between mb-2">
                                <div className="flex-1">
                                    <p className="font-lg text-stone-100 text-sm line-clamp-2">
                                        {b.title}
                                    </p>
                                    <p className="text-md text-stone-400 line-clamp-1">
                                        by {b.aurthor}
                                    </p>
                                </div>
                                <p className="text-md">Rating</p>
                                <span className="text-md bg-stone-700 text-stone-100 px-2 py-1 rounded ml-2">
                                    {b.rating}/5
                                </span>
                            </div>
                            {b.comment && (
                                <p className="text-md text-stone-200 line-clamp-3 mt-2 overflow-auto">
                                    {b.comment}
                                </p>
                            )}
                            <p className="text-sm text-stone-400 mt-2">
                                {b.user ? `- ${b.user}` : ""}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
