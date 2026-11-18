import type { Asset } from '../types';

interface StatsBarProps {
  assets: Asset[];
}

export function StatsBar({ assets }: StatsBarProps) {
  const totalCount: number = assets.length;
  const availableCount: number = assets.filter((asset) => asset.status === 'Elérhető').length;
  const totalValue: number = assets.reduce((sum, asset) => sum + asset.price, 0);

  return (
    <div className="row g-3 mb-4">
      <div className="col-12 col-md-4">
        <div className="card text-center shadow-sm">
          <div className="card-body">
            <h6 className="text-muted">Összes eszköz</h6>
            <p className="display-6 mb-0">{totalCount}</p>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-4">
        <div className="card text-center shadow-sm">
          <div className="card-body">
            <h6 className="text-muted">Elérhető eszközök</h6>
            <p className="display-6 mb-0 text-success">{availableCount}</p>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-4">
        <div className="card text-center shadow-sm">
          <div className="card-body">
            <h6 className="text-muted">Raktárkészlet értéke</h6>
            <p className="display-6 mb-0">{totalValue.toLocaleString('hu-HU')} Ft</p>
          </div>
        </div>
      </div>
    </div>
  );
}
