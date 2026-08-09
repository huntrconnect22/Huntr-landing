// Shared mock RFQ data — used as fallback on both list and detail pages
// when the backend public endpoint is unavailable.

export interface RfqItem {
  id: string;
  quantity: number;
  unit?: string;
  note?: string;
  catalogue?: {
    id?: string;
    name: string;
    category?: string;
    brand?: string;
    specifications?: string;
  };
}

export interface RfqCompany {
  id: string;
  name: string;
  type?: string;
  logo_path?: string;
  address?: string;
}

export interface Rfq {
  id: string;
  title: string;
  description?: string;
  status: string;
  duration_days?: number;
  delivery_point?: string;
  created_at: string;
  company?: RfqCompany;
  items?: RfqItem[];
  proposals_count?: number;
  document_path?: string;
}

export const MOCK_RFQS: Rfq[] = [
  {
    id: 'rfq-001',
    title: 'Pengadaan Laptop & Perangkat IT Q3 2026',
    description:
      'Dibutuhkan 50 unit laptop bisnis untuk mendukung operasional tim engineering dan manajemen. Laptop harus memenuhi spesifikasi minimum yang tercantum. Pengiriman diharapkan dalam 2 minggu setelah PO diterbitkan. Garansi resmi minimal 1 tahun.',
    status: 'open',
    duration_days: 14,
    delivery_point: 'Jakarta Selatan',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    company: { id: 'c1', name: 'PT Maju Bersama Indonesia', type: 'buyer', address: 'Jakarta Selatan, DKI Jakarta' },
    items: [
      { id: 'i1', quantity: 50, unit: 'unit', note: 'Spesifikasi: min. Intel Core i5 Gen 12, RAM 16GB, SSD 512GB', catalogue: { name: 'Laptop Bisnis 14"', category: 'Electronics', brand: 'Sesuai spesifikasi', specifications: 'Intel Core i5 Gen 12+, RAM 16GB DDR5, SSD 512GB NVMe' } },
      { id: 'i2', quantity: 50, unit: 'unit', catalogue: { name: 'Mouse Wireless', category: 'Accessories' } },
      { id: 'i3', quantity: 50, unit: 'unit', catalogue: { name: 'Keyboard Wireless', category: 'Accessories' } },
    ],
    proposals_count: 3,
  },
  {
    id: 'rfq-002',
    title: 'Kebutuhan ATK & Perlengkapan Kantor Bulanan',
    description:
      'Pengadaan rutin alat tulis kantor dan perlengkapan operasional untuk semua departemen. Pengiriman dilakukan ke kantor pusat di Surabaya setiap awal bulan.',
    status: 'open',
    duration_days: 7,
    delivery_point: 'Surabaya',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    company: { id: 'c2', name: 'PT Karya Gemilang Nusantara', type: 'buyer', address: 'Surabaya, Jawa Timur' },
    items: [
      { id: 'i4', quantity: 100, unit: 'pak', catalogue: { name: 'Kertas HVS A4 80gr', category: 'Stationery' } },
      { id: 'i5', quantity: 50, unit: 'pak', catalogue: { name: 'Pulpen Ballpoint', category: 'Stationery', brand: 'Standard/setara' } },
      { id: 'i6', quantity: 10, unit: 'unit', catalogue: { name: 'Stapler + Isi', category: 'Stationery' } },
      { id: 'i7', quantity: 20, unit: 'pak', catalogue: { name: 'Map Plastik A4', category: 'Stationery' } },
    ],
    proposals_count: 7,
  },
  {
    id: 'rfq-003',
    title: 'Pengadaan Seragam Karyawan 2026',
    description:
      'Seragam kerja standar untuk 200 karyawan divisi operasional. Tersedia dalam ukuran S, M, L, XL, dan XXL. Bahan katun combed 30s, sablon logo perusahaan. Vendor harus menyediakan sampel sebelum produksi massal.',
    status: 'open',
    duration_days: 21,
    delivery_point: 'Bandung',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    company: { id: 'c3', name: 'PT Sukses Makmur Sentosa', type: 'buyer', address: 'Bandung, Jawa Barat' },
    items: [
      { id: 'i8', quantity: 400, unit: 'pcs', note: 'Ukuran: S/M/L/XL/XXL masing-masing 80 pcs', catalogue: { name: 'Kemeja Seragam', category: 'Apparel', specifications: 'Katun combed 30s, dengan logo perusahaan' } },
      { id: 'i9', quantity: 400, unit: 'pcs', catalogue: { name: 'Celana Seragam', category: 'Apparel' } },
    ],
    proposals_count: 5,
  },
  {
    id: 'rfq-004',
    title: 'Pemeliharaan AC Gedung Kantor Pusat',
    description:
      'Jasa servis dan pemeliharaan 40 unit AC split dan central AC untuk gedung 10 lantai. Pekerjaan meliputi: cleaning filter, isi freon, cek komponen elektrikal. Dijadwalkan setiap 3 bulan sekali.',
    status: 'open',
    duration_days: 10,
    delivery_point: 'Jakarta Pusat',
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    company: { id: 'c4', name: 'PT Global Prima Mandiri', type: 'buyer', address: 'Jakarta Pusat, DKI Jakarta' },
    items: [
      { id: 'i10', quantity: 40, unit: 'unit', note: 'Termasuk bahan habis pakai (freon, filter)', catalogue: { name: 'Servis AC Split', category: 'Services' } },
      { id: 'i11', quantity: 2, unit: 'unit', catalogue: { name: 'Servis Central AC', category: 'Services' } },
    ],
    proposals_count: 2,
  },
  {
    id: 'rfq-005',
    title: 'Pengadaan Furnitur Ruang Meeting Baru',
    description:
      'Kebutuhan furnitur lengkap untuk 4 ruang meeting baru di gedung kantor lantai 5-6. Desain modern dan minimalis. Warna: abu-abu dan putih. Termasuk instalasi dan pengiriman.',
    status: 'open',
    duration_days: 30,
    delivery_point: 'Tangerang',
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    company: { id: 'c5', name: 'PT Anugrah Jaya Abadi', type: 'buyer', address: 'Tangerang, Banten' },
    items: [
      { id: 'i12', quantity: 4, unit: 'set', catalogue: { name: 'Meja Meeting Oval', category: 'Furniture', specifications: '200x100cm, MDF premium dengan HPL' } },
      { id: 'i13', quantity: 40, unit: 'unit', catalogue: { name: 'Kursi Meeting Ergonomis', category: 'Furniture' } },
      { id: 'i14', quantity: 4, unit: 'unit', catalogue: { name: 'Whiteboard 120x240cm', category: 'Furniture' } },
    ],
    proposals_count: 4,
  },
  {
    id: 'rfq-006',
    title: 'Layanan Catering Harian Kantor',
    description:
      'Jasa katering makan siang untuk ± 150 orang per hari, hari kerja (Senin-Jumat) selama 3 bulan (Juli-September 2026). Menu bervariasi, termasuk lauk-pauk, sayur, nasi, dan minuman.',
    status: 'open',
    duration_days: 7,
    delivery_point: 'Jakarta Barat',
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    company: { id: 'c6', name: 'PT Teknologi Solusi Digital', type: 'buyer', address: 'Jakarta Barat, DKI Jakarta' },
    items: [
      { id: 'i15', quantity: 150, unit: 'porsi/hari', note: 'Estimasi 65 hari kerja × 150 porsi', catalogue: { name: 'Paket Makan Siang Prasmanan', category: 'F&B Services' } },
    ],
    proposals_count: 9,
  },
];
