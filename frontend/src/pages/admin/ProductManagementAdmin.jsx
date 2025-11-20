import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, X, Package, Download } from 'lucide-react';
import { productapi } from '../../services/productapi';

const ProductManagementAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    kode_barang: '',
    nama_barang: '',
    jenis_barang: '',
    satuan: '',
    stok_minimal: '',
    harga_modal: '',
    harga_jual: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productapi.getAll();
      setProducts(response.data.data || []);
    } catch (err) {
      setError('Gagal memuat data produk');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (mode, product = null) => {
    setModalMode(mode);
    setError('');
    setSuccess('');

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
    setSuccess('');
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess('');

  try {
    const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}');
    
    const dataToSubmit = {
      ...formData,
      user_id: user.user_id || null, 
      stok_minimal: formData.stok_minimal || 0, 
      stok: formData.stok || 0, 
    };

    if (modalMode === 'add') {
      await productapi.create(dataToSubmit);
      setSuccess('Produk berhasil ditambahkan!');
    } else {
      await productapi.update(selectedProduct.product_id, dataToSubmit);
      setSuccess('Produk berhasil diupdate!');
    }
    
    setTimeout(() => {
      fetchProducts();
      handleCloseModal();
    }, 1500);
  } catch (err) {
    console.error('Error details:', err.response?.data);
    setError(err.response?.data?.message || 'Gagal menyimpan produk');
  }
};

  const handleDelete = async (productId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      try {
        await productapi.delete(productId);
        setSuccess('Produk berhasil dihapus!');
        fetchProducts();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Gagal menghapus produk');
        console.error('Error deleting product:', err);
      }
    }
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
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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
              onClick={() => alert('Fitur export akan segera hadir!')}
              className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition-colors font-medium shadow-md"
            >
              <Download className="w-5 h-5" />
              Export
            </button>
            <button
              onClick={() => handleOpenModal('add')}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md"
            >
              <Plus className="w-5 h-5" />
              Tambah Produk Baru
            </button>
          </div>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Semua Status</option>
            <option value="Tersedia">Tersedia</option>
            <option value="Habis">Habis</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6 text-sm font-medium text-gray-900">
                      {product.kode_barang}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700">
                      {product.nama_barang}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700">
                      {product.jenis_barang || '-'}
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
                          onClick={() => handleOpenModal('edit', product)}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.product_id)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
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

        {/* Pagination Info */}
        {!loading && filteredProducts.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Menampilkan {filteredProducts.length} dari {products.length} produk
            </p>
          </div>
        )}
      </div>

      {/* Modal Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Plus className="w-6 h-6 text-indigo-600" />
                {modalMode === 'add' ? 'Tambah Produk Baru' : 'Edit Produk'}
              </h3>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-5">
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
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Masukkan kode barang"
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
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
                >
                  {modalMode === 'add' ? 'Simpan' : 'Update'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
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