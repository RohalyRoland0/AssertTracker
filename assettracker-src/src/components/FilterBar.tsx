import type { ChangeEvent } from 'react';
import {
  ASSET_CATEGORIES,
  ASSET_STATUSES,
  isCategoryFilter,
  isStatusFilter,
  type Filters,
} from '../types';

interface FilterBarProps {
  filters: Filters;
  onFiltersChange: (newFilters: Filters) => void;
}

export function FilterBar({ filters, onFiltersChange }: FilterBarProps) {
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onFiltersChange({ ...filters, searchText: event.target.value });
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const value: string = event.target.value;
    if (isCategoryFilter(value)) {
      onFiltersChange({ ...filters, category: value });
    }
  };

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const value: string = event.target.value;
    if (isStatusFilter(value)) {
      onFiltersChange({ ...filters, status: value });
    }
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body row g-3">
        <div className="col-12 col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Keresés név vagy sorozatszám alapján..."
            value={filters.searchText}
            onChange={handleSearchChange}
          />
        </div>
        <div className="col-6 col-md-3">
          <select className="form-select" value={filters.category} onChange={handleCategoryChange}>
            <option value="Mind">Minden kategória</option>
            {ASSET_CATEGORIES.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="col-6 col-md-3">
          <select className="form-select" value={filters.status} onChange={handleStatusChange}>
            <option value="Mind">Minden státusz</option>
            {ASSET_STATUSES.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
