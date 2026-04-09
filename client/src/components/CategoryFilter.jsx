import React from 'react';
import { CATEGORIES } from '../mockData';

const CategoryFilter = ({ activeCategory, onSelect }) => {
  return (
    <div className="flex gap-3 overflow-x-auto pb-4 pt-2 hide-scrollbar snap-x px-4 md:px-0">
      {CATEGORIES.map(cat => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`snap-center shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeCategory === cat
              ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30 ring-1 ring-violet-400'
              : 'glass-card text-gray-300 hover:bg-white/10 hover:text-white'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
