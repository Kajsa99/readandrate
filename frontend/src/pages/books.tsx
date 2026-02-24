import Bookform from "../components/bookform";

export default function Bookpage() {
    return (
        <>
            <div className="flex flex-col items-center p-6">
                <h1 className="text-2xl font-bold text-stone-900 mb-6">
                    Books
                </h1>
                <Bookform />
            </div>
        </>
    );
}
