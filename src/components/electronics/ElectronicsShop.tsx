import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  Search, 
  PlusCircle, 
  Filter, 
  ShieldCheck, 
  SlidersHorizontal,
  Laptop,
  Smartphone,
  Cpu,
  Watch,
  CheckCircle2
} from 'lucide-react';
import type { Product, ProductCategory } from '../../types';

import { ProductCard } from './ProductCard';

interface ElectronicsShopProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  openAddProductModal: () => void;
}

export const ElectronicsShop: React.FC<ElectronicsShopProps> = ({
  products,
  onAddToCart,
  openAddProductModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  const categories: { label: string; value: string; icon: any }[] = [
    { label: 'All Hardware', value: 'All', icon: ShoppingBag },
    { label: 'Laptops', value: 'Laptops', icon: Laptop },
    { label: 'Mobile Devices', value: 'Mobile Devices', icon: Smartphone },
    { label: 'Components & IoT', value: 'Components', icon: Cpu },
    { label: 'Wearables', value: 'Wearables', icon: Watch },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
        const matchesQuery = 
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStock = !inStockOnly || p.inStock;

        return matchesCat && matchesQuery && matchesStock;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured default
      });
  }, [products, selectedCategory, searchQuery, sortBy, inStockOnly]);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Verified Electronics Marketplace & Seller Hub
            </h1>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
              100% BIS Genuine
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Procure authentic enterprise laptops, Aadhaar biometric readers, IoT developer boards, and accessories with certified compliance.
          </p>
        </div>

        <button
          onClick={openAddProductModal}
          className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs flex items-center gap-2 transition-colors cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>List New Product</span>
        </button>
      </div>

      {/* Compliance Guarantee Banner */}
      <div className="p-4 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">
              Enterprise Warranty & UIDAI Compliance Badges
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Every piece of hardware listed is tested for Bureau of Indian Standards (BIS) and Ministry of Electronics & IT guidelines.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold shrink-0">
          <CheckCircle2 className="w-4 h-4" />
          <span>Verified Merchant Assurance</span>
        </div>
      </div>

      {/* Category Pills & Filter Toolbar */}
      <div className="space-y-4">
        
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.value;

            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search, Sort, and In-Stock Toggle Controls */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, processor, brand, or SKU..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-hidden transition-all"
            />
          </div>

          {/* Sort & In-Stock */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-hidden cursor-pointer"
              >
                <option value="featured">Featured / New</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span>In-Stock Only</span>
            </label>
          </div>

        </div>

      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
          <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto stroke-1" />
          <div className="text-sm font-bold text-slate-800">No hardware found</div>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search criteria or clear the filters to view all products.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}

    </div>
  );
};
