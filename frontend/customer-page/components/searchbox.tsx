"use client";
import { useState } from "react";

export default function SearchBar({ items }: { items: { id: number; name: string; slug: string }[] }) {
  
    const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(items);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setFiltered(
      items.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <div className="relative max-w-md mx-auto flex gap-2">
      <input
        type="text"
        placeholder="Search dishes..."
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        value={query}
        onChange={handleChange}
      />
      <button className="bg-orange-500 text-white px-4 rounded-lg hover:bg-orange-600">
        Search
      </button>

      {query && (
        <ul className="absolute top-14 left-0 w-full bg-white border rounded-lg shadow-lg z-10">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <li
                key={item.id}
                className="px-4 py-2 cursor-pointer hover:bg-orange-100"
                onClick={() => {
                  const element = document.getElementById(item.slug);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "center" });
                  }
                  setQuery(""); // clear search
                }}
              >
                {item.name}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No results</li>
          )}
        </ul>
      )}
    </div>
  );
}
