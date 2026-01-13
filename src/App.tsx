import { useState } from "react";
import Navbar from "./components/navbar";
import HomePage from "./pages/home";
import BookPage from "./pages/books";
import UserPage from "./pages/user";

type Route = "/" | "/books" | "/user";

function App() {
    const [route, setRoute] = useState<Route>("/");

    function renderRoute() {
        switch (route) {
            case "/":
                return <HomePage />;
            case "/books":
                return <BookPage />;
            case "/user":
                return <UserPage />;
        }
    }
    return (
        <>
            <div className="min-h-screen flex">
                <Navbar onNavigate={(href) => setRoute(href as Route)} />
                <main className="flex-1 p-6 bg-neutral-800 text-neutral-100">
                    {renderRoute()}
                </main>
            </div>
        </>
    );
}

export default App;
