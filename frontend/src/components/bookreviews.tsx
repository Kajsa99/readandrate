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
        <div className="w-full mx-auto my-6">
            <h2 className="text-xl font-semibold mb-4 text-stone-900">
                Book Reviews
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
                    <li
                        key={b.id}
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
