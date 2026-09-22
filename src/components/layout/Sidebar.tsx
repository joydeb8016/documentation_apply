import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  FileStack, 
  ShoppingBag, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  HardDrive,
  Headphones,
  CheckCircle2,
  Lock
} from 'lucide-react';
import type { ActiveTab } from '../../types';


interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
  applicationsCount: number;
  productsCount: number;
  openChat: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  applicationsCount,
  productsCount,
  openChat
}) => {
  const navItems = [
    {
      id: 'overview' as ActiveTab,
      label: 'Executive Overview',
      icon: LayoutDashboard,
      badge: null,
      description: 'Platform summary & stats'
    },
    {
      id: 'documents' as ActiveTab,
      label: 'Document Services',
      icon: FileText,
      badge: `${applicationsCount}`,
      description: 'Aadhaar, PAN & licenses'
    },
    {
      id: 'pdftools' as ActiveTab,
      label: 'PDF & Image Suite',
      icon: FileStack,
      badge: '4 Tools',
      badgeColor: 'bg-blue-100 text-blue-700',
      description: 'Compress, merge & resize'
    },
    {
      id: 'electronics' as ActiveTab,
      label: 'Electronics Market',
      icon: ShoppingBag,
      badge: `${productsCount}`,
      description: 'Verified genuine hardware'
    }
  ];

  return (
    <aside
      className={`relative bg-white border-r border-slate-200/80 transition-all duration-300 flex flex-col z-20 select-none ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Collapse Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3.5 top-6 w-7 h-7 bg-white border border-slate-200 text-slate-500 hover:text-slate-900 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all z-30 cursor-pointer"
        title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      {/* Navigation Section */}
      <div className="flex-1 py-6 px-3 space-y-6 overflow-y-auto">
        
        <div>
          {!collapsed && (
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
              Primary Navigation
            </div>
          )}

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  title={collapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 font-semibold'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? 'text-white' : 'text-slate-500'}`} />

                  {!collapsed && (
                    <div className="flex-1 text-left flex items-center justify-between">
                      <span className="truncate">{item.label}</span>
                      {item.badge && (
                        <span
                          className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : item.badgeColor || 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Assistant Callout */}
        {!collapsed ? (
          <div className="p-3.5 bg-linear-to-br from-slate-900 to-indigo-950 text-white rounded-2xl shadow-sm space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-blue-500/30 flex items-center justify-center">
                <Headphones className="w-3.5 h-3.5 text-blue-300" />
              </div>
              <span className="text-xs font-bold text-slate-100">Hybrid AI Seva Desk</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Instant PAN/Aadhaar status lookups, hardware specs & human ticket generation.
            </p>
            <button
              onClick={openChat}
              className="w-full py-1.5 px-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Ask AI Assistant
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={openChat}
              title="Open AI Assistant"
              className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-blue-600 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <Headphones className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Cloud Storage & Quota Meter */}
        {!collapsed && (
          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5 text-slate-500" />
                Govt Document Vault
              </span>
              <span className="text-slate-700">14.2%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full w-[14.2%]" />
            </div>
            <div className="flex justify-between text-[10px] text-slate-600">
              <span>14.2 MB Uploaded</span>
              <span>100 MB Limit</span>
            </div>
          </div>
        )}

      </div>

      {/* Sidebar Footer / Authority Status */}
      <div className="p-4 border-t border-slate-200/80 bg-slate-50/50">
        {!collapsed ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-slate-700">All Govt Portals Online</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-slate-600">
              <Lock className="w-3 h-3 text-emerald-600" />
              <span>UIDAI • NSDL • MCA Encrypted</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center" title="All Services Operational">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>
        )}
      </div>

    </aside>
  );
};
