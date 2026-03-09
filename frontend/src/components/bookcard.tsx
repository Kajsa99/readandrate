import StarRating from "./starrating";

export type Book = {
    id: number;
    title: string;
    aurthor: string;
    rating: number;
    comment: string | null;
    user?: string | null;
};

type BookCardProps = {
    book: Book;
    dataTestId?: string;
    showRatingLabel?: boolean;
};

export default function BookCard({
    book,
    dataTestId,
    showRatingLabel = false,
}: BookCardProps) {
    return (
        <li
            key={book.id}
            data-testid={dataTestId}
            className="border border-stone-300 rounded-xl p-4 bg-white flex flex-col justify-between shadow-sm"
        >
            <div>
                <div className="flex items-baseline justify-between mb-2">
                    <div className="flex-1">
                        <p className="text-stone-900 text-xl font-serif">
                            {book.title}
                        </p>
                        <p className="text-sm font-serif text-stone-600 line-clamp-1">
                            written by {book.aurthor}
                        </p>
                    </div>
                </div>
                {book.comment && (
                    <p className="text-sm border border-stone-200 bg-stone-100 px-4 py-2 rounded-2xl text-stone-700 mt-2 overflow-auto max-h-24">
                        {book.comment}
                    </p>
                )}
                <div className="flex items-center justify-between mt-4 gap-2">
                    <p className="text-sm text-stone-500">
                        {book.user ? `- ${book.user}` : ""}
                    </p>
                    <div className="flex items-center gap-1">
                        {showRatingLabel && (
                            <p className="text-sm text-stone-700">Rating:</p>
                        )}
                        <StarRating rating={book.rating} size="small" />
                    </div>
                </div>
            </div>
        </li>
    );
}
