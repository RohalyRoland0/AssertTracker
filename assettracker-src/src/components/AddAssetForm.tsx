import { useState, type ChangeEvent, type FormEvent } from 'react';
import { ASSET_CATEGORIES, isAssetCategory, type AssetCategory, type NewAsset } from '../types';

interface AddAssetFormProps {
  onAdd: (newAsset: NewAsset) => void;
}

type ErrorField = 'name' | 'serialNumber' | 'price';
type FormErrors = Partial<Record<ErrorField, string>>;
type TextField = 'name' | 'serialNumber' | 'price' | 'note';

export function AddAssetForm({ onAdd }: AddAssetFormProps) {
  const [name, setName] = useState<string>('');
  const [serialNumber, setSerialNumber] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [category, setCategory] = useState<AssetCategory>('Laptop');
  const [note, setNote] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});

  const setters: Record<TextField, (value: string) => void> = {
    name: setName,
    serialNumber: setSerialNumber,
    price: setPrice,
    note: setNote,
  };

  const handleTextChange =
    (field: TextField) =>
    (event: ChangeEvent<HTMLInputElement>): void => {
      setters[field](event.target.value);
    };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const value: string = event.target.value;
    if (isAssetCategory(value)) {
      setCategory(value);
    }
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (name.trim() === '') newErrors.name = 'A megnevezés kötelező.';
    if (serialNumber.trim() === '') newErrors.serialNumber = 'A sorozatszám kötelező.';
    const parsedPrice: number = Number(price);
    if (price.trim() === '' || Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      newErrors.price = 'Az árnak pozitív számnak kell lennie.';
    }
    return newErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const validationErrors: FormErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const newAsset: NewAsset = {
      name: name.trim(),
      serialNumber: serialNumber.trim(),
      price: Number(price),
      category,
      status: 'Elérhető',
      note: note.trim() === '' ? undefined : note.trim(),
    };
    onAdd(newAsset);

    setName('');
    setSerialNumber('');
    setPrice('');
    setCategory('Laptop');
    setNote('');
  };

  return (
    <form className="card shadow-sm mb-4" onSubmit={handleSubmit} noValidate>
      <div className="card-header fw-semibold">Új eszköz felvétele</div>
      <div className="card-body row g-3">
        <div className="col-12 col-md-6">
          <label className="form-label" htmlFor="asset-name">Megnevezés *</label>
          <input id="asset-name" className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            value={name} onChange={handleTextChange('name')} />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label" htmlFor="asset-serial">Sorozatszám *</label>
          <input id="asset-serial" className={`form-control ${errors.serialNumber ? 'is-invalid' : ''}`}
            value={serialNumber} onChange={handleTextChange('serialNumber')} />
          {errors.serialNumber && <div className="invalid-feedback">{errors.serialNumber}</div>}
        </div>
        <div className="col-12 col-md-4">
          <label className="form-label" htmlFor="asset-price">Beszerzési ár (Ft) *</label>
          <input id="asset-price" type="number" className={`form-control ${errors.price ? 'is-invalid' : ''}`}
            value={price} onChange={handleTextChange('price')} />
          {errors.price && <div className="invalid-feedback">{errors.price}</div>}
        </div>
        <div className="col-12 col-md-4">
          <label className="form-label" htmlFor="asset-category">Kategória</label>
          <select id="asset-category" className="form-select" value={category} onChange={handleCategoryChange}>
            {ASSET_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="col-12 col-md-4">
          <label className="form-label" htmlFor="asset-note">Megjegyzés</label>
          <input id="asset-note" className="form-control" value={note} onChange={handleTextChange('note')} />
        </div>
      </div>
      <div className="card-footer text-end">
        <button type="submit" className="btn btn-primary">Eszköz hozzáadása</button>
      </div>
    </form>
  );
}
