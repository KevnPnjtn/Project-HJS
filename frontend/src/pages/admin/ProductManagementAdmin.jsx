import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, X, Package, Download, AlertCircle, QrCode, Printer } from 'lucide-react';
import { productapi } from '../../services/productapi';
import * as XLSX from 'xlsx';
import QRCodeLib from 'qrcode';

const ProductManagementAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedQRProduct, setSelectedQRProduct] = useState(null);
  const [qrCodeDataURL, setQrCodeDataURL] = useState('');
  const [modalMode, setModalMode] = useState('add');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [error, setError] = useState('');

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    perPage: 10
  });

  const [formData, setFormData] = useState({
    kode_barang: '',
    nama_barang: '',
    jenis_barang: '',
    satuan: '',
    stok_minimal: '',
    harga_modal: '',
    harga_jual: ''
  });

  const handleExport = () => {
    try {
      const exportData = filteredProducts.map((product, index) => ({
        'No': index + 1,
        'Kode Barang': product.kode_barang || '-',
        'Nama Barang': product.nama_barang || '-',
        'Jenis Barang': product.jenis_barang || '-',
        'Satuan': product.satuan || '-',
        'Stok Minimal': product.stok_minimal || 0,
        'Status': product.status || '-',
        'Stok': product.stok || 0,
        'Harga Modal': product.harga_modal || 0,
        'Harga Jual': product.harga_jual || 0
      }));

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(exportData);

      ws['!cols'] = [
        { wch: 5 }, { wch: 15 }, { wch: 30 }, { wch: 15 },
        { wch: 10 }, { wch: 12 }, { wch: 12 }, { wch: 10 },
        { wch: 15 }, { wch: 15 }
      ];

      const range = XLSX.utils.decode_range(ws['!ref']);
      for (let R = range.s.r; R <= range.e.r; ++R) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
          if (!ws[cellAddress]) continue;
          
          if (R === 0) {
            ws[cellAddress].s = {
              font: { bold: true, color: { rgb: "FFFFFF" } },
              fill: { fgColor: { rgb: "000000" } },
              alignment: { horizontal: "center", vertical: "center" },
              border: {
                top: { style: "thin", color: { rgb: "000000" } },
                bottom: { style: "thin", color: { rgb: "000000" } },
                left: { style: "thin", color: { rgb: "000000" } },
                right: { style: "thin", color: { rgb: "000000" } }
              }
            };
          } else {
            ws[cellAddress].s = {
              alignment: { 
                horizontal: C === 0 || C === 5 || C === 6 || C === 7 ? "center" : "left",
                vertical: "center" 
              },
              border: {
                top: { style: "thin", color: { rgb: "CCCCCC" } },
                bottom: { style: "thin", color: { rgb: "CCCCCC" } },
                left: { style: "thin", color: { rgb: "CCCCCC" } },
                right: { style: "thin", color: { rgb: "CCCCCC" } }
              },
              fill: { fgColor: { rgb: R % 2 === 0 ? "F9FAFB" : "FFFFFF" } }
            };
          }
        }
      }

      XLSX.utils.book_append_sheet(wb, ws, "Data Produk");
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      XLSX.writeFile(wb, `Data_Produk_${timestamp}.xlsx`);
    } catch (error) {
      console.error('Export error:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [pagination.currentPage]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productapi.getAll({
        page: pagination.currentPage,
        per_page: pagination.perPage
      });
      
      const responseData = response.data || response;
      const productList = responseData.data || [];
      
      setProducts(productList);
      
      setPagination(prev => ({
        ...prev,
        totalPages: responseData.last_page || responseData.total_pages || 1,
        totalItems: responseData.total || productList.length,
        currentPage: responseData.current_page || prev.currentPage
      }));
    } catch (error) {
      console.error('Fetch products error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (mode, product = null) => {
    setModalMode(mode);
    setError('');

    if (mode === 'edit' && product) {
      setSelectedProduct(product);
      setFormData({
        kode_barang: product.kode_barang,
        nama_barang: product.nama_barang,
        jenis_barang: product.jenis_barang || '',
        satuan: product.satuan,
        stok_minimal: product.stok_minimal || '',
        harga_modal: product.harga_modal,
        harga_jual: product.harga_jual
      });
    } else {
      setFormData({
        kode_barang: '',
        nama_barang: '',
        jenis_barang: '',
        satuan: '',
        stok_minimal: '',
        harga_modal: '',
        harga_jual: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setError('');
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  try { 
    const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : {};
     
    const dataToSubmit = {
      kode_barang: formData.kode_barang.trim(),
      nama_barang: formData.nama_barang.trim(),
      jenis_barang: formData.jenis_barang.trim() || null,  
      satuan: formData.satuan,
      stok_minimal: formData.stok_minimal ? parseInt(formData.stok_minimal) : 0,
      stok: 0,  
      harga_modal: parseFloat(formData.harga_modal) || 0,
      harga_jual: parseFloat(formData.harga_jual) || 0,
      user_id: user.user_id || null
    };
 
    if (!dataToSubmit.kode_barang || !dataToSubmit.nama_barang || !dataToSubmit.satuan) {
      setError('Mohon lengkapi semua field yang wajib diisi (Kode Barang, Nama Barang, Satuan)');
      return;
    }

    if (dataToSubmit.harga_modal <= 0 || dataToSubmit.harga_jual <= 0) {
      setError('Harga Modal dan Harga Jual harus lebih dari 0');
      return;
    }

    if (modalMode === 'add') {
      await productapi.create(dataToSubmit);
    } else {
      await productapi.update(selectedProduct.product_id, dataToSubmit);
    }
    
    handleCloseModal();
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    fetchProducts();
  } catch (error) {
    if (error.response?.status === 422) {
      const errors = error.response?.data?.errors;
      if (errors) {
        const errorMessages = Object.values(errors).flat().join(', ');
        setError(`Validasi gagal: ${errorMessages}`);
      } else {
        setError(error.response?.data?.message || 'Validasi gagal. Periksa kembali data yang diinput.');
      }
    } else {
      setError(error.response?.data?.message || 'Gagal menyimpan produk. Silakan coba lagi.');
    }
  }
};

const handleDelete = async (productId) => {
  if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
    try {
      await productapi.delete(productId);
      fetchProducts();
    } catch {
      alert('Gagal menghapus produk');
    }
  }
};

const handleOpenQRModal = async (product) => {
  setSelectedQRProduct(product);
  setShowQRModal(true);
  
  try {
    const qrData = product.kode_barang;
    const dataURL = await QRCodeLib.toDataURL(qrData, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
    setQrCodeDataURL(dataURL);
  } catch {
    // QR code generation failed silently
  }
};

  const handleDownloadQR = () => {
    if (!qrCodeDataURL || !selectedQRProduct) return;

    const link = document.createElement('a');
    link.href = qrCodeDataURL;
    link.download = `QR_${selectedQRProduct.kode_barang}_${selectedQRProduct.nama_barang}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintQR = () => {
    if (!selectedQRProduct) return;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print QR Code - ${selectedQRProduct.nama_barang}</title>
          <style>
            body {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              font-family: Arial, sans-serif;
              padding: 20px;
            }
            .qr-container {
              text-align: center;
              border: 2px solid #000;
              padding: 30px;
              border-radius: 10px;
            }
            .product-info {
              margin-top: 20px;
            }
            h2 { margin: 10px 0; }
            p { margin: 5px 0; font-size: 14px; }
            img { max-width: 300px; }
            @media print {
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          <div class="qr-container">
            <img src="${qrCodeDataURL}" alt="QR Code">
            <div class="product-info">
              <h2>${selectedQRProduct.nama_barang}</h2>
              <p><strong>Kode:</strong> ${selectedQRProduct.kode_barang}</p>
              <p><strong>Jenis:</strong> ${selectedQRProduct.jenis_barang || '-'}</p>
              <p><strong>Satuan:</strong> ${selectedQRProduct.satuan}</p>
            </div>
          </div>
          <script>
            window.onload = () => {
              window.print();
              setTimeout(() => window.close(), 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.nama_barang?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.kode_barang?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.jenis_barang?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || product.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Package className="w-8 h-8 text-indigo-600" />
              Manajemen Produk
            </h1>
            <p className="text-gray-600 mt-1">Kelola data produk inventory Anda</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleExport}
              disabled={filteredProducts.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-5 h-5" />
              Export Excel
            </button>
            <button
              onClick={() => handleOpenModal('add')}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all font-medium shadow-md hover:shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Tambah Produk Baru
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          >
            <option value="">Semua Status</option>
            <option value="Tersedia">Tersedia</option>
            <option value="Habis">Habis</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow-sm border border-gray-200 mt-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold">Kode Barang</th>
                <th className="text-left py-4 px-6 text-sm font-semibold">Nama Barang</th>
                <th className="text-left py-4 px-6 text-sm font-semibold">Jenis Barang</th>
                <th className="text-left py-4 px-6 text-sm font-semibold">Satuan</th>
                <th className="text-center py-4 px-6 text-sm font-semibold">Stok Minimal</th>
                <th className="text-center py-4 px-6 text-sm font-semibold">Status</th>
                <th className="text-center py-4 px-6 text-sm font-semibold">Stok</th>
                <th className="text-center py-4 px-6 text-sm font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-12">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-12 text-gray-500">
                    <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">Tidak ada data produk</p>
                    <p className="text-sm">Tambahkan produk pertama Anda</p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr 
                    key={product.product_id} 
                    className="border-b border-gray-100 hover:bg-indigo-50 transition-colors"
                  >
                    <td className="py-4 px-6 text-sm font-medium text-gray-900">
                      {product.kode_barang}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700">
                      {product.nama_barang}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700">
                      {product.jenis_barang || <span className="text-gray-400 italic">Belum diisi</span>}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700">
                      {product.satuan}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700 text-center">
                      {product.stok_minimal || '-'}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        product.status === 'Tersedia'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700 text-center font-semibold">
                      {product.stok || 0}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenQRModal(product)}
                          className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-all hover:scale-110"
                          title="QR Code"
                        >
                          <QrCode className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenModal('edit', product)}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all hover:scale-110"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.product_id)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all hover:scale-110"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {!loading && filteredProducts.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Menampilkan {filteredProducts.length} dari {pagination.totalItems} produk
                {pagination.totalPages > 1 && ` (Halaman ${pagination.currentPage} dari ${pagination.totalPages})`}
              </p>
              
              {pagination.totalPages > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                    disabled={pagination.currentPage === 1}
                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    ← Prev
                  </button>
                  
                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
                      let pageNum;
                      if (pagination.totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (pagination.currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (pagination.currentPage >= pagination.totalPages - 2) {
                        pageNum = pagination.totalPages - 4 + i;
                      } else {
                        pageNum = pagination.currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setPagination(prev => ({ ...prev, currentPage: pageNum }))}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                            pagination.currentPage === pageNum
                              ? 'bg-indigo-600 text-white shadow-md'
                              : 'border border-gray-300 hover:bg-gray-100'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {showQRModal && selectedQRProduct && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
          onClick={() => setShowQRModal(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <QrCode className="w-6 h-6" />
                QR Code Produk
              </h3>
              <button
                onClick={() => setShowQRModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-gray-50 p-6 rounded-xl border-2 border-purple-200 flex items-center justify-center">
                {qrCodeDataURL && (
                  <img 
                    src={qrCodeDataURL} 
                    alt="QR Code" 
                    className="w-64 h-64"
                  />
                )}
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                <h4 className="font-bold text-purple-900 mb-2 text-lg">{selectedQRProduct.nama_barang}</h4>
                <div className="space-y-1 text-sm text-purple-700">
                  <p><strong>Kode:</strong> {selectedQRProduct.kode_barang}</p>
                  <p><strong>Jenis:</strong> {selectedQRProduct.jenis_barang || '-'}</p>
                  <p><strong>Satuan:</strong> {selectedQRProduct.satuan}</p>
                  <p><strong>Stok:</strong> {selectedQRProduct.stok || 0}</p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleDownloadQR}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold shadow-lg hover:shadow-xl"
                >
                  <Download className="w-5 h-5" />
                  Download PNG
                </button>
                <button
                  onClick={handlePrintQR}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow-lg hover:shadow-xl"
                >
                  <Printer className="w-5 h-5" />
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
              <h3 className="text-xl font-bold flex items-center gap-2">
                {modalMode === 'add' ? (
                  <>
                    <Plus className="w-6 h-6" />
                    Tambah Produk Baru
                  </>
                ) : (
                  <>
                    <Edit2 className="w-6 h-6" />
                    Edit Produk
                  </>
                )}
              </h3>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {error && (
                <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg text-red-700 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Terjadi Kesalahan</p>
                    <p className="text-sm mt-1">{error}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Kode Barang <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="kode_barang"
                    value={formData.kode_barang}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Contoh: BR-001"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nama Barang <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nama_barang"
                    value={formData.nama_barang}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    placeholder="Masukkan nama barang"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Jenis Barang
                  </label>
                  <select
                    name="jenis_barang"
                    value={formData.jenis_barang}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  >
                    <option value="">Pilih Jenis</option>
                    <option value="Elektronik">Elektronik</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Alat Tulis">Alat Tulis</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Satuan <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="satuan"
                    value={formData.satuan}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  >
                    <option value="">Pilih Satuan</option>
                    <option value="Unit">Unit</option>
                    <option value="Pcs">Pcs</option>
                    <option value="Box">Box</option>
                    <option value="Kg">Kg</option>
                    <option value="Liter">Liter</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Stok Minimal
                  </label>
                  <input
                    type="number"
                    name="stok_minimal"
                    value={formData.stok_minimal}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Harga Modal <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="harga_modal"
                    value={formData.harga_modal}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    placeholder="0"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Harga Jual <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="harga_jual"
                    value={formData.harga_jual}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all font-semibold shadow-md hover:shadow-lg"
                >
                  {modalMode === 'add' ? 'Simpan' : 'Update'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-all font-semibold"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagementAdmin;