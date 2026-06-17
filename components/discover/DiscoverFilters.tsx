"use client";

type Category = {
    id: string;
    name: string;
    slug: string;
};

type Props = {
    categories: Category[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    onReset: () => void;
};

const dateFilters = ["Anytime", "Today", "This Weekend", "Next Week"];

export default function DiscoverFilters({
                                            categories,
                                            selectedCategory,
                                            onCategoryChange,
                                            onReset,
                                        }: Props) {
    return (
        <aside className="space-y-9">
            <div>
                <h3 className="mb-4 font-bold text-[#131827]">Categories</h3>

                <div className="flex flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={() => onCategoryChange("")}
                        className={`rounded-full border px-5 py-2 text-sm transition ${
                            selectedCategory === ""
                                ? "border-[#0067A8] bg-[#E7F3FB] text-[#0067A8]"
                                : "border-gray-300 text-gray-700 hover:border-[#0067A8]"
                        }`}
                    >
                        All
                    </button>

                    {categories.map((category) => (
                        <button
                            type="button"
                            key={category.id}
                            onClick={() => onCategoryChange(category.slug)}
                            className={`rounded-full border px-5 py-2 text-sm transition ${
                                selectedCategory === category.slug
                                    ? "border-[#0067A8] bg-[#E7F3FB] text-[#0067A8]"
                                    : "border-gray-300 text-gray-700 hover:border-[#0067A8]"
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="mb-4 font-bold text-[#131827]">Date</h3>

                <div className="space-y-4 text-gray-600">
                    {dateFilters.map((item) => (
                        <label key={item} className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                className="h-5 w-5 rounded border-gray-300 accent-[#0067A8]"
                            />
                            <span>{item}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="mb-4 font-bold text-[#131827]">Price Range</h3>

                <input type="range" className="w-full accent-[#0067A8]" />

                <div className="mt-2 flex justify-between text-sm text-gray-500">
                    <span>Free</span>
                    <span>$1,000+</span>
                </div>
            </div>

            <div>
                <h3 className="mb-4 font-bold text-[#131827]">Distance</h3>

                <select className="w-full rounded-xl border border-gray-300 bg-transparent px-4 py-4 text-gray-700 outline-none">
                    <option>Within 10 miles</option>
                    <option>Within 25 miles</option>
                    <option>Within 50 miles</option>
                    <option>Anywhere</option>
                </select>
            </div>

            <button
                type="button"
                onClick={onReset}
                className="w-full rounded-xl border border-gray-400 px-5 py-4 font-bold text-[#131827] transition hover:border-[#0067A8] hover:text-[#0067A8]"
            >
                Reset Filters
            </button>
        </aside>
    );
}
