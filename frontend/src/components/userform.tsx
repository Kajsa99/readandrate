import { useState } from "react";

interface UserFormProps {
    onUserAdded: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({ onUserAdded }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (name && email) {
            try {
                await fetch("http://localhost:3000/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email }),
                });
                setName("");
                setEmail("");
                onUserAdded();
            } catch (err) {
                console.error("Error adding user:", err);
            }
        }
    };

    return (
        <div className="mb-6">
            <h2 className="text-lg mb-3">Add New User</h2>
            <form
                onSubmit={handleAddUser}
                className="flex flex-col gap-3 max-w-md"
            >
                <input
                    type="text"
                    placeholder="User name"
                    className="w-full p-2 bg-stone-700 rounded text-stone-100"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 bg-stone-700 rounded text-stone-100"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="bg-stone-200 text-stone-700 p-2 rounded hover:bg-green-600"
                >
                    Add User
                </button>
            </form>
        </div>
    );
};
