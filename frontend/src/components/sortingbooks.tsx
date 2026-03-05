import { type SortOption } from "../utils/filterUtils";

type SortingBooksProps = {
    sortBy: SortOption;
    onSortChange: (value: SortOption) => void;
};

export default function SortingBooks({
    sortBy,
    onSortChange,
}: SortingBooksProps) {
    return (
        <select
            className="bg-stone-500 text-white px-4 py-2 rounded-md"
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value as SortOption)}
        >
            <option value="default">Default</option>
            <option value="title-asc">Title A-Z</option>
            <option value="title-desc">Title Z-A</option>
            <option value="author-asc">Author A-Z</option>
            <option value="author-desc">Author Z-A</option>
        </select>
    );
}
