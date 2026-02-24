import { useState } from "react";

interface UserFormProps {
    onUserAdded: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({ onUserAdded }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (name && email) {
            try {
                const response = await fetch("http://localhost:3000/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email }),
                });
                if (!response.ok) {
                    throw new Error("Failed to add user");
                }
                setName("");
                setEmail("");
                setShowSuccess(true);
                setShowError(false);
                setTimeout(() => setShowSuccess(false), 3000);
                onUserAdded();
            } catch (err) {
                console.error("Error adding user:", err);
                setShowError(true);
                setErrorMessage(
                    err instanceof Error ? err.message : "Failed to add user",
                );
                setTimeout(() => setShowError(false), 3000);
                return;
            }
        }
    };

    return (
        <div className="mb-6 bg-stone-100 p-6 rounded-lg">
            <h2 className="text-lg mb-3 text-stone-900 font-semibold">
                Add New User
            </h2>
            {showSuccess && (
                <div
                    className="mb-4 p-3 bg-green-100 text-green-800 rounded border border-green-300"
                    id="message"
                >
                    User added successfully!
                </div>
            )}
            {showError && (
                <div
                    className="mb-4 p-3 bg-red-100 text-red-800 rounded border border-red-300"
                    id="error-message"
                >
                    {errorMessage}
                </div>
            )}
            <form
                onSubmit={handleAddUser}
                className="flex flex-col gap-3 max-w-md"
            >
                <input
                    id="name"
                    type="text"
                    placeholder="User name"
                    className="w-full p-2 bg-white border border-stone-300 rounded text-stone-900"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 bg-white border border-stone-300 rounded text-stone-900"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button
                    id="submit"
                    type="submit"
                    className="bg-stone-700 text-white p-2 rounded hover:bg-stone-800"
                >
                    Add User
                </button>
            </form>
        </div>
    );
};
