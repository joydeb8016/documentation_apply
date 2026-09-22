import React, { useState } from 'react';
import { X, Plus, ShieldCheck, UploadCloud, CheckCircle2, Cpu } from 'lucide-react';
import type { Product, ProductCategory } from '../../types';


interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product) => void;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onAddProduct
}) => {
  const [title, setTitle] = useState('');
  const [sku, setSku] = useState('');
  const [price, setPrice] = useState<number>(14999);
  const [originalPrice, setOriginalPrice] = useState<number>(19999);
  const [stock, setStock] = useState<number>(15);
  const [category, setCategory] = useState<ProductCategory>('Components');
  const [warranty, setWarranty] = useState('1 Year Manufacturer Warranty');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80');

  // Specs
  const [spec1Key, setSpec1Key] = useState('Processor');
  const [spec1Val, setSpec1Val] = useState('Quad-Core 2.4GHz');
  const [spec2Key, setSpec2Key] = useState('Interface');
  const [spec2Val, setSpec2Val] = useState('USB 3.0 Type-C');

  // Compliance Certs
  const [bisCertified, setBisCertified] = useState(true);
  const [rohsCompliant, setRohsCompliant] = useState(true);
  const [govtApproved, setGovtApproved] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const badges: string[] = [];
    if (bisCertified) badges.push('BIS Certified');
    if (govtApproved) badges.push('Govt IT Approved');
    if (rohsCompliant) badges.push('RoHS Compliant');

    const newProd: Product = {
      id: `PROD-${Date.now().toString().slice(-4)}`,
      title: title || 'Certified Commercial Hardware Item',
      sku: sku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      price: Number(price),
      originalPrice: Number(originalPrice) || Number(price) * 1.2,
      stock: Number(stock),
      category,
      rating: 5.0,
      reviewsCount: 1,
      image: imageUrl,
      verifiedGenuine: true,
      complianceBadges: badges,
      specs: {
        [spec1Key]: spec1Val,
        [spec2Key]: spec2Val
      },
      warranty,
      inStock: stock > 0
    };

    onAddProduct(newProd);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">List Verified Electronics Item</h3>
              <p className="text-[11px] text-slate-500">Seller Hub & Compliance Registry</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Product Title & Model Name *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Asus Vivobook 15 Intel i5 16GB RAM 512GB SSD"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-600 outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">SKU Code *</label>
              <input
                type="text"
                required
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="ASUS-VB15-I5"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-600 outline-hidden font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-600 outline-hidden bg-white"
              >
                <option value="Laptops">Laptops</option>
                <option value="Mobile Devices">Mobile Devices</option>
                <option value="Components">Components</option>
                <option value="Wearables">Wearables</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Selling Price (₹) *</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-600 outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">MRP Price (₹)</label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-600 outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Stock Count *</label>
              <input
                type="number"
                required
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-600 outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Product Image URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-600 outline-hidden text-[11px]"
            />
          </div>

          {/* Compliance Certs Selector */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <span className="font-bold text-slate-800 uppercase tracking-wider block text-[10px]">
              Mandatory Legal & Government Compliance Badges
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={bisCertified}
                  onChange={(e) => setBisCertified(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-medium text-slate-700">BIS Certified</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={govtApproved}
                  onChange={(e) => setGovtApproved(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-medium text-slate-700">Govt IT Approved</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rohsCompliant}
                  onChange={(e) => setRohsCompliant(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-medium text-slate-700">RoHS Lead-Free</span>
              </label>
            </div>
          </div>

          {/* Technical Specs */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Spec 1 (e.g. CPU)</label>
              <input
                type="text"
                value={spec1Val}
                onChange={(e) => setSpec1Val(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Spec 2 (e.g. Memory)</label>
              <input
                type="text"
                value={spec2Val}
                onChange={(e) => setSpec2Val(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded-xl border border-slate-200 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>List in Catalog</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
