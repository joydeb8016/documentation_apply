import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  ShoppingCart, 
  FileStack, 
  PlusCircle, 
  Shield, 
  X,
  ExternalLink,
  CheckCircle2,
  FileText,
  Laptop,
  ArrowRight
} from 'lucide-react';
import type { ActiveTab, NotificationItem, Product, LegalApplication } from '../../types';


interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  cartCount: number;
  openCart: () => void;
  openApplyModal: () => void;
  notifications: NotificationItem[];
  markNotificationsAsRead: () => void;
  products: Product[];
  applications: LegalApplication[];
  onSelectProduct?: (prod: Product) => void;
  onSelectApplication?: (app: LegalApplication) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab: _activeTab,
  setActiveTab,
  cartCount,
  openCart,
  openApplyModal,
  notifications,
  markNotificationsAsRead,
  products,
  applications,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showNotifPopover, setShowNotifPopover] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => n.unread).length;

  // Global search filtering across applications, products, and tools
  const matchedApps = searchQuery.trim() 
    ? applications.filter(a => 
        a.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.documentType.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3)
    : [];

  const matchedProds = searchQuery.trim()
    ? products.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3)
    : [];

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifPopover(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo & Authority Emblem */}
          <div className="flex items-center gap-3 shrink-0">
            <div 
              onClick={() => setActiveTab('overview')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-700 via-indigo-700 to-slate-900 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Shield className="w-5 h-5 text-blue-200" />
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-900 text-lg tracking-tight font-sans">OmniGov</span>
                  <span className="text-blue-600 font-bold text-lg">&</span>
                  <span className="font-semibold text-slate-700 text-lg tracking-tight">TechNode</span>
                  <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-blue-50 text-blue-700 rounded border border-blue-200 ml-1">
                    v2.4
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 font-medium leading-none">
                  National Digital Identity & Verified Hardware Gateway
                </p>
              </div>
            </div>
          </div>

          {/* Global Search Bar with Live Result Dropdown */}
          <div className="flex-1 max-w-xl relative" ref={searchRef}>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
                placeholder="Search citizen applications, PAN/Aadhaar status, electronic hardware..."
                className="w-full pl-9 pr-8 py-2 text-sm bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-slate-900 placeholder:text-slate-600 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all outline-hidden"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Dropdown Results */}
            {showSearchDropdown && searchQuery.trim() && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 py-1.5 flex justify-between items-center">
                  <span>Quick Search Results</span>
                  <span className="text-[10px] text-slate-400">Press Esc to dismiss</span>
                </div>

                {matchedApps.length === 0 && matchedProds.length === 0 ? (
                  <div className="p-4 text-center text-sm text-slate-500">
                    No results found for "{searchQuery}". Try searching for "PAN", "Aadhaar", "Laptop" or "Pi 5".
                  </div>
                ) : (
                  <div className="space-y-2 max-h-80 overflow-y-auto">
                    {matchedApps.length > 0 && (
                      <div>
                        <div className="text-[11px] font-medium text-slate-500 px-3 py-1 bg-slate-50 rounded">
                          Government Applications ({matchedApps.length})
                        </div>
                        {matchedApps.map((app) => (
                          <div
                            key={app.id}
                            onClick={() => {
                              setActiveTab('documents');
                              setShowSearchDropdown(false);
                            }}
                            className="px-3 py-2 hover:bg-blue-50/70 rounded-lg cursor-pointer transition-colors flex items-center justify-between group"
                          >
                            <div className="flex items-center gap-2.5">
                              <FileText className="w-4 h-4 text-blue-600" />
                              <div>
                                <div className="text-sm font-medium text-slate-800 group-hover:text-blue-600">
                                  {app.applicantName} ({app.id})
                                </div>
                                <div className="text-xs text-slate-500">{app.documentType} • {app.department}</div>
                              </div>
                            </div>
                            <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-slate-100 text-slate-700">
                              {app.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {matchedProds.length > 0 && (
                      <div>
                        <div className="text-[11px] font-medium text-slate-500 px-3 py-1 bg-slate-50 rounded">
                          Electronics Marketplace ({matchedProds.length})
                        </div>
                        {matchedProds.map((prod) => (
                          <div
                            key={prod.id}
                            onClick={() => {
                              setActiveTab('electronics');
                              setShowSearchDropdown(false);
                            }}
                            className="px-3 py-2 hover:bg-emerald-50/70 rounded-lg cursor-pointer transition-colors flex items-center justify-between group"
                          >
                            <div className="flex items-center gap-2.5">
                              <Laptop className="w-4 h-4 text-emerald-600" />
                              <div>
                                <div className="text-sm font-medium text-slate-800 group-hover:text-emerald-700 line-clamp-1">
                                  {prod.title}
                                </div>
                                <div className="text-xs text-slate-500">{prod.category} • SKU: {prod.sku}</div>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <div className="text-sm font-bold text-slate-900">₹{prod.price.toLocaleString('en-IN')}</div>
                              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                                Verified
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Actions & Utility Shortcuts */}
          <div className="flex items-center gap-2.5 shrink-0">
            
            {/* Quick PDF Tool Shortcut */}
            <button
              onClick={() => setActiveTab('pdftools')}
              title="Launch In-Browser PDF & Scan Suite"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100/90 hover:bg-blue-50 hover:text-blue-700 rounded-lg border border-slate-200 transition-all cursor-pointer"
            >
              <FileStack className="w-3.5 h-3.5 text-blue-600" />
              <span>PDF Tools</span>
              <span className="text-[10px] bg-blue-100 text-blue-800 px-1 rounded">&lt;200KB</span>
            </button>

            {/* Apply New Citizen Document */}
            <button
              onClick={openApplyModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Apply Service</span>
            </button>

            {/* Notifications Popover */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => {
                  setShowNotifPopover(!showNotifPopover);
                  if (!showNotifPopover) markNotificationsAsRead();
                }}
                className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                title="System Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-amber-500 rounded-full ring-2 ring-white animate-pulse" />
                )}
              </button>

              {showNotifPopover && (
                <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-slate-900">Notifications</span>
                      <span className="text-xs bg-blue-50 text-blue-700 font-medium px-2 py-0.5 rounded-full">
                        {notifications.length} updates
                      </span>
                    </div>
                    <button 
                      onClick={markNotificationsAsRead}
                      className="text-xs text-blue-600 hover:underline cursor-pointer"
                    >
                      Mark all read
                    </button>
                  </div>

                  <div className="space-y-2 max-h-72 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          if (n.linkTab) setActiveTab(n.linkTab as ActiveTab);
                          setShowNotifPopover(false);
                        }}
                        className={`p-2.5 rounded-lg border transition-colors cursor-pointer ${
                          n.unread 
                            ? 'bg-blue-50/60 border-blue-100 hover:bg-blue-50' 
                            : 'bg-white border-slate-100 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <span className="text-xs font-semibold text-slate-900">{n.title}</span>
                          <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Shopping Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Verified Electronics Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-emerald-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile Pill */}
            <div className="hidden lg:flex items-center gap-2.5 pl-2.5 border-l border-slate-200">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Citizen Profile"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/30"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                  <span>Arun Sharma</span>
                  <CheckCircle2 className="w-3 h-3 text-blue-600" />
                </div>
                <div className="text-[10px] text-slate-500 font-medium">CSC Operator #VLE-4091</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
