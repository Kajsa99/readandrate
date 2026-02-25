import React from "react";

interface User {
    id: number;
    name: string;
    email: string | null;
}

interface UsersListProps {
    users: User[];
}

export const UsersList: React.FC<UsersListProps> = ({ users }) => {
    if (users.length === 0) {
        return <p className="text-stone-600">No users added yet.</p>;
    }

    // colors for the boxes
    const colors = [
        "bg-cyan-700",
        "bg-teal-300",
        "bg-sky-400",
        "bg-cyan-500",
        "bg-amber-600",
        "bg-cyan-900",
        "bg-emerald-500",
        "bg-amber-500",
        "bg-cyan-600",
        "bg-emerald-700",
    ];

    return (
        <div
            id="users-list-container"
            className="p-6 rounded-lg max-w-4xl mx-auto"
        >
            <h2 className="text-sm font-semibold mb-4 text-stone-700">
                Join our community!
            </h2>
            <ul className="users-list flex flex-wrap gap-4 items-baseline">
                {users.map((user, index) => (
                    <li
                        key={user.id}
                        className={`${colors[index % colors.length]} rounded-2xl shadow-md flex items-center justify-center text-white font-semibold hover:scale-110 transition-transform h-10 px-6`}
                    >
                        <p className="text-center text-sm">{user.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
