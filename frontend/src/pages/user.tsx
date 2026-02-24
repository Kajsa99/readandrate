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
            <div className="w-full mx-auto m-6 p-10">
                <h1 className="text-2xl font-bold text-stone-900 mb-6">
                    Users
                </h1>
                <div className="grid grid-cols-2 p-6 gap-6">
                    <UserForm onUserAdded={loadUsers} />
                    {loading && <p className="text-stone-500">Loading…</p>}
                    {error && <p className="text-red-600">Error: {error}</p>}
                    {!loading && !error && <UsersList users={users} />}
                </div>
            </div>
        </>
    );
}
