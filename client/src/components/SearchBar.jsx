import React from "react";
import { Search } from "lucide-react";

export function SearchBar({ value, onChange }) {
  return (
    <div className="relative max-w-xl mx-auto mb-12">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search destinations..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}
