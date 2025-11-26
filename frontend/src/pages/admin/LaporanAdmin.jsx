import React, { useState, useEffect } from 'react';
import { Search, Download, Eye, FileText, Printer } from 'lucide-react';
import { stockopnameapi } from '../../services/stockopnameapi';

const LaporanAdmin = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    tanggal_mulai: '',
    tanggal_selesai: '',
    status_penyesuaian: 'all'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Set default date range (last 7 days)
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    
    setFilters({
      tanggal_mulai: lastWeek.toISOString().split('T')[0],
      tanggal_selesai: today.toISOString().split('T')[0],
      status_penyesuaian: 'all'
    });
  }, []);

  useEffect(() => {
    if (filters.tanggal_mulai && filters.tanggal_selesai) {
      fetchLaporan();
    }
  }, [filters]);

  const fetchLaporan = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await stockopnameapi.getAll();
      const allData = response.data?.data || [];
      
      // Filter by date range
      let filtered = allData.filter(item => {
        const itemDate = new Date(item.tanggal_opname);
        const startDate = new Date(filters.tanggal_mulai);
        const endDate = new Date(filters.tanggal_selesai);
        return itemDate >= startDate && itemDate <= endDate;
      });

      // Filter by status if not 'all'
      if (filters.status_penyesuaian !== 'all') {
        filtered = filtered.filter(item => {
          if (filters.status_penyesuaian === 'disesuaikan') {
            return item.status_penyesuaian === 'Disesuaikan';
          } else if (filters.status_penyesuaian === 'belum') {
            return item.status_penyesuaian === 'Belum Disesuaikan';
          }
          return true;
        });
      }

      setFilteredData(filtered);
    } catch (err) {
      console.error('Error fetching laporan:', err);
      setError('Gagal memuat data laporan');
    } finally {
      setLoading(false);
    }
  };

  const handleTampilkanLaporan = () => {
    fetchLaporan();
  };

  const handleExportExcel = () => {
    // Header dengan informasi laporan
    const header = [
      ['LAPORAN STOK OPNAME'],
      [`Periode: ${formatDateFull(filters.tanggal_mulai)} - ${formatDateFull(filters.tanggal_selesai)}`],
      [''],
      ['Tanggal', 'Kode Barang', 'Nama Barang', 'Sistem', 'Fisik', 'Selisih', 'Penyesuaian', 'Petugas']
    ];

    // Data rows
    const dataRows = filteredData.map(item => [
      formatDate(item.tanggal_opname),
      item.product?.kode_barang || '',
      item.product?.nama_barang || '',
      item.stok_sistem,
      item.stok_fisik,
      item.selisih,
      item.status_penyesuaian === 'Disesuaikan' ? 'Stok Disesuaikan' : 'Tidak Disesuaikan',
      item.nama_petugas || ''
    ]);

    // Summary footer
    const summary = [
      [''],
      ['RINGKASAN'],
      ['Total Data', filteredData.length],
      ['Stok Disesuaikan', filteredData.filter(item => item.status_penyesuaian === 'Disesuaikan').length],
      ['Tidak Disesuaikan', filteredData.filter(item => item.status_penyesuaian === 'Belum Disesuaikan').length],
      ['Selisih Positif (+)', filteredData.filter(item => item.selisih > 0).length],
      ['Selisih Negatif (-)', filteredData.filter(item => item.selisih < 0).length],
      ['Sesuai (0)', filteredData.filter(item => item.selisih === 0).length]
    ];

    // Combine all sections
    const csvContent = [...header, ...dataRows, ...summary]
      .map(row => row.join(','))
      .join('\n');

    // Add BOM for Excel UTF-8 support
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Laporan_Stok_Opname_${filters.tanggal_mulai}_${filters.tanggal_selesai}.csv`;
    link.click();
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

  // Calculate summary statistics
  const totalItems = filteredData.length;
  const totalDisesuaikan = filteredData.filter(item => item.status_penyesuaian === 'Disesuaikan').length;
  const totalBelumDisesuaikan = filteredData.filter(item => item.status_penyesuaian === 'Belum Disesuaikan').length;
  const totalSelisihPositif = filteredData.filter(item => item.selisih > 0).length;
  const totalSelisihNegatif = filteredData.filter(item => item.selisih < 0).length;
  const totalSesuai = filteredData.filter(item => item.selisih === 0).length;

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
          
          /* Reset colors to black and white */
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
          
          .print-area .badge-disesuaikan {
            background: #d0d0d0 !important;
            color: black !important;
            border: 1px solid black !important;
            padding: 2px 8px !important;
            border-radius: 4px !important;
            font-weight: bold !important;
          }
          
          .print-area .badge-belum {
            background: white !important;
            color: black !important;
            border: 1px solid black !important;
            padding: 2px 8px !important;
            border-radius: 4px !important;
          }
          
          .print-area .selisih-positive {
            font-weight: bold !important;
            color: black !important;
          }
          
          .print-area .selisih-negative {
            font-weight: bold !important;
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
            margin: 0 0 5px 0;
          }
          
          .print-header p {
            font-size: 14px;
            margin: 0;
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
                <FileText className="w-8 h-8 text-indigo-600" />
                Laporan Stok Opname
              </h1>
              <p className="text-gray-600 mt-1">Laporan hasil pengecekan stok fisik gudang</p>
            </div>
          </div>

          {/* Filter Section */}
          <div className="bg-gray-50 rounded-lg p-5 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter Laporan</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tanggal Mulai
                </label>
                <input
                  type="date"
                  value={filters.tanggal_mulai}
                  onChange={(e) => setFilters({ ...filters, tanggal_mulai: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status Penyesuaian
                </label>
                <select
                  value={filters.status_penyesuaian}
                  onChange={(e) => setFilters({ ...filters, status_penyesuaian: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">Semua Status</option>
                  <option value="disesuaikan">Stok Disesuaikan</option>
                  <option value="belum">Tidak Disesuaikan</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleTampilkanLaporan}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:bg-gray-400"
                >
                  <Eye className="w-5 h-5" />
                  {loading ? 'Memuat...' : 'Tampilkan Laporan'}
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleCetak}
              className="flex items-center gap-2 px-6 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold"
            >
              <Printer className="w-5 h-5" />
              Cetak
            </button>
            <button
              onClick={handleExportExcel}
              disabled={filteredData.length === 0}
              className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Download className="w-5 h-5" />
              Export ke Excel
            </button>
          </div>
        </div>

        {/* Statistics Summary - No Print */}
        {filteredData.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 no-print">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <p className="text-sm text-gray-600 mb-1">Total Data</p>
              <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
            </div>
            <div className="bg-green-50 rounded-lg shadow-sm border border-green-200 p-4">
              <p className="text-sm text-green-600 mb-1">Disesuaikan</p>
              <p className="text-2xl font-bold text-green-700">{totalDisesuaikan}</p>
            </div>
            <div className="bg-yellow-50 rounded-lg shadow-sm border border-yellow-200 p-4">
              <p className="text-sm text-yellow-600 mb-1">Belum Disesuaikan</p>
              <p className="text-2xl font-bold text-yellow-700">{totalBelumDisesuaikan}</p>
            </div>
            <div className="bg-blue-50 rounded-lg shadow-sm border border-blue-200 p-4">
              <p className="text-sm text-blue-600 mb-1">Selisih +</p>
              <p className="text-2xl font-bold text-blue-700">{totalSelisihPositif}</p>
            </div>
            <div className="bg-red-50 rounded-lg shadow-sm border border-red-200 p-4">
              <p className="text-sm text-red-600 mb-1">Selisih -</p>
              <p className="text-2xl font-bold text-red-700">{totalSelisihNegatif}</p>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-4">
              <p className="text-sm text-gray-600 mb-1">Sesuai (0)</p>
              <p className="text-2xl font-bold text-gray-700">{totalSesuai}</p>
            </div>
          </div>
        )}

        {/* Print Area */}
        <div className="print-area">
          {/* Print Header */}
          <div className="print-header">
            <h1>Laporan Stok Opname</h1>
            {filters.tanggal_mulai && filters.tanggal_selesai && (
              <p>Periode: {formatDate(filters.tanggal_mulai)} - {formatDate(filters.tanggal_selesai)}</p>
            )}
          </div>

          {/* Report Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {error && (
              <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 no-print">
                {error}
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left py-3 px-4 border border-gray-300 text-sm font-bold">Tanggal</th>
                    <th className="text-left py-3 px-4 border border-gray-300 text-sm font-bold">Kode Barang</th>
                    <th className="text-left py-3 px-4 border border-gray-300 text-sm font-bold">Nama Barang</th>
                    <th className="text-center py-3 px-4 border border-gray-300 text-sm font-bold">Sistem</th>
                    <th className="text-center py-3 px-4 border border-gray-300 text-sm font-bold">Fisik</th>
                    <th className="text-center py-3 px-4 border border-gray-300 text-sm font-bold">Selisih</th>
                    <th className="text-center py-3 px-4 border border-gray-300 text-sm font-bold">Penyesuaian</th>
                    <th className="text-left py-3 px-4 border border-gray-300 text-sm font-bold">Petugas</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="8" className="text-center py-12 border border-gray-300">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                        <p className="mt-2 text-gray-600">Memuat data...</p>
                      </td>
                    </tr>
                  ) : filteredData.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center py-12 text-gray-500 border border-gray-300">
                        <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300 no-print" />
                        <p className="text-lg font-medium">Tidak ada data untuk periode yang dipilih</p>
                        <p className="text-sm mt-1">Silakan ubah filter untuk melihat data</p>
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((item, index) => (
                      <tr key={item.opname_id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="py-2.5 px-4 text-sm text-gray-900 border border-gray-300">
                          {formatDate(item.tanggal_opname)}
                        </td>
                        <td className="py-2.5 px-4 text-sm font-medium text-gray-900 border border-gray-300">
                          {item.product?.kode_barang || '-'}
                        </td>
                        <td className="py-2.5 px-4 text-sm text-gray-900 border border-gray-300">
                          {item.product?.nama_barang || '-'}
                        </td>
                        <td className="py-2.5 px-4 text-center text-sm font-semibold text-gray-900 border border-gray-300">
                          {item.stok_sistem}
                        </td>
                        <td className="py-2.5 px-4 text-center text-sm font-semibold text-gray-900 border border-gray-300">
                          {item.stok_fisik}
                        </td>
                        <td className="py-2.5 px-4 text-center border border-gray-300">
                          <span className={`font-semibold text-sm ${
                            item.selisih > 0 ? 'selisih-positive text-green-700' :
                            item.selisih < 0 ? 'selisih-negative text-red-700' :
                            'text-gray-700'
                          }`}>
                            {item.selisih > 0 ? '+' : ''}{item.selisih}
                          </span>
                        </td>
                        <td className="py-2.5 px-4 text-center border border-gray-300">
                          <span className={item.status_penyesuaian === 'Disesuaikan' ? 'badge-disesuaikan' : 'badge-belum'}>
                            {item.status_penyesuaian === 'Disesuaikan' ? 'Stok Disesuaikan' : 'Tidak Disesuaikan'}
                          </span>
                        </td>
                        <td className="py-2.5 px-4 text-sm text-gray-900 border border-gray-300">
                          {item.nama_petugas || '-'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {filteredData.length > 0 && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-300 text-sm text-gray-700">
                Menampilkan {filteredData.length} data dari {formatDate(filters.tanggal_mulai)} sampai {formatDate(filters.tanggal_selesai)}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LaporanAdmin;