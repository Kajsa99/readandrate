import Bookform from "../components/bookform";

export default function Bookpage() {
    return (
        <>
            <div className="p-6 border-b border-stone-300 mb-6">
                <h1 className="text-lg font-bold text-stone-900 flex items-center">
                    Add Book Review
                </h1>
                <p className="text-sm text-stone-600">
                    Give us your honest opinion! We want to hear what you think
                    about the book!
                </p>
            </div>
            <div className="w-full max-w-2xl mx-auto px-4">
                <Bookform />
            </div>
        </>
    );
}
