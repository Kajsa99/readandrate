type StarRatingProps = {
    rating: number;
    size?: "small" | "medium" | "large";
    interactive?: boolean;
    onRatingChange?: (rating: number) => void;
};

export default function StarRating({
    rating,
    size = "medium",
    interactive = false,
    onRatingChange,
}: StarRatingProps) {
    const sizeClasses = {
        small: "text-lg",
        medium: "text-2xl",
        large: "text-4xl",
    };

    const stars = [1, 2, 3, 4, 5];

    return (
        <div className="flex items-center gap-1">
            {stars.map((star) => (
                <span
                    key={star}
                    className={`${sizeClasses[size]} ${
                        interactive
                            ? "cursor-pointer hover:scale-110 transition-transform"
                            : ""
                    } ${star <= rating ? "text-amber-400" : "text-stone-300"}`}
                    onClick={
                        interactive && onRatingChange
                            ? () => onRatingChange(star)
                            : undefined
                    }
                >
                    ★
                </span>
            ))}
        </div>
    );
}
