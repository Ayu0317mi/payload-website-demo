'use client';
import React from 'react';
import { CategoryFilter, Category } from './CategoryFilter';
import { PostSearch } from './PostSearch';

type FilterSectionProps = {
  categories: Category[];
};

const FilterSection: React.FC<FilterSectionProps> = ({ categories }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
      <div className="flex-grow">
        <PostSearch />
      </div>
      <CategoryFilter categories={categories} />
    </div>
  );
};

export default FilterSection;