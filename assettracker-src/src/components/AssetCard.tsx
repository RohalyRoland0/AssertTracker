import type { Asset, AssetStatus } from '../types';

interface AssetCardProps {
  asset: Asset;
  onBorrow: (id: number, borrowerName: string) => void;
  onReturn: (id: number) => void;
  onDelete: (id: number) => void;
}

const STATUS_BADGE_CLASS: Record<AssetStatus, string> = {
  'Elérhető': 'bg-success',
  'Kikölcsönözve': 'bg-warning text-dark',
  'Szervizben': 'bg-danger',
};

export function AssetCard({ asset, onBorrow, onReturn, onDelete }: AssetCardProps) {
  const handleBorrowClick = (): void => {
    const borrowerName: string | null = window.prompt('Add meg a kölcsönző nevét:');
    if (borrowerName !== null && borrowerName.trim() !== '') {
      onBorrow(asset.id, borrowerName.trim());
    }
  };

  const handleDeleteClick = (): void => {
    if (window.confirm(`Biztosan törlöd: ${asset.name}?`)) {
      onDelete(asset.id);
    }
  };

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title mb-0">{asset.name}</h5>
          <span className={`badge ${STATUS_BADGE_CLASS[asset.status]}`}>{asset.status}</span>
        </div>
        <p className="text-muted small mb-1">{asset.category} · {asset.serialNumber}</p>
        <p className="fw-semibold mb-2">{asset.price.toLocaleString('hu-HU')} Ft</p>

        {asset.status === 'Kikölcsönözve' && asset.borrowerName && (
          <p className="mb-1">Kölcsönző: <strong>{asset.borrowerName}</strong></p>
        )}
        {asset.note && <p className="fst-italic small text-secondary">Megjegyzés: {asset.note}</p>}

        <div className="mt-auto d-flex gap-2 pt-2">
          {asset.status === 'Elérhető' && (
            <button type="button" className="btn btn-primary btn-sm" onClick={handleBorrowClick}>
              Kölcsönzés
            </button>
          )}
          {asset.status === 'Kikölcsönözve' && (
            <button type="button" className="btn btn-success btn-sm" onClick={() => onReturn(asset.id)}>
              Visszavétel
            </button>
          )}
          <button type="button" className="btn btn-outline-danger btn-sm ms-auto" onClick={handleDeleteClick}>
            Törlés
          </button>
        </div>
      </div>
    </div>
  );
}
