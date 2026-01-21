import React, { useState, useEffect } from 'react';
import { Package, Archive, ShoppingCart, AlertTriangle, TrendingUp, ArrowUpCircle, ArrowDownCircle, BarChart3 } from 'lucide-react';
import { productapi } from '../../services/productapi';
import { stockapi } from '../../services/stockapi';

const DashboardPageAdmin = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalStockIn: 0,
    totalStockOut: 0,
    lowStockProducts: 0,
    totalModal: 0,
    totalPenjualan: 0,
    profit: 0
  });
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [period, setPeriod] = useState('all');
  const [filteredStats, setFilteredStats] = useState({
    totalIn: 0,
    totalOut: 0,
    transactionsIn: [],
    transactionsOut: []
  });
 
  useEffect(() => {
    fetchDashboardData();
  }, []);  
 
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      const [productsResponse, stockSummary, transactionsResponse] = await Promise.all([
        productapi.getAll({ per_page: 1000 }),
        stockapi.getSummary(),
        stockapi.getAll({ per_page: 1000 })
      ]);
 
      const productsData = productsResponse.data || productsResponse;
      const products = productsData.data || [];
      
      console.clear();
      console.log('%c=== DASHBOARD CALCULATION ===', 'color: blue; font-size: 16px; font-weight: bold');
      console.log('📦 Products:', products.length);
      
      const totalProducts = productsData.total || products.length;
      const lowStock = products.filter(p => p.stok_minimal && p.stok <= p.stok_minimal);
       
      const totalModal = products.reduce((sum, p) => {
        const modal = parseFloat(p.harga_modal) || 0;
        const stok = parseInt(p.stok) || 0;
        return sum + (modal * stok);
      }, 0);
       
      const allTransactions = transactionsResponse.data?.data || [];
      const outTransactions = allTransactions.filter(t => t.jenis_transaksi === 'OUT');
      
      console.log('📤 OUT Transactions:', outTransactions.length);
       
      let totalPenjualan = 0;
      let modalKeluar = 0;
      
      outTransactions.forEach((t, i) => {
        const product = products.find(p => p.product_id === t.product_id);
        
        if (product) {
          const hargaJual = parseFloat(product.harga_jual) || 0;
          const hargaModal = parseFloat(product.harga_modal) || 0;
          const jumlah = parseInt(t.jumlah) || 0;
          
          if (i === 0) {
            console.log('First match:', {
              product: product.nama_barang,
              harga_jual: hargaJual,
              harga_modal: hargaModal,
              jumlah: jumlah
            });
          }
          
          totalPenjualan += (hargaJual * jumlah);
          modalKeluar += (hargaModal * jumlah);
        }
      });
      
      const profit = totalPenjualan - modalKeluar;
      
      console.log('%c💰 RESULTS:', 'color: green; font-weight: bold');
      console.log('Modal Inventory:', totalModal);
      console.log('Total Penjualan:', totalPenjualan);
      console.log('Modal Keluar:', modalKeluar);
      console.log('PROFIT:', profit);
       
      setStats({
        totalProducts,
        totalStockIn: stockSummary.data?.total_in || 0,
        totalStockOut: stockSummary.data?.total_out || 0,
        lowStockProducts: lowStock.length,
        totalModal,
        totalPenjualan,
        profit
      });
      
      setLowStockItems(lowStock.slice(0, 5));
      setRecentTransactions(allTransactions);
      
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    const { start, end } = getDateRange(period);
    let filtered = recentTransactions;
    
    if (start && end) {
      filtered = recentTransactions.filter(t => {
        const transDate = new Date(t.created_at);
        return transDate >= start && transDate <= end;
      });
    }

    const transIn = filtered.filter(t => t.jenis_transaksi === 'IN');
    const transOut = filtered.filter(t => t.jenis_transaksi === 'OUT');

    setFilteredStats({
      totalIn: transIn.reduce((sum, t) => sum + t.jumlah, 0),
      totalOut: transOut.reduce((sum, t) => sum + t.jumlah, 0),
      transactionsIn: transIn,
      transactionsOut: transOut
    });
  }, [period, recentTransactions]);

  const getDateRange = (periodType) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    if (periodType === 'today') return { start: today, end: now };
    if (periodType === 'week') {
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      return { start: weekStart, end: now };
    }
    if (periodType === 'month') {
      return { start: new Date(now.getFullYear(), now.getMonth(), 1), end: now };
    }
    return { start: null, end: null };
  };

  const StatCard = ({ title, value, icon: Icon, iconColor, bgColor }) => (
    <div className={`${bgColor} rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1`}>
      <div className="flex items-center justify-between mb-3">
        <div className={`p-3 rounded-lg ${iconColor}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <h3 className="text-3xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-sm text-gray-600 font-medium">{title}</p>
    </div>
  );

  const PeriodButton = ({ label, value }) => (
    <button
      onClick={() => setPeriod(value)}
      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
        period === value ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );

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
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const getPeriodLabel = () => {
    const labels = { today: 'Harian', week: 'Mingguan', month: 'Bulanan' };
    return labels[period] || 'Semua Waktu';
  };
 
  const maxValue = Math.max(filteredStats.totalIn, filteredStats.totalOut, 1);
  const inPercent = (filteredStats.totalIn / maxValue) * 100;
  const outPercent = (filteredStats.totalOut / maxValue) * 100;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Selamat Datang di Dashboard Admin</h1>
            <p className="text-indigo-100">Pantau dan kelola inventory Anda secara real-time</p>
          </div>
          <TrendingUp className="w-16 h-16 opacity-20" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Jenis Produk" value={stats.totalProducts} icon={Package} iconColor="bg-indigo-600" bgColor="bg-white" />
        <StatCard title="Total Barang Masuk" value={stats.totalStockIn} icon={Archive} iconColor="bg-blue-500" bgColor="bg-white" />
        <StatCard title="Total Barang Keluar" value={stats.totalStockOut} icon={ShoppingCart} iconColor="bg-green-500" bgColor="bg-white" />
        <StatCard title="Stok Menipis" value={stats.lowStockProducts} icon={AlertTriangle} iconColor="bg-red-500" bgColor="bg-white" />
      </div>

      {/* Profit Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Analisis Profit</h3>
              <p className="text-sm text-gray-500">Ringkasan modal, penjualan, dan keuntungan</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <div className="p-3 bg-blue-500 rounded-xl shadow-lg w-fit mb-3">
                <Package className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-blue-600 font-medium mb-1">Total Modal Inventory</p>
              <p className="text-2xl font-bold text-blue-900">{formatCurrency(stats.totalModal)}</p>
              <p className="text-xs text-blue-500 mt-1">Nilai semua produk di gudang</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
              <div className="p-3 bg-purple-500 rounded-xl shadow-lg w-fit mb-3">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-purple-600 font-medium mb-1">Total Penjualan</p>
              <p className="text-2xl font-bold text-purple-900">{formatCurrency(stats.totalPenjualan)}</p>
              <p className="text-xs text-purple-500 mt-1">Dari {stats.totalStockOut} unit terjual</p>
            </div>

            <div className={`bg-gradient-to-br rounded-xl p-6 border ${
              stats.profit >= 0 ? 'from-green-50 to-green-100 border-green-200' : 'from-red-50 to-red-100 border-red-200'
            }`}>
              <div className={`p-3 rounded-xl shadow-lg w-fit mb-3 ${stats.profit >= 0 ? 'bg-green-500' : 'bg-red-500'}`}>
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <p className={`text-sm font-medium mb-1 ${stats.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>Profit Bersih</p>
              <p className={`text-2xl font-bold ${stats.profit >= 0 ? 'text-green-900' : 'text-red-900'}`}>{formatCurrency(stats.profit)}</p>
              <p className={`text-xs mt-1 ${stats.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {stats.profit >= 0 ? 'Keuntungan' : 'Kerugian'} dari penjualan
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">💰 Penjualan (Revenue)</span>
                <span className="font-semibold text-gray-900">{formatCurrency(stats.totalPenjualan)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">📦 Modal Produk Terjual (COGS)</span>
                <span className="font-semibold text-gray-900">- {formatCurrency(stats.totalPenjualan - stats.profit)}</span>
              </div>
              <div className="border-t border-gray-300 pt-3 flex items-center justify-between">
                <span className="text-base font-bold text-gray-900">📈 Profit Margin</span>
                <div className="text-right">
                  <span className={`text-lg font-bold ${stats.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(stats.profit)}
                  </span>
                  {stats.totalPenjualan > 0 && (
                    <p className="text-xs text-gray-500">
                      ({((stats.profit / stats.totalPenjualan) * 100).toFixed(1)}% margin)
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stock Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Ringkasan Stok</h3>
                <p className="text-sm text-gray-500">Perbandingan barang masuk & keluar</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <PeriodButton label="Harian" value="today" />
              <PeriodButton label="Mingguan" value="week" />
              <PeriodButton label="Bulanan" value="month" />
              <PeriodButton label="Semua" value="all" />
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
                    <ArrowUpCircle className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Barang Masuk</p>
                    <p className="text-xs text-blue-500">{getPeriodLabel()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-blue-700">{filteredStats.totalIn}</p>
                  <p className="text-sm text-blue-500">{filteredStats.transactionsIn.length} transaksi</p>
                </div>
              </div>
              <div className="h-3 bg-blue-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${inPercent}%` }} />
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-red-500 rounded-xl shadow-lg">
                    <ArrowDownCircle className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-red-600 font-medium">Barang Keluar</p>
                    <p className="text-xs text-red-500">{getPeriodLabel()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-red-700">{filteredStats.totalOut}</p>
                  <p className="text-sm text-red-500">{filteredStats.transactionsOut.length} transaksi</p>
                </div>
              </div>
              <div className="h-3 bg-red-200 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full transition-all duration-500" style={{ width: `${outPercent}%` }} />
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp className={`w-6 h-6 ${filteredStats.totalIn - filteredStats.totalOut >= 0 ? 'text-green-500' : 'text-red-500'}`} />
              <span className="text-gray-600 font-medium">Perubahan Stok Bersih ({getPeriodLabel()})</span>
            </div>
            <span className={`text-2xl font-bold ${filteredStats.totalIn - filteredStats.totalOut >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {filteredStats.totalIn - filteredStats.totalOut >= 0 ? '+' : ''}{filteredStats.totalIn - filteredStats.totalOut}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">Transaksi Terbaru</h3>
            <p className="text-sm text-gray-500 mt-1">10 transaksi terakhir</p>
          </div>
          <div className="p-6 max-h-96 overflow-y-auto">
            {recentTransactions.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">Belum ada transaksi</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentTransactions.slice(0, 10).map((transaction, index) => (
                  <div key={transaction.transaction_id || index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${transaction.jenis_transaksi === 'IN' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'}`}>
                        {transaction.jenis_transaksi === 'IN' ? <Archive className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{transaction.product?.nama_barang || 'Produk'}</p>
                        <p className="text-xs text-gray-500">{formatDate(transaction.created_at)}</p>
                      </div>
                    </div>
                    <span className={`font-bold text-sm ${transaction.jenis_transaksi === 'IN' ? 'text-blue-600' : 'text-red-600'}`}>
                      {transaction.jenis_transaksi === 'IN' ? '+' : '-'}{transaction.jumlah}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <div>
              <h3 className="text-lg font-bold text-gray-900">Peringatan Stok Menipis</h3>
              <p className="text-sm text-gray-500">Produk yang perlu direstock</p>
            </div>
          </div>
          <div className="p-6 max-h-96 overflow-y-auto">
            {lowStockItems.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 font-medium">Semua stok aman</p>
                <p className="text-sm text-gray-400">Tidak ada produk dengan stok menipis</p>
              </div>
            ) : (
              <div className="space-y-3">
                {lowStockItems.map((item) => (
                  <div key={item.product_id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-100 hover:bg-red-100 transition-colors">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{item.nama_barang}</p>
                      <p className="text-xs text-gray-600">{item.kode_barang}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Stok: <span className="font-bold text-red-600">{item.stok}</span></p>
                      <p className="text-xs text-gray-500">Min: {item.stok_minimal}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPageAdmin;