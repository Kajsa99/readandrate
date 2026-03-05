type FilterRatingProps = {
    filter: string;
    onFilterChange: (value: string) => void;
};

export default function FilterRating({
    filter,
    onFilterChange,
}: FilterRatingProps) {
    return (
        <select
            data-testid="filter-select"
            className="bg-stone-500 text-white px-4 py-2 rounded-md"
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
        >
            <option value="All">All</option>
            <option value="Popular">Popular</option>
            <option value="Average">Average</option>
            <option value="Bad">Bad</option>
        </select>
    );
}
