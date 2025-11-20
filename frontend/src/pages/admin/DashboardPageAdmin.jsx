import React, { useState, useEffect } from 'react';
import { Package, Archive, ShoppingCart, AlertTriangle, TrendingUp } from 'lucide-react';
import { productapi } from '../../services/productapi';
import { stockapi } from '../../services/stockapi';

const DashboardPageAdmin = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalStockIn: 0,
    totalStockOut: 0,
    lowStockProducts: 0
  });
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch products
      const productsResponse = await productapi.getAll();
      const products = productsResponse.data.data || [];
      
      // Fetch stock summary
      const stockSummary = await stockapi.getSummary();
      
      // Calculate stats
      const lowStock = products.filter(p => 
        p.stok_minimal && p.stok <= p.stok_minimal
      );
      
      setStats({
        totalProducts: products.length,
        totalStockIn: stockSummary.data?.total_in || 0,
        totalStockOut: stockSummary.data?.total_out || 0,
        lowStockProducts: lowStock.length
      });
      
      setLowStockItems(lowStock.slice(0, 5));
      
      // Fetch recent transactions
      const transactionsResponse = await stockapi.getAll();
      setRecentTransactions(transactionsResponse.data?.data?.slice(0, 10) || []);
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, iconColor }) => (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-3 rounded-lg ${iconColor}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <h3 className="text-3xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-sm text-gray-600 font-medium">{title}</p>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Selamat Datang di Dashboard Admin</h1>
            <p className="text-indigo-100">Pantau dan kelola inventory Anda secara real-time</p>
          </div>
          <TrendingUp className="w-16 h-16 opacity-20" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Produk"
          value={stats.totalProducts}
          icon={Package}
          iconColor="bg-indigo-600"
        />
        <StatCard
          title="Barang Masuk"
          value={stats.totalStockIn}
          icon={Archive}
          iconColor="bg-blue-500"
        />
        <StatCard
          title="Barang Keluar"
          value={stats.totalStockOut}
          icon={ShoppingCart}
          iconColor="bg-green-500"
        />
        <StatCard
          title="Stok Menipis"
          value={stats.lowStockProducts}
          icon={AlertTriangle}
          iconColor="bg-red-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">Transaksi Terbaru</h3>
            <p className="text-sm text-gray-500 mt-1">10 transaksi terakhir</p>
          </div>
          <div className="p-6">
            {recentTransactions.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">Belum ada transaksi</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentTransactions.map((transaction, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        transaction.type === 'in' 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {transaction.type === 'in' ? 
                          <Archive className="w-5 h-5" /> : 
                          <ShoppingCart className="w-5 h-5" />
                        }
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">
                          {transaction.product_name || 'Produk Tidak Diketahui'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(transaction.created_at).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                    </div>
                    <span className={`font-bold text-sm ${
                      transaction.type === 'in' ? 'text-blue-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'in' ? '+' : '-'}{transaction.quantity}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <div>
              <h3 className="text-lg font-bold text-gray-900">Peringatan Stok Menipis</h3>
              <p className="text-sm text-gray-500">Produk yang perlu direstock</p>
            </div>
          </div>
          <div className="p-6">
            {lowStockItems.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 font-medium">Semua stok aman</p>
                <p className="text-sm text-gray-400">Tidak ada produk dengan stok menipis</p>
              </div>
            ) : (
              <div className="space-y-3">
                {lowStockItems.map((item) => (
                  <div 
                    key={item.product_id} 
                    className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-100 hover:bg-red-100 transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{item.nama_barang}</p>
                      <p className="text-xs text-gray-600">{item.kode_barang}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        Stok: <span className="font-bold text-red-600">{item.stok}</span>
                      </p>
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