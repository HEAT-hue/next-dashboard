'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { ChangeEvent } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {

  const searchParams = useSearchParams();

  // Get current base url
  // its a client component that can be used anywhere. We need to programatically get the current path name
  const pathname = usePathname();

  // To replace the current url
  const { replace } = useRouter();

  // Debounce handle search to reduce rate at which a function fires
  const handleSearch = useDebouncedCallback((term: string) => {
    // Create new url
    const params = new URLSearchParams(searchParams);

    // Set page to 1 when user types new search query
    params.set('page', '1');

    // set the query
    if (term) {
      params.set('query', term);
    }
    else {
      params.delete('query');
    }

    // Replace current url with generated new one
    replace(`${pathname}?${params.toString()}`)
  }, 600)

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          handleSearch(e.target.value)
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
