'use client';
import React, { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export type Category = {
  id: string
  title: string
  slug: string | null | undefined
}

export type CategoryFilterProps = {
  categories: Category[]
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  // Get the category from URL or default to 'all'
  const [selectedCategory, setSelectedCategory] = useState(searchParams?.get('category') || 'all')

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams?.toString())
    
    if (value && value !== 'all') {
      params.set(name, value)
    } else {
      params.delete(name)
    }
    
    // Preserve the search query if it exists
    if (searchParams?.has('q')) {
      params.set('q', searchParams.get('q') || '')
    }
    
    // Reset to page 1 when filtering
    if (params.has('page')) {
      params.delete('page')
    }
    
    return params.toString()
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    console.log('Selected category value:', value)
    if (value === 'all') {
      // If "All categories" is selected, remove the category parameter
      router.push(pathname + (searchParams?.has('q') ? '?' + createQueryString('category', '') : ''))
    } else {
      // Otherwise, set the category parameter
      console.log('Setting category param to:', value)
      router.push(pathname + '?' + createQueryString('category', value))
    }
  }

  return (
    <div className="w-full max-w-xs">
      <Select value={selectedCategory} onValueChange={handleCategoryChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Filter by category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}