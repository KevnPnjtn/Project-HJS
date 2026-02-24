import React, { useState, useEffect } from 'react';
import { TrendingUp, Calendar, Package, Download, Filter, X, Search } from 'lucide-react';
import { productapi } from '../../services/productapi';
import { stockapi } from '../../services/stockapi';
import * as XLSX from 'xlsx';

const LaporanProfitAdmin = () => {
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [filters, setFilters] = useState({
    productId: '',
    startDate: '',
    endDate: '',
    searchQuery: ''
  });

  const [summary, setSummary] = useState({
    totalModal: 0,
    totalPenjualan: 0,
    totalProfit: 0,
    totalQty: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, transactions, products]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const [productsResponse, transactionsResponse] = await Promise.all([
        productapi.getAll({ per_page: 1000 }),
        stockapi.getAll({ per_page: 1000 })
      ]);
 
      let productsData = [];
      if (productsResponse?.data?.data && Array.isArray(productsResponse.data.data)) {
        productsData = productsResponse.data.data;
      } else if (productsResponse?.data && Array.isArray(productsResponse.data)) {
        productsData = productsResponse.data;
      }
 
      const transactionsData = transactionsResponse.data?.data || [];
      
      setProducts(productsData);
      setTransactions(transactionsData);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = transactions.filter(t => t.jenis_transaksi === 'OUT');
 
    if (filters.productId) {
      filtered = filtered.filter(t => String(t.product_id) === String(filters.productId));
    }
 
    if (filters.startDate) {
      filtered = filtered.filter(t => {
        const transDate = new Date(t.created_at);
        const startDate = new Date(filters.startDate);
        return transDate >= startDate;
      });
    }

    if (filters.endDate) {
      filtered = filtered.filter(t => {
        const transDate = new Date(t.created_at);
        const endDate = new Date(filters.endDate);
        endDate.setHours(23, 59, 59);
        return transDate <= endDate;
      });
    }
 
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(t => {
        const product = products.find(p => String(p.product_id) === String(t.product_id));
        return (
          product?.nama_barang?.toLowerCase().includes(query) ||
          product?.kode_barang?.toLowerCase().includes(query)
        );
      });
    }
 
    const enrichedData = filtered.map(t => {
      const product = products.find(p => String(p.product_id) === String(t.product_id));
      
      if (!product) return null;

      const hargaModal = parseFloat(product.harga_modal) || 0;
      const hargaJual = parseFloat(product.harga_jual) || 0;
      const jumlah = parseInt(t.jumlah) || 0;
      
      const totalModal = hargaModal * jumlah;
      const totalPenjualan = hargaJual * jumlah;
      const profit = totalPenjualan - totalModal;

      return {
        ...t,
        product,
        hargaModal,
        hargaJual,
        totalModal,
        totalPenjualan,
        profit
      };
    }).filter(Boolean);
 
    const newSummary = enrichedData.reduce((acc, item) => ({
      totalModal: acc.totalModal + item.totalModal,
      totalPenjualan: acc.totalPenjualan + item.totalPenjualan,
      totalProfit: acc.totalProfit + item.profit,
      totalQty: acc.totalQty + parseInt(item.jumlah)
    }), {
      totalModal: 0,
      totalPenjualan: 0,
      totalProfit: 0,
      totalQty: 0
    });

    setFilteredData(enrichedData);
    setSummary(newSummary);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      productId: '',
      startDate: '',
      endDate: '',
      searchQuery: ''
    });
  };

  const exportToExcel = () => {
    try {
      const exportData = filteredData.map((item, index) => ({
        'No': index + 1,
        'Tanggal': formatDateForExport(item.created_at),
        'Kode Barang': item.product.kode_barang || '-',
        'Nama Barang': item.product.nama_barang || '-',
        'Qty': item.jumlah,
        'Harga Modal': item.hargaModal,
        'Harga Jual': item.hargaJual,
        'HPP': item.totalModal,
        'Omset': item.totalPenjualan,
        'Laba': item.profit
      }));
 
      exportData.push({
        'No': '',
        'Tanggal': '',
        'Kode Barang': '',
        'Nama Barang': 'TOTAL',
        'Qty': summary.totalQty,
        'Harga Modal': '',
        'Harga Jual': '',
        'Total Modal': summary.totalModal,
        'Total Penjualan': summary.totalPenjualan,
        'Profit': summary.totalProfit
      });

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(exportData);
 
      ws['!cols'] = [
        { wch: 5 },
        { wch: 18 },
        { wch: 15 },
        { wch: 30 },
        { wch: 8 },
        { wch: 15 },
        { wch: 15 },
        { wch: 18 },
        { wch: 18 },
        { wch: 18 }
      ];

      const range = XLSX.utils.decode_range(ws['!ref']);
      for (let R = range.s.r; R <= range.e.r; ++R) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
          if (!ws[cellAddress]) continue;
          
          if (R === 0) {
            ws[cellAddress].s = {
              font: { bold: true, color: { rgb: "FFFFFF" } },
              fill: { fgColor: { rgb: "16A34A" } },
              alignment: { horizontal: "center", vertical: "center" },
              border: {
                top: { style: "thin", color: { rgb: "000000" } },
                bottom: { style: "thin", color: { rgb: "000000" } },
                left: { style: "thin", color: { rgb: "000000" } },
                right: { style: "thin", color: { rgb: "000000" } }
              }
            };
          }
          else if (R === range.e.r) {
            ws[cellAddress].s = {
              font: { bold: true },
              fill: { fgColor: { rgb: "F3F4F6" } },
              alignment: { 
                horizontal: C === 0 || C === 4 ? "center" : (C >= 5 ? "right" : "left"), 
                vertical: "center" 
              },
              border: {
                top: { style: "thin", color: { rgb: "000000" } },
                bottom: { style: "thin", color: { rgb: "000000" } },
                left: { style: "thin", color: { rgb: "000000" } },
                right: { style: "thin", color: { rgb: "000000" } }
              }
            };
          }
          else {
            ws[cellAddress].s = {
              alignment: { 
                horizontal: C === 0 || C === 4 ? "center" : (C >= 5 ? "right" : "left"), 
                vertical: "center" 
              },
              border: {
                top: { style: "thin", color: { rgb: "E5E7EB" } },
                bottom: { style: "thin", color: { rgb: "E5E7EB" } },
                left: { style: "thin", color: { rgb: "E5E7EB" } },
                right: { style: "thin", color: { rgb: "E5E7EB" } }
              },
              fill: { fgColor: { rgb: R % 2 === 0 ? "FFFFFF" : "F9FAFB" } }
            };
          }

          if (C >= 5 && C <= 9 && R > 0) {
            ws[cellAddress].z = '#,##0';
          }
        }
      }

      XLSX.utils.book_append_sheet(wb, ws, "Laporan Laba Rugi");
      
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      XLSX.writeFile(wb, `Laporan_Laba_Rugi_${timestamp}.xlsx`);

    } catch (error) {
      console.error('Error exporting:', error);
      alert('Gagal export data');
    }
  };

  const formatCurrency = (amount) => {
    if (!amount || isNaN(amount)) return 'Rp0';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDateForExport = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600"></div>
      </div>
    );
  }

  const profitMargin = summary.totalPenjualan > 0 
    ? ((summary.totalProfit / summary.totalPenjualan) * 100).toFixed(1)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">Laporan Laba Rugi</h1>
          <p className="text-green-100">Analisis detail omset, HPP, dan laba per transaksi</p>
        </div>
        <TrendingUp className="w-16 h-16 opacity-20" />
      </div>
    </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Card 1: HPP */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Package className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-sm text-gray-500 font-medium">HPP (Harga Pokok)</p>
        </div>
        <p className="text-2xl font-bold text-gray-900">{formatCurrency(summary.totalModal)}</p>
        <p className="text-xs text-gray-400 mt-1">Dari {summary.totalQty} unit</p>
      </div>

      {/* Card 2: Omset */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-purple-50 rounded-lg">
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-sm text-gray-500 font-medium">Total Omset</p>
        </div>
        <p className="text-2xl font-bold text-gray-900">{formatCurrency(summary.totalPenjualan)}</p>
        <p className="text-xs text-gray-400 mt-1">Pendapatan kotor</p>
      </div>

      {/* Card 3: Laba Bersih */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-2 rounded-lg ${summary.totalProfit >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
            <TrendingUp className={`w-5 h-5 ${summary.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`} />
          </div>
          <p className="text-sm text-gray-500 font-medium">Laba Bersih</p>
        </div>
        <p className={`text-2xl font-bold ${summary.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {formatCurrency(summary.totalProfit)}
        </p>
        <p className="text-xs text-gray-400 mt-1">{profitMargin}% margin</p>
      </div>

      {/* Card 4: Total Transaksi */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <Calendar className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-sm text-gray-500 font-medium">Total Transaksi</p>
        </div>
        <p className="text-2xl font-bold text-gray-900">{filteredData.length}</p>
        <p className="text-xs text-gray-400 mt-1">Transaksi penjualan</p>
      </div>
    </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-bold text-gray-900">Filter Laporan</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cari Produk
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Nama/Kode barang..."
                value={filters.searchQuery}
                onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Product Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pilih Produk
            </label>
            <select
              value={filters.productId}
              onChange={(e) => handleFilterChange('productId', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Semua Produk</option>
              {products.map(product => (
                <option key={product.product_id} value={product.product_id}>
                  {product.kode_barang} - {product.nama_barang}
                </option>
              ))}
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Mulai
            </label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Akhir
            </label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={resetFilters}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            <X className="w-4 h-4" />
            Reset Filter
          </button>
          
          <button
            onClick={exportToExcel}
            disabled={filteredData.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            <Download className="w-4 h-4" />
            Export
          </button>

          {filteredData.length > 0 && (
            <span className="text-sm text-gray-500 ml-2">
              {filteredData.length} transaksi siap di-export
            </span>
          )}
        </div>
      </div>

      {/* Table */}
<div className="bg-white rounded-xl shadow-sm border border-gray-200">
  <div className="px-6 py-4 border-b border-gray-200">
    <h3 className="text-lg font-bold text-gray-900">Detail Transaksi Penjualan</h3>
    <p className="text-sm text-gray-500 mt-1">
      Menampilkan {filteredData.length} transaksi
    </p>
  </div>

  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-green-600 text-white">
        <tr>
          <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
            Tanggal
          </th>
          <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
            Kode
          </th>
          <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
            Nama Barang
          </th>
          <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
            Qty
          </th>
          <th className="px-4 py-4 text-right text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
            Harga Modal
          </th>
          <th className="px-4 py-4 text-right text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
            Harga Jual
          </th>
          <th className="px-4 py-4 text-right text-xs font-semibold uppercase tracking-wider whitespace-nowrap bg-blue-700">
            HPP
          </th>
          <th className="px-4 py-4 text-right text-xs font-semibold uppercase tracking-wider whitespace-nowrap bg-purple-700">
            Omset
          </th>
          <th className="px-4 py-4 text-right text-xs font-semibold uppercase tracking-wider whitespace-nowrap bg-green-700">
            Laba
          </th>
        </tr>
      </thead>
      
      <tbody className="divide-y divide-gray-200">
        {filteredData.length === 0 ? (
          <tr>
            <td colSpan="9" className="px-6 py-12 text-center text-gray-500">
              <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">Tidak ada transaksi penjualan</p>
              {filters.productId ? (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    Produk "{products.find(p => String(p.product_id) === String(filters.productId))?.nama_barang}" 
                    belum memiliki transaksi penjualan
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Coba pilih produk lain atau ubah filter tanggal</p>
                </div>
              ) : (
                <p className="text-sm text-gray-400 mt-1">Silakan ubah filter atau coba periode lain</p>
              )}
            </td>
          </tr>
        ) : (
          filteredData.map((item, index) => (
            <tr 
              key={item.transaction_id || index} 
              className="hover:bg-gray-50 transition-colors"
            >
              {/* Tanggal */}
              <td className="px-4 py-3.5 text-sm text-gray-900 whitespace-nowrap">
                {formatDate(item.created_at)}
              </td>
              
              {/* Kode */}
              <td className="px-4 py-3.5 text-sm font-medium text-gray-900 whitespace-nowrap">
                {item.product.kode_barang}
              </td>
              
              {/* Nama Barang */}
              <td className="px-4 py-3.5 text-sm text-gray-900">
                <div className="max-w-[200px] truncate" title={item.product.nama_barang}>
                  {item.product.nama_barang}
                </div>
              </td>
              
              {/* Qty */}
              <td className="px-4 py-3.5 text-sm text-center font-semibold text-gray-900 whitespace-nowrap">
                {item.jumlah}
              </td>
              
              {/* Harga Modal */}
              <td className="px-4 py-3.5 text-sm text-right text-gray-600 whitespace-nowrap">
                {formatCurrency(item.hargaModal)}
              </td>
              
              {/* Harga Jual */}
              <td className="px-4 py-3.5 text-sm text-right text-gray-600 whitespace-nowrap">
                {formatCurrency(item.hargaJual)}
              </td>
              
              {/* HPP */}
              <td className="px-4 py-3.5 text-sm text-right font-semibold text-blue-700 whitespace-nowrap bg-blue-50">
                {formatCurrency(item.totalModal)}
              </td>
              
              {/* Omset */}
              <td className="px-4 py-3.5 text-sm text-right font-semibold text-purple-700 whitespace-nowrap bg-purple-50">
                {formatCurrency(item.totalPenjualan)}
              </td>
              
              {/* Laba */}
              <td className={`px-4 py-3.5 text-sm text-right font-bold whitespace-nowrap ${
                item.profit >= 0 ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'
              }`}>
                {formatCurrency(item.profit)}
              </td>
            </tr>
          ))
        )}
      </tbody>
      
      {/* Footer */}
      {filteredData.length > 0 && (
        <tfoot className="bg-gray-100 border-t-2 border-gray-400">
          <tr className="font-bold">
            <td colSpan="3" className="px-4 py-4 text-sm text-gray-900">
              <div className="flex items-center gap-2">
                <span className="text-base">TOTAL</span>
              </div>
            </td>
            <td className="px-4 py-4 text-sm text-center text-gray-900 bg-gray-200">
              <span className="text-base">{summary.totalQty}</span>
            </td>
            <td colSpan="2" className="px-4 py-4"></td>
            <td className="px-4 py-4 text-sm text-right text-blue-700 bg-blue-100">
              <span className="text-base">{formatCurrency(summary.totalModal)}</span>
            </td>
            <td className="px-4 py-4 text-sm text-right text-purple-700 bg-purple-100">
              <span className="text-base">{formatCurrency(summary.totalPenjualan)}</span>
            </td>
            <td className={`px-4 py-4 text-sm text-right ${
              summary.totalProfit >= 0 ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
            }`}>
              <span className="text-base">{formatCurrency(summary.totalProfit)}</span>
            </td>
          </tr>
        </tfoot>
      )}
    </table>
  </div>
</div>
    </div>
  );
};

export default LaporanProfitAdmin;