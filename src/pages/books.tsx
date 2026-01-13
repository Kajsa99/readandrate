import Bookform from "../components/bookform";

export default function Bookpage() {
    return (
        <>
            <div className="flex flex-col items-center">
                <h1 className="text-lg">Books</h1>
                <Bookform />
            </div>
        </>
    );
}
