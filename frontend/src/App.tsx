import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Homepage from "./pages/home";
import Books from "./pages/books";
import Users from "./pages/user";
import Popularpage from "./pages/popular";

export default function App() {
    return (
        <BrowserRouter>
            <div className="flex">
                <Navbar />
                <main className="ml-52 flex-1 min-h-screen">
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/books" element={<Books />} />
                        <Route path="/user" element={<Users />} />
                        <Route path="/popular" element={<Popularpage />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}
