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
            <div>
                <div className="p-6 border-b border-stone-300 mb-6">
                    <h1 className="text-lg font-bold text-stone-900 flex items-center">
                        Users
                    </h1>
                    <p className="text-stone-600 text-sm">
                        Manage all users here
                    </p>
                </div>
                <div className="w-full max-w-2xl mx-auto px-4">
                    <UserForm onUserAdded={loadUsers} />
                    {loading && <p className="text-stone-500">Loading…</p>}
                    {error && <p className="text-red-600">Error: {error}</p>}
                    {!loading && !error && <UsersList users={users} />}
                </div>
            </div>
        </>
    );
}
