import { useState } from "react";

export default function Bookform() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await fetch("http://localhost:3000/books", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    aurthor: author,
                    rating: Number(rating),
                    comment,
                }),
            });
            setTitle("");
            setAuthor("");
            setRating("");
            setComment("");
            alert("Review added!");
        } catch (err) {
            console.error("Error adding book:", err);
        }
    };

    return (
        <div>
            <h1 className="text-lg">Add a new Book Review</h1>
            <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block mb-1">Title:</label>
                    <input
                        type="text"
                        className="w-full p-2  bg-stone-700 text-stone-100 rounded"
                        placeholder="Enter book title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Author:</label>
                    <input
                        type="text"
                        className="w-full p-2  bg-stone-700 rounded text-stone-100 "
                        placeholder="Enter author's name"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Rating:</label>
                    <select
                        className="w-full p-2  bg-stone-700 rounded text-stone-100"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                    >
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
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
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
