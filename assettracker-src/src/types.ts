export const ASSET_CATEGORIES = ['Laptop', 'Monitor', 'Projektor', 'Kiegészítő'] as const;
export const ASSET_STATUSES = ['Elérhető', 'Kikölcsönözve', 'Szervizben'] as const;

export type AssetCategory = (typeof ASSET_CATEGORIES)[number];
export type AssetStatus = (typeof ASSET_STATUSES)[number];

export interface Asset {
  id: number;
  name: string;
  serialNumber: string;
  price: number;
  category: AssetCategory;
  status: AssetStatus;
  note?: string;
  borrowerName?: string; // csak kikölcsönzött eszköznél van értéke
}

// Utility type: új eszköz azonosító nélkül
export type NewAsset = Omit<Asset, 'id'>;

export type CategoryFilter = AssetCategory | 'Mind';
export type StatusFilter = AssetStatus | 'Mind';

export interface Filters {
  searchText: string;
  category: CategoryFilter;
  status: StatusFilter;
}

// Type guardok: így nincs szükség `as` kényszerítésre a select értékeknél
export const isAssetCategory = (value: string): value is AssetCategory =>
  ASSET_CATEGORIES.some((category) => category === value);

export const isCategoryFilter = (value: string): value is CategoryFilter =>
  value === 'Mind' || isAssetCategory(value);

export const isStatusFilter = (value: string): value is StatusFilter =>
  value === 'Mind' || ASSET_STATUSES.some((status) => status === value);
