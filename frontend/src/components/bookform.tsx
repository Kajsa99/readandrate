export default function Bookform() {
    return (
        <div>
            <h1 className="text-lg">Add a new Book Review</h1>
            <form className="flex flex-col gap-4 mt-4">
                <div>
                    <label className="block mb-1">Title:</label>
                    <input
                        type="text"
                        className="w-full p-2  bg-stone-700 rounded text-stone-100rounded"
                        placeholder="Enter book title"
                    />
                </div>
                <div>
                    <label className="block mb-1">Author:</label>
                    <input
                        type="text"
                        className="w-full p-2  bg-stone-700 rounded text-stone-100 "
                        placeholder="Enter author's name"
                    />
                </div>
                <div>
                    <label className="block mb-1">Rating:</label>
                    <select className="w-full p-2  bg-stone-700 rounded text-stone-100">
                        <option value="">Select rating</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1">Comment:</label>
                    <textarea
                        className="w-full p-2 bg-stone-700 rounded text-stone-100 "
                        placeholder="Write any additional comments here"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-stone-200 text-stone-700 p-2 rounded hover:bg-green-600"
                >
                    Add Review
                </button>
            </form>
        </div>
    );
}
