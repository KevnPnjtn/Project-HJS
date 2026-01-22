import React, { useState, useEffect } from 'react';
import { TrendingUp, Calendar, Package, Download, Filter, X, Search } from 'lucide-react';
import { productapi } from '../../services/productapi';
import { stockapi } from '../../services/stockapi';

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
  }, [filters, transactions]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const [productsResponse, transactionsResponse] = await Promise.all([
        productapi.getAll({ per_page: 1000 }),
        stockapi.getAll({ per_page: 1000 })
      ]);

      const productsData = productsResponse.data?.data || [];
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

    // Filter by product
    if (filters.productId) {
      filtered = filtered.filter(t => t.product_id === filters.productId);
    }

    // Filter by date range
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

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(t => {
        const product = products.find(p => p.product_id === t.product_id);
        return (
          product?.nama_barang?.toLowerCase().includes(query) ||
          product?.kode_barang?.toLowerCase().includes(query)
        );
      });
    }

    // Calculate profit for each transaction
    const enrichedData = filtered.map(t => {
      const product = products.find(p => p.product_id === t.product_id);
      
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

    // Calculate summary
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

  const exportToCSV = () => {
    const headers = ['Tanggal', 'Kode Barang', 'Nama Barang', 'Qty', 'Harga Modal', 'Harga Jual', 'Total Modal', 'Total Penjualan', 'Profit'];
    
    const rows = filteredData.map(item => [
      formatDate(item.created_at),
      item.product.kode_barang,
      item.product.nama_barang,
      item.jumlah,
      item.hargaModal,
      item.hargaJual,
      item.totalModal,
      item.totalPenjualan,
      item.profit
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `laporan-profit-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
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
            <h1 className="text-2xl font-bold mb-2">Laporan Profit</h1>
            <p className="text-green-100">Analisis detail profit per transaksi penjualan</p>
          </div>
          <TrendingUp className="w-16 h-16 opacity-20" />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-sm text-gray-500 font-medium">Total Modal</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(summary.totalModal)}</p>
          <p className="text-xs text-gray-400 mt-1">{summary.totalQty} unit terjual</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-sm text-gray-500 font-medium">Total Penjualan</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(summary.totalPenjualan)}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-lg ${summary.totalProfit >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
              <TrendingUp className={`w-5 h-5 ${summary.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`} />
            </div>
            <p className="text-sm text-gray-500 font-medium">Total Profit</p>
          </div>
          <p className={`text-2xl font-bold ${summary.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(summary.totalProfit)}
          </p>
          <p className="text-xs text-gray-400 mt-1">{profitMargin}% margin</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Calendar className="w-5 h-5 text-indigo-600" />
            </div>
            <p className="text-sm text-gray-500 font-medium">Transaksi</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{filteredData.length}</p>
          <p className="text-xs text-gray-400 mt-1">Total penjualan</p>
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
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={resetFilters}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
            Reset Filter
          </button>
          
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
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
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kode</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Barang</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Qty</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Harga Modal</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Harga Jual</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total Modal</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total Penjualan</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Profit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-6 py-12 text-center text-gray-500">
                    Tidak ada data transaksi
                  </td>
                </tr>
              ) : (
                filteredData.map((item, index) => (
                  <tr key={item.transaction_id || index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {formatDate(item.created_at)}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {item.product.kode_barang}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {item.product.nama_barang}
                    </td>
                    <td className="px-6 py-4 text-sm text-right text-gray-900">
                      {item.jumlah}
                    </td>
                    <td className="px-6 py-4 text-sm text-right text-gray-600">
                      {formatCurrency(item.hargaModal)}
                    </td>
                    <td className="px-6 py-4 text-sm text-right text-gray-600">
                      {formatCurrency(item.hargaJual)}
                    </td>
                    <td className="px-6 py-4 text-sm text-right font-medium text-blue-600">
                      {formatCurrency(item.totalModal)}
                    </td>
                    <td className="px-6 py-4 text-sm text-right font-medium text-purple-600">
                      {formatCurrency(item.totalPenjualan)}
                    </td>
                    <td className={`px-6 py-4 text-sm text-right font-bold ${
                      item.profit >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatCurrency(item.profit)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            {filteredData.length > 0 && (
              <tfoot className="bg-gray-50 font-bold">
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-sm text-gray-900">
                    TOTAL
                  </td>
                  <td className="px-6 py-4 text-sm text-right text-gray-900">
                    {summary.totalQty}
                  </td>
                  <td colSpan="2"></td>
                  <td className="px-6 py-4 text-sm text-right text-blue-600">
                    {formatCurrency(summary.totalModal)}
                  </td>
                  <td className="px-6 py-4 text-sm text-right text-purple-600">
                    {formatCurrency(summary.totalPenjualan)}
                  </td>
                  <td className={`px-6 py-4 text-sm text-right ${
                    summary.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatCurrency(summary.totalProfit)}
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