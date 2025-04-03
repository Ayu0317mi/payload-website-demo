'use client';
import React from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const PostSearch: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = React.useState(searchParams?.get('q') || '')

  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    router.push(pathname + '?' + createQueryString('q', value))
  }

  return (
    <div className="w-full max-w-xl mx-auto mb-8">
      <input
        type="search"
        placeholder="Search posts..."
        value={searchQuery}
        onChange={handleSearch}
        className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500"
      />
    </div>
  )
}