import React, { useState, useEffect, useCallback } from 'react';
import {
  Package, Archive, ShoppingCart, AlertTriangle,
  TrendingUp, ArrowUpCircle, ArrowDownCircle,
  BarChart3, Boxes, TrendingDown
} from 'lucide-react';
import { productapi } from '../../services/productapi';
import { stockapi } from '../../services/stockapi';


const PERIOD_LABELS = {
  today: 'Harian',
  week:  'Mingguan',
  month: 'Bulanan',
  year:  'Tahunan',
  all:   'Semua',
};

const formatCurrency = (amount) => {
  if (!amount || isNaN(amount)) return 'Rp0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString('id-ID', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

// ─── Sub-components ──────────────────────────────────────────

const StatCard = ({ title, value, IconComponent, iconColor, bgColor }) => (
  <div className={`${bgColor} rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1`}>
    <div className="flex items-center justify-between mb-3">
      <div className={`p-3 rounded-lg ${iconColor}`}>
        <IconComponent className="w-6 h-6 text-white" />
      </div>
    </div>
    <h3 className="text-3xl font-bold text-gray-900 mb-1">{value}</h3>
    <p className="text-sm text-gray-600 font-medium">{title}</p>
  </div>
);

const PeriodSelector = ({ value, onChange, options, activeClass = 'bg-indigo-600' }) => (
  <div className="flex items-center gap-2 flex-wrap">
    {options.map((opt) => (
      <button
        key={opt.value}
        onClick={() => onChange(opt.value)}
        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
          value === opt.value
            ? `${activeClass} text-white shadow-md`
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        {opt.label}
      </button>
    ))}
  </div>
);

// ─── Main Component ───────────────────────────────────────────

const DashboardPageAdmin = () => {
  const [loading, setLoading]   = useState(true);
  const [stats, setStats]       = useState({
    totalProducts: 0,
    totalStockIn: 0,
    totalStockOut: 0,
    lowStockProducts: 0,
  });
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [lowStockItems, setLowStockItems]           = useState([]);

  // ── Finance state ──
  const [financePeriod, setFinancePeriod] = useState('month');
  const [financeStats, setFinanceStats]   = useState({
    totalModal: 0, totalPenjualan: 0, totalProfit: 0, nilaiInventory: 0,
  });
  const [financeLoading, setFinanceLoading] = useState(false);

  // ── Stock summary state ──
  const [stockPeriod, setStockPeriod]   = useState('all');
  const [stockSummary, setStockSummary] = useState({ totalIn: 0, totalOut: 0 });
  const [stockLoading, setStockLoading] = useState(false);

  // ─────────────────────────────────────────────────────────
  // FETCH 1: Dashboard data — 4 ringan, paralel
  // ─────────────────────────────────────────────────────────
  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const [summaryRes, lowStockRes, recentRes, countRes] = await Promise.all([
        stockapi.getSummary(),
        productapi.getAll({ stok_minimal: true, per_page: 100 }),
        stockapi.getAll({ per_page: 10 }),
        productapi.getAll({ per_page: 1 }),
      ]);

      const summary      = summaryRes.data;
      const lowStockData = lowStockRes.data || lowStockRes;
      const lowStockList = lowStockData.data || [];
      const recentData   = recentRes.data?.data || [];
      const countData    = countRes.data || countRes;

      setStats({
        totalProducts:    countData.total || 0,
        totalStockIn:     summary?.total_in  || 0,
        totalStockOut:    summary?.total_out || 0,
        lowStockProducts: lowStockData.total || lowStockList.length,
      });
      setRecentTransactions(recentData);
      setLowStockItems(lowStockList.slice(0, 5));
      setStockSummary({
        totalIn:  summary?.total_in  || 0,
        totalOut: summary?.total_out || 0,
      });
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // ─────────────────────────────────────────────────────────
  // FETCH 2: Finance summary — agregasi di backend (1 request, ~1 kB)
  // ─────────────────────────────────────────────────────────
  const fetchFinanceData = useCallback(async (period) => {
    try {
      setFinanceLoading(true);
      const { startDate, endDate } = getPeriodDates(period);
      const res = await stockapi.getFinanceSummary({
        period,
        ...(startDate && { start_date: startDate }),
        ...(endDate   && { end_date:   endDate   }),
      });
      const d = res.data;
      setFinanceStats({
        totalModal:     d.total_modal     || 0,
        totalPenjualan: d.total_penjualan || 0,
        totalProfit:    d.total_profit    || 0,
        nilaiInventory: d.nilai_inventory || 0,
      });
    } catch (err) {
      console.error('fetchFinanceData error:', err);
    } finally {
      setFinanceLoading(false);
    }
  }, []);



  // ─────────────────────────────────────────────────────────
  // FETCH 3: Stock period summary — pakai getSummary dengan date params
  // ─────────────────────────────────────────────────────────
  const fetchStockPeriodSummary = useCallback(async (period) => {
    if (period === 'all') {
      // Sudah ada dari fetchDashboardData, tidak perlu request baru
      setStockSummary({
        totalIn:  stats.totalStockIn,
        totalOut: stats.totalStockOut,
      });
      return;
    }
    try {
      setStockLoading(true);
      const { startDate, endDate } = getPeriodDates(period);
      const res = await stockapi.getSummary({
        start_date: startDate,
        end_date:   endDate,
      });
      const d = res.data;
      setStockSummary({ totalIn: d?.total_in || 0, totalOut: d?.total_out || 0 });
    } catch (err) {
      console.error('Stock period error:', err);
    } finally {
      setStockLoading(false);
    }
  }, [stats.totalStockIn, stats.totalStockOut]);

  // ─────────────────────────────────────────────────────────
  // Effects
  // ─────────────────────────────────────────────────────────
  useEffect(() => {
    Promise.all([fetchDashboardData(), fetchFinanceData('month')]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFinancePeriodChange = (period) => {
    setFinancePeriod(period);
    fetchFinanceData(period);
  };

  const handleStockPeriodChange = (period) => {
    setStockPeriod(period);
    fetchStockPeriodSummary(period);
  };

  // ─────────────────────────────────────────────────────────
  // Helpers
  // ─────────────────────────────────────────────────────────
  const getPeriodDates = (period) => {
    const now   = new Date();
    const pad   = (n) => String(n).padStart(2, '0');
    const fmt   = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (period === 'today') return { startDate: fmt(today), endDate: fmt(now) };
    if (period === 'week') {
      const ws = new Date(today);
      ws.setDate(today.getDate() - today.getDay());
      return { startDate: fmt(ws), endDate: fmt(now) };
    }
    if (period === 'month')
      return { startDate: fmt(new Date(now.getFullYear(), now.getMonth(), 1)), endDate: fmt(now) };
    if (period === 'year')
      return { startDate: `${now.getFullYear()}-01-01`, endDate: `${now.getFullYear()}-12-31` };
    return { startDate: null, endDate: null };
  };

  const totalStokTersedia = stats.totalStockIn - stats.totalStockOut;
  const maxStock  = Math.max(stockSummary.totalIn, stockSummary.totalOut, 1);
  const inPercent  = (stockSummary.totalIn  / maxStock) * 100;
  const outPercent = (stockSummary.totalOut / maxStock) * 100;

  const stockPeriodOptions  = ['today','week','month','all'].map(v => ({ value: v, label: PERIOD_LABELS[v] }));
  const financePeriodOptions = ['today','week','month','year','all'].map(v => ({ value: v, label: PERIOD_LABELS[v] }));

  // ─────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Selamat Datang di Dashboard Admin</h1>
            <p className="text-indigo-100">Pantau dan kelola inventory Anda secara real-time</p>
          </div>
          <TrendingUp className="w-16 h-16 opacity-20" />
        </div>
      </div>

      {/* Total Stok Tersedia */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 rounded-lg">
              <Boxes className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">Total Stok Tersedia</p>
              <h2 className="text-3xl font-bold text-gray-900">{totalStokTersedia.toLocaleString('id-ID')}</h2>
              <p className="text-xs text-gray-400 mt-1">
                {stats.totalStockIn.toLocaleString('id-ID')} masuk – {stats.totalStockOut.toLocaleString('id-ID')} keluar
              </p>
            </div>
          </div>
          <div className="text-right bg-gray-50 rounded-lg px-4 py-3">
            <p className="text-xs text-gray-500 mb-1">Persentase Tersisa</p>
            <p className="text-2xl font-bold text-indigo-600">
              {stats.totalStockIn > 0
                ? ((totalStokTersedia / stats.totalStockIn) * 100).toFixed(1)
                : '0'}%
            </p>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Jenis Produk"        value={stats.totalProducts}      IconComponent={Package}       iconColor="bg-indigo-600" bgColor="bg-white" />
        <StatCard title="Total Barang Masuk"  value={stats.totalStockIn}       IconComponent={Archive}       iconColor="bg-blue-500"   bgColor="bg-white" />
        <StatCard title="Total Barang Keluar" value={stats.totalStockOut}      IconComponent={ShoppingCart}  iconColor="bg-green-500"  bgColor="bg-white" />
        <StatCard title="Stok Menipis"        value={stats.lowStockProducts}   IconComponent={AlertTriangle} iconColor="bg-red-500"    bgColor="bg-white" />
      </div>

      {/* Analisis Keuangan */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Analisis Keuangan</h3>
                <p className="text-sm text-gray-500">Ringkasan {PERIOD_LABELS[financePeriod] || 'Bulan Ini'}</p>
              </div>
            </div>
            <PeriodSelector
              value={financePeriod}
              onChange={handleFinancePeriodChange}
              options={financePeriodOptions}
              activeClass="bg-green-600"
            />
          </div>
        </div>

        <div className="p-6">
          {financeLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nilai Inventory */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                  <div className="p-3 bg-blue-500 rounded-xl shadow-lg w-fit mb-3">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-blue-600 font-medium mb-1">Nilai Inventory</p>
                  <p className="text-2xl font-bold text-blue-900">{formatCurrency(financeStats.nilaiInventory)}</p>
                  <p className="text-xs text-blue-500 mt-1">Stok tersedia di gudang</p>
                </div>

                {/* HPP */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
                  <div className="p-3 bg-orange-500 rounded-xl shadow-lg w-fit mb-3">
                    <TrendingDown className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-orange-600 font-medium mb-1">HPP</p>
                  <p className="text-2xl font-bold text-orange-900">
                    {formatCurrency(financeStats.totalPenjualan - financeStats.totalProfit)}
                  </p>
                  <p className="text-xs text-orange-500 mt-1">Harga Pokok Penjualan</p>
                </div>

                {/* Total Omset */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                  <div className="p-3 bg-purple-500 rounded-xl shadow-lg w-fit mb-3">
                    <ShoppingCart className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-purple-600 font-medium mb-1">Total Omset</p>
                  <p className="text-2xl font-bold text-purple-900">{formatCurrency(financeStats.totalPenjualan)}</p>
                  <p className="text-xs text-purple-500 mt-1">{PERIOD_LABELS[financePeriod]}</p>
                </div>

                {/* Laba Bersih */}
                <div className={`bg-gradient-to-br rounded-xl p-6 border ${
                  financeStats.totalProfit >= 0
                    ? 'from-green-50 to-green-100 border-green-200'
                    : 'from-red-50 to-red-100 border-red-200'
                }`}>
                  <div className={`p-3 rounded-xl shadow-lg w-fit mb-3 ${financeStats.totalProfit >= 0 ? 'bg-green-500' : 'bg-red-500'}`}>
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <p className={`text-sm font-medium mb-1 ${financeStats.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    Laba Bersih
                  </p>
                  <p className={`text-2xl font-bold ${financeStats.totalProfit >= 0 ? 'text-green-900' : 'text-red-900'}`}>
                    {formatCurrency(financeStats.totalProfit)}
                  </p>
                  {financeStats.totalPenjualan > 0 && (
                    <p className={`text-xs mt-1 ${financeStats.totalProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {((financeStats.totalProfit / financeStats.totalPenjualan) * 100).toFixed(1)}% margin
                    </p>
                  )}
                </div>
              </div>

              {/* Ringkasan P&L */}
              <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 font-medium">💰 Pendapatan (Omset)</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(financeStats.totalPenjualan)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 font-medium">📦 HPP (Harga Pokok Penjualan)</span>
                    <span className="font-semibold text-red-600">
                      – {formatCurrency(financeStats.totalPenjualan - financeStats.totalProfit)}
                    </span>
                  </div>
                  <div className="border-t border-gray-300 pt-3 flex items-center justify-between">
                    <span className="text-base font-bold text-gray-900">📈 Laba Bersih</span>
                    <div className="text-right">
                      <span className={`text-lg font-bold ${financeStats.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(financeStats.totalProfit)}
                      </span>
                      {financeStats.totalPenjualan > 0 && (
                        <p className="text-xs text-gray-500">
                          ({((financeStats.totalProfit / financeStats.totalPenjualan) * 100).toFixed(1)}% profit margin)
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Ringkasan Stok */}
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
            <PeriodSelector
              value={stockPeriod}
              onChange={handleStockPeriodChange}
              options={stockPeriodOptions}
            />
          </div>
        </div>

        <div className="p-6">
          {stockLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Barang Masuk */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
                        <ArrowUpCircle className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-600 font-medium">Barang Masuk</p>
                        <p className="text-xs text-blue-500">{PERIOD_LABELS[stockPeriod]}</p>
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-blue-700">{stockSummary.totalIn}</p>
                  </div>
                  <div className="h-3 bg-blue-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${inPercent}%` }} />
                  </div>
                </div>

                {/* Barang Keluar */}
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-red-500 rounded-xl shadow-lg">
                        <ArrowDownCircle className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-red-600 font-medium">Barang Keluar</p>
                        <p className="text-xs text-red-500">{PERIOD_LABELS[stockPeriod]}</p>
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-red-700">{stockSummary.totalOut}</p>
                  </div>
                  <div className="h-3 bg-red-200 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full transition-all duration-500" style={{ width: `${outPercent}%` }} />
                  </div>
                </div>
              </div>

              {/* Net change */}
              <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <TrendingUp className={`w-6 h-6 ${stockSummary.totalIn - stockSummary.totalOut >= 0 ? 'text-green-500' : 'text-red-500'}`} />
                  <span className="text-gray-600 font-medium">
                    Perubahan Stok Bersih ({PERIOD_LABELS[stockPeriod]})
                  </span>
                </div>
                <span className={`text-2xl font-bold ${stockSummary.totalIn - stockSummary.totalOut >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stockSummary.totalIn - stockSummary.totalOut >= 0 ? '+' : ''}
                  {stockSummary.totalIn - stockSummary.totalOut}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Transaksi Terbaru */}
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
                {recentTransactions.map((t, i) => (
                  <div
                    key={t.transaction_id || i}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${t.jenis_transaksi === 'IN' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'}`}>
                        {t.jenis_transaksi === 'IN'
                          ? <Archive className="w-5 h-5" />
                          : <ShoppingCart className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{t.product?.nama_barang || 'Produk'}</p>
                        <p className="text-xs text-gray-500">{formatDate(t.created_at)}</p>
                      </div>
                    </div>
                    <span className={`font-bold text-sm ${t.jenis_transaksi === 'IN' ? 'text-blue-600' : 'text-red-600'}`}>
                      {t.jenis_transaksi === 'IN' ? '+' : '–'}{t.jumlah}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Stok Menipis */}
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
                  <div
                    key={item.product_id}
                    className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-100 hover:bg-red-100 transition-colors"
                  >
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