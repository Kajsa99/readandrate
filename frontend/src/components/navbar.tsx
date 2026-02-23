type NavItem = { label: string; href: string };

interface NavbarLinks {
    items?: NavItem[];
    onNavigate?: (href: string) => void;
}

export default function Navbar({
    items = [
        { label: "Home", href: "/" },
        { label: "Books", href: "/books" },
        { label: "User", href: "/user" },
    ],
    onNavigate,
}: NavbarLinks) {
    return (
        <nav className="flex flex-col bg-stone-200 text-stone-700 min-h-screen w-50 dark:bg-stone-500 dark:text-stone-200">
            <div className="flex flex-col p-4 gap-4 text-md items-center">
                <img src="/book-cover.png" alt="Book Cover" width="100" />
                <h1 className="text-3xl text-stone-700 dark:text-stone-200">
                    Read&Rate
                </h1>
                {items.map((item) => (
                    <a
                        key={item.href}
                        href={item.href}
                        onClick={(e) => {
                            if (onNavigate) {
                                e.preventDefault();
                                onNavigate(item.href);
                            }
                        }}
                        className="block w-full px-3 py-2 rounded hover:bg-stone-200 dark:hover:bg-stone-600 text-center"
                    >
                        {item.label}
                    </a>
                ))}
            </div>
        </nav>
    );
}
