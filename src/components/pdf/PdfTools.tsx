import React, { useState } from 'react';
import { 
  FileStack, 
  Crop, 
  FileType, 
  Layers, 
  Lock
} from 'lucide-react';
import { CompressTool } from './CompressTool';
import { MergeTool } from './MergeTool';
import { ConvertTool } from './ConvertTool';
import { ScanResizerTool } from './ScanResizerTool';

export const PdfTools: React.FC = () => {
  const [activeSubTool, setActiveSubTool] = useState<'compress' | 'merge' | 'convert' | 'resizer'>('compress');

  const tools = [
    {
      id: 'compress' as const,
      name: 'Compress Document',
      badge: 'Strict < 200 KB',
      icon: Layers,
      description: 'Reduce size to satisfy NSDL & UIDAI portal limits'
    },
    {
      id: 'merge' as const,
      name: 'Merge Aadhaar (Front+Back)',
      badge: 'Consolidated A4',
      icon: FileStack,
      description: 'Combine multiple identity sides into single sheet'
    },
    {
      id: 'convert' as const,
      name: 'JPG to Document',
      badge: 'Instant A4',
      icon: FileType,
      description: 'Convert smartphone camera photos to clean documents'
    },
    {
      id: 'resizer' as const,
      name: 'Passport & Signature Resizer',
      badge: 'Exact 350x450 / 140x60',
      icon: Crop,
      description: 'Resize passport photos & signatures to government specs'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              In-Browser PDF & Document Utility Suite
            </h1>
            <span className="text-xs bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded-full border border-indigo-200">
              Zero Server Uploads
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Official client-side processing inspired by iLovePDF. All compression, cropping and merging happens 100% in your browser.
          </p>
        </div>

        {/* Privacy Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>100% Privacy: Files Never Leave Your Computer</span>
        </div>
      </div>

      {/* Tool Switcher Tabs / Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {tools.map((t) => {
          const Icon = t.icon;
          const isActive = activeSubTool === t.id;

          return (
            <button
              key={t.id}
              onClick={() => setActiveSubTool(t.id)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-white border-blue-600 shadow-md ring-2 ring-blue-500/20'
                  : 'bg-white/80 hover:bg-white border-slate-200/80 shadow-xs hover:shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between w-full mb-2">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'
                }`}>
                  {t.badge}
                </span>
              </div>

              <div>
                <h3 className={`font-bold text-xs ${isActive ? 'text-blue-600' : 'text-slate-900'}`}>
                  {t.name}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                  {t.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Tool View Container */}
      <div className="bg-slate-50/70 p-6 rounded-3xl border border-slate-200 shadow-xs">
        {activeSubTool === 'compress' && <CompressTool />}
        {activeSubTool === 'merge' && <MergeTool />}
        {activeSubTool === 'convert' && <ConvertTool />}
        {activeSubTool === 'resizer' && <ScanResizerTool />}
      </div>

    </div>
  );
};
