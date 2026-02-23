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
        return <p>No users added yet.</p>;
    }

    return (
        <div className="users-list-container">
            <h2>Users List</h2>
            <ul className="users-list">
                {users.map((user) => (
                    <li
                        key={user.id}
                        className="flex flex-col gap-1 border border-stone-700 rounded p-3 bg-stone-800 m-2"
                    >
                        <div className="flex items-baseline justify-between gap-4">
                            <p>
                                <strong>Name:</strong> {user.name}
                            </p>
                            {user.email && (
                                <p>
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
