import React, { useState, useEffect } from 'react';
import { Eye, Printer, FileText } from 'lucide-react';
import { productapi } from '../../services/productapi';
import { stockopnameapi } from '../../services/stockopnameapi';

const KartuStokAdmin = () => {
  const [filters, setFilters] = useState({
    kode_barang: '',
    tanggal_mulai: '',
    tanggal_selesai: ''
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [stokAwal, setStokAwal] = useState(0);

  useEffect(() => {
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    
    setFilters(prev => ({
      ...prev,
      tanggal_mulai: lastWeek.toISOString().split('T')[0],
      tanggal_selesai: today.toISOString().split('T')[0]
    }));
  }, []);

  const handleTampilkan = async () => {
    if (!filters.kode_barang.trim()) {
      setError('Kode barang harus diisi!');
      return;
    }

    if (!filters.tanggal_mulai || !filters.tanggal_selesai) {
      setError('Tanggal mulai dan selesai harus diisi!');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const productResponse = await productapi.getAll({ search: filters.kode_barang });
      const products = productResponse.data?.data || productResponse.data || [];
      const product = products.find(p => p.kode_barang === filters.kode_barang);

      if (!product) {
        setError('Produk tidak ditemukan!');
        setSelectedProduct(null);
        setTransactions([]);
        setLoading(false);
        return;
      }

      setSelectedProduct(product);

      const transactionResponse = await stockopnameapi.getAll({
        product_id: product.product_id,
        start_date: filters.tanggal_mulai,
        end_date: filters.tanggal_selesai
      });

      const allTransactions = transactionResponse.data?.data || transactionResponse.data || [];
  
      const sortedTransactions = allTransactions.sort((a, b) => 
        new Date(a.created_at) - new Date(b.created_at)
      );

      const stokAwalResponse = await stockopnameapi.getAll({
        product_id: product.product_id,
        end_date: filters.tanggal_mulai
      });

      const transactionsBeforePeriod = stokAwalResponse.data?.data || stokAwalResponse.data || [];
      
      let calculatedStokAwal = 0;
      transactionsBeforePeriod.forEach(t => {
        if (t.jenis_transaksi === 'IN' || t.jenis_transaksi === 'ADJUST') {
          calculatedStokAwal += t.jumlah;
        } else if (t.jenis_transaksi === 'OUT') {
          calculatedStokAwal -= t.jumlah;
        }
      });

      setStokAwal(calculatedStokAwal);

      let runningBalance = calculatedStokAwal;
      const transactionsWithBalance = sortedTransactions.map(t => {
        let masuk = 0;
        let keluar = 0;

        if (t.jenis_transaksi === 'IN') {
          masuk = t.jumlah;
          runningBalance += t.jumlah;
        } else if (t.jenis_transaksi === 'OUT') {
          keluar = t.jumlah;
          runningBalance -= t.jumlah;
        } else if (t.jenis_transaksi === 'ADJUST') {
          const diff = t.jumlah - runningBalance;
          if (diff > 0) {
            masuk = Math.abs(diff);
          } else if (diff < 0) {
            keluar = Math.abs(diff);
          }
          runningBalance = t.jumlah;
        }

        return {
          ...t,
          masuk,
          keluar,
          sisa_stok: runningBalance
        };
      });

      setTransactions(transactionsWithBalance);

    } catch (err) {
      console.error('Error fetching kartu stok:', err);
      setError('Gagal memuat data kartu stok');
    } finally {
      setLoading(false);
    }
  };

  const handleCetak = () => {
    window.print();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatDateFull = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getKeterangan = (transaction) => {
    if (transaction.jenis_transaksi === 'IN') {
      return 'Barang Masuk' + (transaction.catatan ? ` via ${transaction.catatan}` : '');
    } else if (transaction.jenis_transaksi === 'OUT') {
      return 'Barang Keluar' + (transaction.catatan ? ` via ${transaction.catatan}` : '');
    } else if (transaction.jenis_transaksi === 'ADJUST') {
      return 'Penyesuaian Stok' + (transaction.catatan ? ` - ${transaction.catatan}` : '');
    }
    return transaction.catatan || '-';
  };

  return (
    <>
      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-area, .print-area * {
            visibility: visible;
          }
          .print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 20px;
          }
          .no-print {
            display: none !important;
          }
          
          .print-area {
            background: white !important;
            color: black !important;
          }
          
          .print-area table {
            border-collapse: collapse;
            width: 100%;
            border: 2px solid black !important;
          }
          
          .print-area th {
            background: #e0e0e0 !important;
            color: black !important;
            border: 1px solid black !important;
            padding: 8px !important;
            font-weight: bold !important;
          }
          
          .print-area td {
            border: 1px solid black !important;
            padding: 6px 8px !important;
            color: black !important;
          }
          
          .print-header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px solid black;
            padding-bottom: 10px;
          }
          
          .print-header h1 {
            font-size: 24px;
            font-weight: bold;
            margin: 0 0 10px 0;
          }
          
          .print-info {
            text-align: left;
            margin-bottom: 15px;
            font-size: 14px;
          }
          
          @page {
            margin: 1cm;
          }
        }
      `}</style>

      <div className="space-y-6">
        {/* Header - No Print */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 no-print">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <FileText className="w-8 h-8 text-blue-600" />
                Laporan Kartu Stok per Barang
              </h1>
              <p className="text-gray-600 mt-1">Riwayat mutasi stok barang per periode</p>
            </div>
          </div>

          {/* Filter Section */}
          <div className="bg-gray-50 rounded-lg p-5 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter Laporan</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Kode Barang
                </label>
                <input
                  type="text"
                  value={filters.kode_barang}
                  onChange={(e) => setFilters({ ...filters, kode_barang: e.target.value })}
                  placeholder="BR-1012"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tanggal Mulai
                </label>
                <input
                  type="date"
                  value={filters.tanggal_mulai}
                  onChange={(e) => setFilters({ ...filters, tanggal_mulai: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tanggal Selesai
                </label>
                <input
                  type="date"
                  value={filters.tanggal_selesai}
                  onChange={(e) => setFilters({ ...filters, tanggal_selesai: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleTampilkan}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:bg-gray-400"
                >
                  <Eye className="w-5 h-5" />
                  {loading ? 'Memuat...' : 'Tampilkan'}
                </button>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {/* Action Button */}
          {selectedProduct && transactions.length > 0 && (
            <div className="flex gap-3">
              <button
                onClick={handleCetak}
                className="flex items-center gap-2 px-6 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold"
              >
                <Printer className="w-5 h-5" />
                Cetak
              </button>
            </div>
          )}
        </div>

        {/* Print Area */}
        {selectedProduct && (
          <div className="print-area">
            {/* Print Header */}
            <div className="print-header">
              <h1>Laporan Kartu Stok per Barang</h1>
            </div>

            {/* Product Info */}
            <div className="print-info bg-blue-50 rounded-lg p-4 mb-4 no-print">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Kode Barang:</p>
                  <p className="font-bold text-lg text-gray-900">{selectedProduct.kode_barang}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Periode Laporan:</p>
                  <p className="font-bold text-lg text-gray-900">
                    {formatDate(filters.tanggal_mulai)} - {formatDate(filters.tanggal_selesai)}
                  </p>
                </div>
              </div>
            </div>

            {/* For print only */}
            <div className="print-info" style={{ display: 'none' }}>
              <p><strong>Kode Barang:</strong> {selectedProduct.kode_barang}</p>
              <p><strong>Periode Laporan:</strong> {formatDate(filters.tanggal_mulai)} - {formatDateFull(filters.tanggal_selesai)}</p>
            </div>

            {/* Product Detail */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedProduct.nama_barang}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Kode Barang:</p>
                  <p className="font-semibold text-gray-900">{selectedProduct.kode_barang}</p>
                </div>
                <div>
                  <p className="text-gray-600">Jenis:</p>
                  <p className="font-semibold text-gray-900">{selectedProduct.jenis_barang || '-'}</p>
                </div>
                <div>
                  <p className="text-gray-600">Satuan:</p>
                  <p className="font-semibold text-gray-900">{selectedProduct.satuan}</p>
                </div>
                <div>
                  <p className="text-gray-600">Stok Saat Ini:</p>
                  <p className="font-semibold text-blue-600 text-lg">{selectedProduct.stok || 0}</p>
                </div>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="text-left py-3 px-4 border border-gray-300 text-sm font-bold">Tanggal</th>
                    <th className="text-left py-3 px-4 border border-gray-300 text-sm font-bold">Keterangan</th>
                    <th className="text-center py-3 px-4 border border-gray-300 text-sm font-bold">Masuk</th>
                    <th className="text-center py-3 px-4 border border-gray-300 text-sm font-bold">Keluar</th>
                    <th className="text-center py-3 px-4 border border-gray-300 text-sm font-bold">Sisa Stok</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Stok Awal */}
                  <tr className="bg-gray-100">
                    <td className="py-3 px-4 border border-gray-300 text-sm font-semibold" colSpan="4">
                      Stok Awal Periode
                    </td>
                    <td className="py-3 px-4 border border-gray-300 text-center text-sm font-bold text-blue-600">
                      {stokAwal}
                    </td>
                  </tr>

                  {/* Transactions */}
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center py-12 border border-gray-300">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <p className="mt-2 text-gray-600">Memuat data...</p>
                      </td>
                    </tr>
                  ) : transactions.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-12 text-gray-500 border border-gray-300">
                        <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg font-medium">Tidak ada transaksi dalam periode ini</p>
                      </td>
                    </tr>
                  ) : (
                    transactions.map((transaction, index) => (
                      <tr key={transaction.transaction_id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="py-2.5 px-4 text-sm text-gray-900 border border-gray-300">
                          {formatDate(transaction.created_at)}
                        </td>
                        <td className="py-2.5 px-4 text-sm text-gray-900 border border-gray-300">
                          {getKeterangan(transaction)}
                        </td>
                        <td className="py-2.5 px-4 text-center text-sm border border-gray-300">
                          {transaction.masuk > 0 ? (
                            <span className="font-semibold text-green-600">{transaction.masuk}</span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="py-2.5 px-4 text-center text-sm border border-gray-300">
                          {transaction.keluar > 0 ? (
                            <span className="font-semibold text-red-600">{transaction.keluar}</span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="py-2.5 px-4 text-center text-sm font-bold text-blue-600 border border-gray-300">
                          {transaction.sisa_stok}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {transactions.length > 0 && (
              <div className="mt-4 px-4 py-3 bg-gray-50 border-t border-gray-300 text-sm text-gray-700 rounded-b-lg">
                Menampilkan {transactions.length} transaksi dari {formatDate(filters.tanggal_mulai)} sampai {formatDate(filters.tanggal_selesai)}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default KartuStokAdmin;