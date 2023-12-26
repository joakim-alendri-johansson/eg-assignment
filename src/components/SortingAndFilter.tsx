import React from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';

export type SortingOptions = Record<'label' | 'value', string>[];
export interface SortAndFilterOptions {
  sort: string;
  filter: string;
  order: 'asc' | 'desc';
}

interface SortingAndFilterProps {
  options: SortingOptions;
  selected: SortAndFilterOptions;
  onChange: (sort_and_filter: SortAndFilterOptions) => void;
}

const SortingAndFilter: React.FC<SortingAndFilterProps> = ({
  options,
  onChange,
  selected,
}) => {
  return (
    <div className="flex w-full items-center justify-between whitespace-nowrap p-2 xl:flex-col xl:items-start">
      <div className="relative flex grow items-center xl:mb-4 xl:w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <input
          type="text"
          className="block w-full rounded-md py-1.5 pl-7 text-gray-900 ring-1 ring-inset ring-primary-300 placeholder:text-secondary-500 focus:ring-2 focus:ring-inset focus:ring-accent-600 dark:bg-secondary-800 dark:text-text-300 dark:ring-primary-400 dark:placeholder:text-secondary-300 dark:focus:text-text-100 dark:focus:ring-accent-500"
          placeholder="Filter..."
          value={selected.filter}
          onChange={(el) => onChange({ ...selected, filter: el.target.value })}
        />
        <button
          className="p-1 pr-0 text-text-600 hover:text-text-800 disabled:text-text-300 dark:text-text-300 dark:hover:text-text-100 dark:disabled:text-text-600"
          disabled={selected.filter.length === 0}
          onClick={() => onChange({ ...selected, filter: '' })}
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="ml-4 grow-0 p-1 text-sm text-accent-600 dark:border-primary-700 dark:text-accent-300 xl:ml-0 xl:pb-0">
        Sort by
      </div>
      <ul
        role="list"
        className="flex grow divide-x divide-accent-100 dark:divide-accent-700 xl:w-full xl:flex-col xl:divide-x-0 xl:divide-y"
      >
        {options.map(({ value, label }) => (
          <li
            key={value}
            className={`relative flex min-w-0 p-2 ${
              selected.sort === value
                ? 'bg-accent-200 dark:bg-secondary-400/70'
                : 'cursor-pointer hover:bg-secondary-200/70 dark:hover:bg-secondary-600/70'
            }`}
            onClick={() => {
              onChange({ ...selected, sort: value });
            }}
          >
            {label}
          </li>
        ))}
      </ul>
      <div className="ml-3 grow-0 p-1 text-sm text-accent-600 dark:border-primary-700 dark:text-accent-300 xl:ml-0 xl:mt-4 xl:pb-0">
        Order
      </div>
      <div className="flex grow-0 xl:w-full xl:flex-col">
        <div
          className={`relative flex w-full min-w-0 p-2 ${
            selected.order === 'asc'
              ? 'bg-accent-200 dark:bg-secondary-400/70'
              : 'cursor-pointer hover:bg-secondary-200/70 dark:hover:bg-secondary-600/70'
          }`}
          onClick={() => onChange({ ...selected, order: 'asc' })}
        >
          Ascending
        </div>
        <div
          className={`relative flex w-full min-w-0 p-2 ${
            selected.order === 'desc'
              ? 'bg-accent-200 dark:bg-secondary-400/70'
              : 'cursor-pointer hover:bg-secondary-200/70 dark:hover:bg-secondary-600/70'
          }`}
          onClick={() => onChange({ ...selected, order: 'desc' })}
        >
          Descending
        </div>
      </div>
    </div>
  );
};

export default SortingAndFilter;
