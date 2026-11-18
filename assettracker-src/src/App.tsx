import { useMemo, useState } from 'react';
import { initialAssets } from './data';
import type { Asset, Filters, NewAsset } from './types';
import { StatsBar } from './components/StatsBar';
import { FilterBar } from './components/FilterBar';
import { AssetList } from './components/AssetList';
import { AddAssetForm } from './components/AddAssetForm';

const DEFAULT_FILTERS: Filters = { searchText: '', category: 'Mind', status: 'Mind' };

export default function App() {
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const filteredAssets: Asset[] = useMemo(() => {
    const query: string = filters.searchText.trim().toLowerCase();
    return assets.filter((asset) => {
      const matchesSearch: boolean =
        query === '' ||
        asset.name.toLowerCase().includes(query) ||
        asset.serialNumber.toLowerCase().includes(query);
      const matchesCategory: boolean = filters.category === 'Mind' || asset.category === filters.category;
      const matchesStatus: boolean = filters.status === 'Mind' || asset.status === filters.status;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [assets, filters]);

  const handleBorrow = (id: number, borrowerName: string): void => {
    setAssets((prev) =>
      prev.map((asset): Asset =>
        asset.id === id ? { ...asset, status: 'Kikölcsönözve', borrowerName } : asset,
      ),
    );
  };

  const handleReturn = (id: number): void => {
    setAssets((prev) =>
      prev.map((asset): Asset =>
        asset.id === id ? { ...asset, status: 'Elérhető', borrowerName: undefined } : asset,
      ),
    );
  };

  const handleDelete = (id: number): void => {
    setAssets((prev) => prev.filter((asset) => asset.id !== id));
  };

  const handleAdd = (newAsset: NewAsset): void => {
    setAssets((prev) => {
      const nextId: number = prev.reduce((max, asset) => Math.max(max, asset.id), 0) + 1;
      const asset: Asset = { ...newAsset, id: nextId };
      return [...prev, asset];
    });
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">AssetTracker – IT eszközleltár</h1>
      <StatsBar assets={assets} />
      <AddAssetForm onAdd={handleAdd} />
      <FilterBar filters={filters} onFiltersChange={setFilters} />
      <AssetList assets={filteredAssets} onBorrow={handleBorrow} onReturn={handleReturn} onDelete={handleDelete} />
    </div>
  );
}
