import React, { useState, useEffect, useRef } from 'react';
import { 
  PackagePlus, X, CheckCircle, ChevronDown,
  Package, User, Hash, Search
} from 'lucide-react';
import { GlobalStyles, ToastContainer } from '../../components/ui/SharedComponents';
import { useToast } from '../../components/ui/sharedHooks';
import { productapi } from '../../services/productapi';
import { stockapi } from '../../services/stockapi';

const BarangMasukUser = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    product_id: '',
    jumlah: '',
    keterangan: '',
    penanggung_jawab: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const dropdownRef = useRef(null);

  const toast = useToast();

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredProducts = products.filter(p => {
    if (!productSearch.trim()) return true;
    const q = productSearch.toLowerCase();
    return (
      p.nama_barang?.toLowerCase().includes(q) ||
      p.kode_barang?.toLowerCase().includes(q)
    );
  });

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const response = await productapi.getForDropdown({ only_available: false });
      let allProducts = response.data?.data || [];
      allProducts = [...allProducts].sort((a, b) => b.product_id - a.product_id);
      setProducts(allProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Gagal memuat data produk.', 'Error');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setFormData({ ...formData, product_id: product.product_id });
    setShowDropdown(false);
    setProductSearch('');
  };

  const handleClearProduct = () => {
    setSelectedProduct(null);
    setFormData({ ...formData, product_id: '' });
    setProductSearch('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProduct) {
      toast.warning('Pilih produk terlebih dahulu.', 'Produk Belum Dipilih');
      return;
    }
    if (!formData.jumlah || formData.jumlah <= 0) {
      toast.warning('Jumlah barang harus lebih dari 0.', 'Jumlah Tidak Valid');
      return;
    }
    if (!formData.penanggung_jawab.trim()) {
      toast.warning('Penanggung jawab harus diisi.', 'Form Tidak Lengkap');
      return;
    }

    try {
      setSubmitLoading(true);

      const payload = {
        product_id: formData.product_id,
        jenis_transaksi: 'IN',
        jumlah: parseInt(formData.jumlah),
        keterangan: formData.keterangan || '',
        penanggung_jawab: formData.penanggung_jawab.trim()
      };

      await stockapi.create(payload);

      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 2000);

      toast.success(
        `${formData.jumlah} ${selectedProduct.satuan} ${selectedProduct.nama_barang} berhasil dicatat masuk.`,
        'Barang Masuk Berhasil'
      );

      setFormData({ product_id: '', jumlah: '', keterangan: '', penanggung_jawab: '' });
      setSelectedProduct(null);

    } catch (error) {
      console.error('Error submitting:', error);
      toast.error(error.response?.data?.message || 'Gagal menambahkan barang masuk.', 'Error');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ product_id: '', jumlah: '', keterangan: '', penanggung_jawab: '' });
    setSelectedProduct(null);
    setProductSearch('');
  };

  const getButtonStyle = () => {
    if (submitSuccess)    return 'bg-green-500 hover:bg-green-500 scale-95';
    if (submitLoading)    return 'bg-blue-500 opacity-80 cursor-not-allowed';
    if (!selectedProduct) return 'bg-blue-600 opacity-50 cursor-not-allowed';
    return 'bg-blue-600 hover:bg-blue-700 active:scale-95';
  };

  return (
    <div className="space-y-6">
      <GlobalStyles />
      <ToastContainer toasts={toast.toasts} onRemove={toast.remove} />

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <PackagePlus className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-1">Barang Masuk</h1>
            <p className="text-blue-100">Input transaksi barang masuk ke gudang</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/**/}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Pilih Produk <span className="text-red-500">*</span>
            </label>

            <div ref={dropdownRef} className="relative">
              {/* Trigger button */}
              <button
                type="button"
                onClick={() => !loading && setShowDropdown(prev => !prev)}
                disabled={loading}
                className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-xl bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed text-left"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Package className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  {loading ? (
                    <span className="text-sm text-gray-400">Memuat produk...</span>
                  ) : selectedProduct ? (
                    <div className="min-w-0">
                      <span className="text-sm font-semibold text-gray-900 truncate block">
                        {selectedProduct.nama_barang}
                      </span>
                      <span className="text-xs text-gray-500">
                        {selectedProduct.kode_barang} · Stok: {selectedProduct.stok} {selectedProduct.satuan}
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">Pilih produk...</span>
                  )}
                </div>
                <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                  {selectedProduct && (
                    <span
                      onClick={(e) => { e.stopPropagation(); handleClearProduct(); }}
                      className="p-1 hover:bg-gray-200 rounded-full cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5 text-gray-500" />
                    </span>
                  )}
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {/* Dropdown panel */}
              {showDropdown && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-2xl overflow-hidden">
                  {/* Search input */}
                  <div className="p-3 border-b border-gray-100 bg-blue-50">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                      <input
                        type="text"
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                        placeholder="Cari nama atau kode barang..."
                        className="w-full pl-9 pr-4 py-2 border border-blue-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                        autoFocus
                      />
                    </div>
                  </div>

                  {/* Scrollable list */}
                  <div className="max-h-60 overflow-y-auto">
                    {filteredProducts.length === 0 ? (
                      <div className="px-4 py-8 text-center text-sm text-gray-400">
                        <Package className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                        Produk tidak ditemukan
                      </div>
                    ) : (
                      filteredProducts.map(product => (
                        <div
                          key={product.product_id}
                          onClick={() => handleSelectProduct(product)}
                          className={`px-4 py-3 cursor-pointer hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-b-0 ${
                            selectedProduct?.product_id === product.product_id ? 'bg-blue-50' : ''
                          }`}
                        >
                          <p className={`text-sm font-semibold ${
                            selectedProduct?.product_id === product.product_id ? 'text-blue-700' : 'text-gray-900'
                          }`}>
                            {product.nama_barang}
                          </p>
                          <div className="flex justify-between items-center mt-0.5">
                            <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                              {product.kode_barang}
                            </span>
                            <span className={`text-xs font-semibold ${
                              product.stok > 10 ? 'text-green-600' : product.stok > 0 ? 'text-orange-500' : 'text-red-500'
                            }`}>
                              Stok: {product.stok} {product.satuan}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Footer count */}
                  <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 text-xs text-gray-400 text-right">
                    {filteredProducts.length} produk
                  </div>
                </div>
              )}
            </div>
          </div>
          {/**/}

          {/* Selected Product Info Card */}
          {selectedProduct && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{selectedProduct.nama_barang}</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-sm">
                      <div className="text-gray-600">
                        <span className="font-medium">Kode:</span> {selectedProduct.kode_barang}
                      </div>
                      <div className="text-gray-600">
                        <span className="font-medium">Jenis:</span> {selectedProduct.jenis_barang || '-'}
                      </div>
                      <div className="text-gray-600">
                        <span className="font-medium">Satuan:</span> {selectedProduct.satuan}
                      </div>
                      <div className="text-gray-600">
                        <span className="font-medium">Stok Saat Ini:</span> {selectedProduct.stok}
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleClearProduct}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Jumlah */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Jumlah <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                name="jumlah"
                value={formData.jumlah}
                onChange={handleInputChange}
                min="1"
                placeholder="Masukkan jumlah barang"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Penanggung Jawab */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Penanggung Jawab <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="penanggung_jawab"
                value={formData.penanggung_jawab}
                onChange={handleInputChange}
                placeholder="Nama penanggung jawab"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Keterangan */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Keterangan (Opsional)
            </label>
            <textarea
              name="keterangan"
              value={formData.keterangan}
              onChange={handleInputChange}
              rows="3"
              placeholder="Tambahkan keterangan jika diperlukan..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleReset}
              disabled={submitLoading}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={submitLoading || submitSuccess || !selectedProduct}
              className={`flex-1 px-6 py-3 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-200 ${getButtonStyle()}`}
            >
              {submitLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  <span>Memproses...</span>
                </>
              ) : submitSuccess ? (
                <>
                  <CheckCircle className="w-5 h-5 animate-bounce" />
                  <span>Berhasil!</span>
                </>
              ) : (
                <>
                  <PackagePlus className="w-5 h-5" />
                  <span>Tambah Barang Masuk</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BarangMasukUser;