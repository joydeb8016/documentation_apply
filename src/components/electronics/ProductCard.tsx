import React, { useState } from 'react';
import { 
  Star, 
  ShoppingCart, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Info,
  Check
} from 'lucide-react';
import type { Product } from '../../types';


interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [showSpecs, setShowSpecs] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden group">
      
      {/* Product Image Container */}
      <div className="relative h-48 bg-slate-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {product.verifiedGenuine && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white shadow-xs">
              <ShieldCheck className="w-3 h-3" />
              <span>Verified Genuine</span>
            </span>
          )}
          {discountPercent > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-600 text-white shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Category Pill */}
        <div className="absolute bottom-3 right-3">
          <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-xs">
            {product.category}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        
        <div className="space-y-2">
          {/* Title & SKU */}
          <div>
            <div className="text-[10px] font-mono font-medium text-slate-400">SKU: {product.sku}</div>
            <h3 className="font-bold text-sm text-slate-900 line-clamp-2 mt-0.5 group-hover:text-blue-600 transition-colors">
              {product.title}
            </h3>
          </div>

          {/* Ratings & Stock */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 font-normal text-[11px]">({product.reviewsCount})</span>
            </div>

            <span className={`text-[11px] font-semibold ${
              product.stock <= 8 ? 'text-amber-600' : 'text-emerald-700'
            }`}>
              {product.stock <= 8 ? `Only ${product.stock} left` : `${product.stock} in stock`}
            </span>
          </div>

          {/* Compliance Badges Strip */}
          <div className="flex flex-wrap gap-1 pt-1">
            {product.complianceBadges.map((b, i) => (
              <span
                key={i}
                className="text-[9px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200"
              >
                {b}
              </span>
            ))}
          </div>

          {/* Specs Toggle */}
          {showSpecs && (
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-[11px] space-y-1 animate-in fade-in duration-150">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="flex justify-between text-slate-600">
                  <span className="font-semibold text-slate-500">{key}:</span>
                  <span className="text-right text-slate-800 font-medium truncate max-w-40">{val}</span>
                </div>
              ))}
              <div className="pt-1 text-[10px] text-blue-600 font-medium">{product.warranty}</div>
            </div>
          )}
        </div>

        {/* Pricing & CTA */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <div className="text-lg font-extrabold text-slate-900 tracking-tight">
              ₹{product.price.toLocaleString('en-IN')}
            </div>
            {product.originalPrice > product.price && (
              <div className="text-[11px] text-slate-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowSpecs(!showSpecs)}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              title="Toggle Technical Specs"
            >
              <Info className="w-4 h-4" />
            </button>

            <button
              onClick={handleAdd}
              disabled={!product.inStock}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                isAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
