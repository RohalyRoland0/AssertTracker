import type { Asset } from '../types';
import { AssetCard } from './AssetCard';

interface AssetListProps {
  assets: Asset[];
  onBorrow: (id: number, borrowerName: string) => void;
  onReturn: (id: number) => void;
  onDelete: (id: number) => void;
}

export function AssetList({ assets, onBorrow, onReturn, onDelete }: AssetListProps) {
  if (assets.length === 0) {
    return <div className="alert alert-info">Nincs a szűrésnek megfelelő eszköz.</div>;
  }

  return (
    <div className="row g-3">
      {assets.map((asset) => (
        <div key={asset.id} className="col-12 col-md-6 col-xl-4">
          <AssetCard asset={asset} onBorrow={onBorrow} onReturn={onReturn} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
}
