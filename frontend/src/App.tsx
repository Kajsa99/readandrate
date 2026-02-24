import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Homepage from "./pages/home";
import Books from "./pages/books";
import Users from "./pages/user";

export default function App() {
    return (
        <BrowserRouter>
            <div className="flex">
                <Navbar />
                <main className="ml-52 flex-1">
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/books" element={<Books />} />
                        <Route path="/user" element={<Users />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}
