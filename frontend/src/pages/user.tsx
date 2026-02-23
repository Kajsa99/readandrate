import { useEffect, useState } from "react";
import { UsersList } from "../components/userslist";
import { UserForm } from "../components/userform";

type User = {
    id: number;
    name: string;
    email: string | null;
};

export default function Userpage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // loading all users and refreshing when adding new
    const loadUsers = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch("http://localhost:3000/users");
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data: User[] = await res.json();
            setUsers(data);
        } catch (err) {
            setError((err as Error).message ?? "Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <>
            <div className="flex flex-col items-center">
                <h1 className="text-lg mb-4">Users</h1>
                <UserForm onUserAdded={loadUsers} />
                {loading && <p className="text-stone-400">Loading…</p>}
                {error && <p className="text-red-400">Error: {error}</p>}
                {!loading && !error && <UsersList users={users} />}
            </div>
        </>
    );
}
