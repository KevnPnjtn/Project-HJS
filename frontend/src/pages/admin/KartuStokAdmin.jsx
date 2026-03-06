import React, { useState, useEffect, useRef } from 'react';
import { Eye, Printer, FileText, Download, Search, ChevronDown, X, Package } from 'lucide-react';
import { GlobalStyles, ToastContainer } from '../../components/ui/SharedComponents';
import { useToast } from '../../components/ui/sharedHooks';
import { productapi } from '../../services/productapi';
import { stocktransactionapi } from '../../services/stocktransactionapi';
import * as XLSX from 'xlsx';

const KartuStokAdmin = () => {
  const [filters, setFilters] = useState({ product_id: '', tanggal_mulai: '', tanggal_selesai: '' });
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stokAwal, setStokAwal] = useState(0);

  const toast = useToast();

  useEffect(() => {
    fetchProducts();
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    setFilters(prev => ({
      ...prev,
      tanggal_mulai: lastWeek.toISOString().split('T')[0],
      tanggal_selesai: today.toISOString().split('T')[0]
    }));
  }, []);

  useEffect(() => {
    if (!searchProduct.trim()) { setFilteredProducts(products); return; }
    const q = searchProduct.toLowerCase();
    setFilteredProducts(products.filter(p =>
      p.nama_barang?.toLowerCase().includes(q) ||
      p.kode_barang?.toLowerCase().includes(q) ||
      p.jenis_barang?.toLowerCase().includes(q)
    ));
  }, [searchProduct, products]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
        if (!selectedProduct) setSearchProduct('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedProduct]);

  const fetchProducts = async () => {
    try {
      const response = await productapi.getForDropdown();
      let productList = response.data?.data || response.data || (Array.isArray(response) ? response : []);
      const sorted = [...productList].sort((a, b) => {
        if (a.created_at && b.created_at) return new Date(b.created_at) - new Date(a.created_at);
        return (b.product_id || 0) - (a.product_id || 0);
      });
      setProducts(sorted);
      setFilteredProducts(sorted);
    } catch {
      toast.error('Gagal memuat daftar produk.', 'Error');
    }
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setFilters(prev => ({ ...prev, product_id: product.product_id }));
    setSearchProduct(product.nama_barang);
    setShowDropdown(false);
  };

  const handleClearSelection = () => {
    setSelectedProduct(null);
    setFilters(prev => ({ ...prev, product_id: '' }));
    setSearchProduct('');
    setTransactions([]);
    setStokAwal(0);
  };

  const handleTampilkan = async () => {
    if (!selectedProduct) { toast.warning('Silakan pilih produk terlebih dahulu!'); return; }
    if (!filters.tanggal_mulai || !filters.tanggal_selesai) { toast.warning('Tanggal mulai dan selesai harus diisi!'); return; }

    setLoading(true);
    try {
      const res = await stocktransactionapi.getKartuStok(selectedProduct.product_id);
      const allTransactions = res.data?.transactions || res.transactions || [];

      const startDate = new Date(filters.tanggal_mulai);
      const endDate = new Date(filters.tanggal_selesai);
      endDate.setHours(23, 59, 59, 999);

      const before = [], inPeriod = [];
      allTransactions.forEach(t => {
        const d = new Date(t.created_at);
        if (d < startDate) before.push(t);
        else if (d >= startDate && d <= endDate) inPeriod.push(t);
      });

      let calcStokAwal = 0;
      before.forEach(t => {
        if (t.jenis_transaksi === 'IN')         calcStokAwal += parseInt(t.jumlah);
        else if (t.jenis_transaksi === 'OUT')    calcStokAwal -= parseInt(t.jumlah);
        else if (t.jenis_transaksi === 'ADJUST') calcStokAwal  = parseInt(t.jumlah);
      });
      setStokAwal(calcStokAwal);

      let running = calcStokAwal;
      const withBalance = inPeriod
        .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
        .map(t => {
          let masuk = 0, keluar = 0;
          if (t.jenis_transaksi === 'IN')         { masuk = parseInt(t.jumlah); running += masuk; }
          else if (t.jenis_transaksi === 'OUT')    { keluar = parseInt(t.jumlah); running -= keluar; }
          else if (t.jenis_transaksi === 'ADJUST') {
            const diff = parseInt(t.jumlah) - running;
            if (diff > 0) masuk = diff; else if (diff < 0) keluar = Math.abs(diff);
            running = parseInt(t.jumlah);
          }
          return { ...t, masuk, keluar, sisa_stok: running };
        });

      setTransactions(withBalance);

      if (withBalance.length > 0) {
        toast.success(`Berhasil memuat ${withBalance.length} transaksi untuk ${selectedProduct.nama_barang}!`, 'Data Ditemukan');
      } else {
        toast.warning('Tidak ada transaksi dalam periode ini. Coba pilih periode lain.', 'Data Kosong');
      }

    } catch (err) {
      toast.error('Gagal memuat data kartu stok: ' + (err.response?.data?.message || err.message), 'Error');
    } finally {
      setLoading(false);
    }
  };

  const handleExportExcel = () => {
    try {
      const exportData = [
        { 'Tanggal': 'STOK AWAL', 'Keterangan': 'Stok Awal Periode', 'Masuk': '', 'Keluar': '', 'Sisa Stok': stokAwal },
        ...transactions.map(t => ({
          'Tanggal': formatDate(t.created_at),
          'Keterangan': getKeterangan(t),
          'Masuk': t.masuk > 0 ? t.masuk : '',
          'Keluar': t.keluar > 0 ? t.keluar : '',
          'Sisa Stok': t.sisa_stok
        }))
      ];

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(exportData);
      ws['!cols'] = [{ wch: 12 }, { wch: 40 }, { wch: 10 }, { wch: 10 }, { wch: 12 }];

      const range = XLSX.utils.decode_range(ws['!ref']);
      for (let R = range.s.r; R <= range.e.r; ++R) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const addr = XLSX.utils.encode_cell({ r: R, c: C });
          if (!ws[addr]) continue;
          if (R === 0) {
            ws[addr].s = { font: { bold: true, color: { rgb: 'FFFFFF' } }, fill: { fgColor: { rgb: '000000' } }, alignment: { horizontal: 'center', vertical: 'center' }, border: { top: { style: 'thin', color: { rgb: '000000' } }, bottom: { style: 'thin', color: { rgb: '000000' } }, left: { style: 'thin', color: { rgb: '000000' } }, right: { style: 'thin', color: { rgb: '000000' } } } };
          } else if (R === 1) {
            ws[addr].s = { font: { bold: true }, fill: { fgColor: { rgb: 'E0E0E0' } }, alignment: { horizontal: C === 4 ? 'center' : 'left', vertical: 'center' }, border: { top: { style: 'medium', color: { rgb: '000000' } }, bottom: { style: 'medium', color: { rgb: '000000' } }, left: { style: 'thin', color: { rgb: 'CCCCCC' } }, right: { style: 'thin', color: { rgb: 'CCCCCC' } } } };
          } else {
            ws[addr].s = { alignment: { horizontal: C >= 2 ? 'center' : 'left', vertical: 'center' }, border: { top: { style: 'thin', color: { rgb: 'CCCCCC' } }, bottom: { style: 'thin', color: { rgb: 'CCCCCC' } }, left: { style: 'thin', color: { rgb: 'CCCCCC' } }, right: { style: 'thin', color: { rgb: 'CCCCCC' } } }, fill: { fgColor: { rgb: R % 2 === 0 ? 'F9FAFB' : 'FFFFFF' } } };
          }
        }
      }

      XLSX.utils.book_append_sheet(wb, ws, 'Kartu Stok');
      XLSX.writeFile(wb, `Kartu_Stok_${selectedProduct.kode_barang}_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.xlsx`);

      toast.success(`File Excel berhasil diunduh! (${transactions.length} transaksi)`, 'Export Berhasil');
    } catch {
      toast.error('Gagal export data.', 'Export Gagal');
    }
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  const formatDateLong = (d) => new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });

  const getKeterangan = (t) => {
  const prefix = t.jenis_transaksi === 'IN' ? 'Barang Masuk' : t.jenis_transaksi === 'OUT' ? 'Barang Keluar' : 'Penyesuaian Stok';
  let k = prefix;
  if (t.catatan) {
    const cleaned = t.catatan.replace(/barang\s+(masuk|keluar)/gi, '').replace(/^\s*[-–]\s*/, '').trim();
    if (cleaned) k += ' - ' + cleaned;
  }
  if (t.penanggung_jawab) k += ' (' + t.penanggung_jawab + ')';
  return k || '-';
};

  return (
    <>
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print-area, .print-area * { visibility: visible; }
          .print-area { position: absolute; left: 0; top: 0; width: 100%; padding: 30px; }
          .no-print { display: none !important; }
        }
      `}</style>

      <div className="min-h-screen bg-gray-50 p-6">
        <GlobalStyles />
        <ToastContainer toasts={toast.toasts} onRemove={toast.remove} />

        <div className="max-w-7xl mx-auto space-y-6">

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg p-8 text-white no-print">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                <FileText className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-1">Laporan Kartu Stok per Barang</h1>
                <p className="text-blue-100 text-lg">Riwayat mutasi stok barang per periode</p>
              </div>
            </div>
          </div>

          {/* Filter Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 no-print">
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                <Search className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Filter Laporan</h2>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {/* Pilih Barang */}
                <div ref={dropdownRef}>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Pilih Barang <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    {!selectedProduct ? (
                      <button
                        type="button"
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 text-left bg-white hover:bg-gray-50 transition-all shadow-sm flex items-center justify-between"
                      >
                        <span className="text-gray-500 flex items-center gap-3 text-base">
                          <Package className="w-5 h-5 text-gray-400" />
                          Pilih produk...
                        </span>
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                      </button>
                    ) : (
                      <div className="flex gap-3">
                        <div className="flex-1 px-5 py-4 border-2 border-blue-500 bg-blue-50 rounded-xl shadow-sm">
                          <p className="font-bold text-blue-900 text-lg">{selectedProduct.nama_barang}</p>
                          <p className="text-sm text-blue-700 mt-1">Kode: {selectedProduct.kode_barang} • Stok: {selectedProduct.stok}</p>
                        </div>
                        <button type="button" onClick={handleClearSelection} className="px-4 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all border-2 border-red-200" title="Hapus pilihan">
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    )}

                    {showDropdown && !selectedProduct && (
                      <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-300 rounded-xl shadow-2xl overflow-hidden">
                        <div className="p-4 border-b border-gray-200 bg-blue-50">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500" />
                            <input
                              type="text"
                              value={searchProduct}
                              onChange={(e) => setSearchProduct(e.target.value)}
                              placeholder="Cari nama atau kode barang..."
                              className="w-full pl-11 pr-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 text-base"
                              autoFocus
                            />
                          </div>
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                          {filteredProducts.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                              <Package className="w-16 h-16 mx-auto mb-3 text-gray-300" />
                              <p className="text-base font-medium">Tidak ada produk ditemukan</p>
                            </div>
                          ) : (
                            filteredProducts.map(product => (
                              <div key={product.product_id} onClick={() => handleSelectProduct(product)} className="p-4 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-all">
                                <p className="font-semibold text-gray-900 text-base">{product.nama_barang}</p>
                                <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
                                  <span className="font-mono bg-gray-100 px-3 py-1 rounded-md">Kode: {product.kode_barang}</span>
                                  <span className="text-blue-600 font-bold">Stok: {product.stok}</span>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Tanggal Mulai <span className="text-red-500">*</span></label>
                    <input type="date" value={filters.tanggal_mulai} onChange={(e) => setFilters({ ...filters, tanggal_mulai: e.target.value })} className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 shadow-sm text-base" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Tanggal Selesai <span className="text-red-500">*</span></label>
                    <input type="date" value={filters.tanggal_selesai} onChange={(e) => setFilters({ ...filters, tanggal_selesai: e.target.value })} className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 shadow-sm text-base" />
                  </div>
                </div>

                <button onClick={handleTampilkan} disabled={loading} className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:scale-[0.98] text-lg">
                  <Eye className="w-6 h-6" />
                  {loading ? 'Memuat...' : 'Tampilkan'}
                </button>
              </div>
            </div>

            {selectedProduct && transactions.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap gap-3">
                <button onClick={() => window.print()} className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-all font-semibold shadow-md hover:shadow-lg active:scale-[0.98]">
                  <Printer className="w-5 h-5" />Cetak Laporan
                </button>
                <button onClick={handleExportExcel} className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all font-semibold shadow-md hover:shadow-lg active:scale-[0.98]">
                  <Download className="w-5 h-5" />Export Excel
                </button>
              </div>
            )}
          </div>

          {/* Result */}
          {selectedProduct && (
            <div className="print-area">
              <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-200">
                  <Package className="w-8 h-8 text-blue-600 no-print" />
                  <h2 className="text-2xl font-bold text-gray-900">{selectedProduct.nama_barang}</h2>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Kode Barang', value: selectedProduct.kode_barang },
                    { label: 'Jenis', value: selectedProduct.jenis_barang || '-' },
                    { label: 'Satuan', value: selectedProduct.satuan || 'Unit' },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <label className="text-xs text-gray-600 mb-2 block font-semibold uppercase tracking-wide">{label}</label>
                      <span className="font-bold text-xl text-gray-900">{value}</span>
                    </div>
                  ))}
                  <div>
                    <label className="text-xs text-gray-600 mb-2 block font-semibold uppercase tracking-wide">Stok Saat Ini</label>
                    <span className="font-bold text-3xl text-blue-600">{selectedProduct.stok || 0}</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200 text-base text-gray-700">
                  <span className="font-bold text-gray-900">Periode Laporan:</span>{' '}
                  {formatDateLong(filters.tanggal_mulai)} sampai {formatDateLong(filters.tanggal_selesai)}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-blue-600">
                      <th className="text-left py-4 px-6 text-sm font-bold text-white border-r border-blue-500">Tanggal</th>
                      <th className="text-left py-4 px-6 text-sm font-bold text-white border-r border-blue-500">Keterangan</th>
                      <th className="text-center py-4 px-6 text-sm font-bold text-white border-r border-blue-500">Masuk</th>
                      <th className="text-center py-4 px-6 text-sm font-bold text-white border-r border-blue-500">Keluar</th>
                      <th className="text-center py-4 px-6 text-sm font-bold text-white">Sisa Stok</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-gray-100 border-t-2 border-b-2 border-gray-300">
                      <td className="py-4 px-6 font-bold text-gray-900 border-r border-gray-200" colSpan="4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                          Stok Awal Periode
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center font-bold text-blue-700 text-2xl">{stokAwal}</td>
                    </tr>

                    {loading && (
                      <tr>
                        <td colSpan="5" className="text-center py-16 border-t border-gray-200">
                          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                          <p className="mt-4 text-gray-600 font-medium text-lg">Memuat data...</p>
                        </td>
                      </tr>
                    )}

                    {!loading && transactions.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center py-16 text-gray-500 border-t border-gray-200">
                          <FileText className="w-20 h-20 mx-auto mb-4 text-gray-300" />
                          <p className="text-xl font-semibold text-gray-700">Tidak ada transaksi dalam periode ini</p>
                          <p className="text-base text-gray-500 mt-2">Silakan pilih periode lain atau produk berbeda</p>
                        </td>
                      </tr>
                    )}

                    {!loading && transactions.map((t, index) => (
                      <tr key={t.transaction_id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                        <td className="py-4 px-6 text-base text-gray-900 border-t border-r border-gray-200 font-medium">{formatDate(t.created_at)}</td>
                        <td className="py-4 px-6 text-base text-gray-700 border-t border-r border-gray-200">{getKeterangan(t)}</td>
                        <td className="py-4 px-6 text-center text-base border-t border-r border-gray-200">
                          {t.masuk > 0 ? <span className="inline-block px-4 py-2 font-bold text-green-700 bg-green-100 rounded-lg">+{t.masuk}</span> : <span className="text-gray-400">-</span>}
                        </td>
                        <td className="py-4 px-6 text-center text-base border-t border-r border-gray-200">
                          {t.keluar > 0 ? <span className="inline-block px-4 py-2 font-bold text-red-700 bg-red-100 rounded-lg">-{t.keluar}</span> : <span className="text-gray-400">-</span>}
                        </td>
                        <td className="py-4 px-6 text-center font-bold text-blue-700 text-xl border-t border-gray-200">{t.sisa_stok}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/**/}
              {transactions.length > 0 && (
                <div className="mt-4 px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-300 text-sm text-gray-700 rounded-2xl shadow-sm">
                  <div className="font-semibold flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    Menampilkan {transactions.length} transaksi dari {formatDateLong(filters.tanggal_mulai)}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default KartuStokAdmin;