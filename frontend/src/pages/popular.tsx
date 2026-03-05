import PopularBooks from "../components/popularbooks";

export default function Popularpage() {
    return (
        <>
            <div className="pb-96">
                <div className="p-6 border-b border-stone-300 mb-6">
                    <h1 className="text-lg font-bold text-stone-900 flex items-center">
                        Popular Books
                    </h1>
                    <p className="text-sm text-stone-600">
                        Checkout the most popular books according to our users!
                        Only 4-5 ratings here!
                    </p>
                </div>
                <div className="px-10">
                    <PopularBooks />
                </div>
            </div>
        </>
    );
}
