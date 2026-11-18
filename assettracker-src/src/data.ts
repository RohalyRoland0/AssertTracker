import type { Asset } from './types';

export const initialAssets: Asset[] = [
  { id: 1, name: 'Dell Latitude 5440', serialNumber: 'DL-5440-001', price: 389000, category: 'Laptop', status: 'Elérhető' },
  { id: 2, name: 'Lenovo ThinkPad E15', serialNumber: 'LN-E15-014', price: 342000, category: 'Laptop', status: 'Kikölcsönözve', borrowerName: 'Kovács Anna', note: 'Töltővel együtt' },
  { id: 3, name: 'LG UltraFine 27"', serialNumber: 'LG-27UF-203', price: 156000, category: 'Monitor', status: 'Elérhető' },
  { id: 4, name: 'Samsung 24" FHD', serialNumber: 'SM-24F-778', price: 62000, category: 'Monitor', status: 'Szervizben', note: 'Képernyő villog' },
  { id: 5, name: 'Epson EB-X49', serialNumber: 'EP-X49-310', price: 214000, category: 'Projektor', status: 'Kikölcsönözve', borrowerName: 'Nagy Péter' },
  { id: 6, name: 'Logitech MX Keys', serialNumber: 'LG-MXK-552', price: 38000, category: 'Kiegészítő', status: 'Elérhető' },
  { id: 7, name: 'HDMI dokkoló USB-C', serialNumber: 'DK-UC-091', price: 29000, category: 'Kiegészítő', status: 'Elérhető', note: 'HDMI + 2xUSB' },
  { id: 8, name: 'HP EliteBook 840', serialNumber: 'HP-840-427', price: 455000, category: 'Laptop', status: 'Elérhető' },
];
