import { useEffect, useState } from "react";
import StarRating from "./starrating";

type User = {
    id: number;
    name: string;
    email: string | null;
};

export default function Bookform() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [selectedUser, setSelectedUser] = useState("");
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const res = await fetch("http://localhost:3000/users");
                if (res.ok) {
                    const data: User[] = await res.json();
                    setUsers(data);
                }
            } catch (err) {
                console.error("Error loading users:", err);
            }
        };
        loadUsers();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await fetch("http://localhost:3000/books", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    aurthor: author,
                    rating: rating,
                    comment,
                    user: selectedUser || null,
                }),
            });
            setTitle("");
            setAuthor("");
            setRating(0);
            setComment("");
            setSelectedUser("");
            alert("Review added!");
        } catch (err) {
            console.error("Error adding book:", err);
        }
    };

    return (
        <div
            className="border border-stone-300 p-6 rounded-lg min-w-xl shadow-md mx-auto"
            id="book-form"
        >
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block mb-1 text-stone-900 font-medium">
                        Title:
                    </label>
                    <input
                        type="text"
                        className="w-full p-2 bg-white border border-stone-300 text-stone-900 rounded"
                        placeholder="Enter book title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 text-stone-900 font-medium">
                        Author:
                    </label>
                    <input
                        type="text"
                        className="w-full p-2 bg-white border border-stone-300 rounded text-stone-900"
                        placeholder="Enter author's name"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 text-stone-900 font-medium">
                        Comment:
                    </label>
                    <textarea
                        className="w-full p-2 bg-white border border-stone-300 rounded text-stone-900"
                        placeholder="Write any additional comments here"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="flex flex-row justify-between gap-4">
                    <div>
                        <label className="block mb-1 text-stone-900 font-medium">
                            Rating:
                        </label>
                        <StarRating
                            rating={rating}
                            size="medium"
                            interactive={true}
                            onRatingChange={setRating}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-stone-900 font-medium">
                            User (optional):
                        </label>
                        <select
                            className="max-w-md p-2 bg-white border border-stone-300 rounded text-stone-900"
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                        >
                            <option value="">Select user (optional)</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.name}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-stone-700 max-h-10 text-white mx-10 m-4 p-2 rounded-xl hover:bg-amber-400 hover:text-white transform-3d hover:-translate-y-0.5 transition-all duration-200"
                >
                    Add Review
                </button>
            </form>
        </div>
    );
}
