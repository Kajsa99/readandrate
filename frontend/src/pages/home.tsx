import Bookreviews from "../components/bookreviews";

export default function Homepage() {
    return (
        <>
            <div className="p-6 border-b border-stone-300 mb-6">
                <h1 className="text-lg font-bold text-stone-900 flex items-center">
                    Dashboard
                </h1>
                <p className="text-sm text-stone-600">
                    What have you been reading, and what did you think? We want
                    to know!
                </p>
            </div>
            <div className="px-10">
                <Bookreviews />
            </div>
        </>
    );
}
