import { Link } from "react-router-dom";

type NavItem = { label: string; href: string };

interface NavbarLinks {
    items?: NavItem[];
}

export default function Navbar({
    items = [
        { label: "Dashboard", href: "/" },
        { label: "Popular Books", href: "/popular" },
        { label: "Add Review", href: "/books" },
        { label: "Users", href: "/user" },
    ],
}: NavbarLinks) {
    return (
        <nav className="flex flex-col bg-stone-200 text-stone-700 min-h-screen w-52 dark:bg-stone-500 dark:text-stone-200 fixed">
            <div className="flex flex-col p-4 gap-4 text-md items-center">
                <img src="/book-cover.png" alt="Book Cover" width="100" />
                <h1 className="text-3xl text-stone-700 dark:text-stone-200">
                    Read&Rate
                </h1>
                {items.map((item) => (
                    <Link
                        key={item.href}
                        to={item.href}
                        className="block w-full px-3 py-2 rounded hover:bg-stone-200 dark:hover:bg-stone-600 text-center"
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
