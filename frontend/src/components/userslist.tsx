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

    return (
        <div className="users-list-container">
            <h2 className="text-sm font-semibold mb-4 text-stone-700">
                Existing users
            </h2>
            <ul className="users-list">
                {users.map((user) => (
                    <li
                        key={user.id}
                        className="flex flex-col gap-1 border border-stone-300 rounded p-3 bg-white m-2 shadow-sm"
                    >
                        <div className="flex items-baseline justify-between gap-4">
                            <p className="text-stone-900">
                                <strong>Name:</strong> {user.name}
                            </p>
                            {user.email && (
                                <p className="text-stone-700">
                                    <strong>Email:</strong> {user.email}
                                </p>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
