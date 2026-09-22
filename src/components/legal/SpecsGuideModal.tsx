import React from 'react';
import { X, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';
import { documentSpecsGuide } from '../../data/mockData';

interface SpecsGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPdfTools: () => void;
}

export const SpecsGuideModal: React.FC<SpecsGuideModalProps> = ({
  isOpen,
  onClose,
  onOpenPdfTools
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col animate-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Official Document Upload Specifications
              </h2>
              <p className="text-xs text-slate-500">
                Compliance rules for Income Tax (NSDL), UIDAI, NFSA & Election Commission Portals
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Strict Size Notice Alert */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 space-y-1">
              <span className="font-bold block">Strict Government Portal Size Limit (Max 200 KB)</span>
              <p className="text-amber-800 leading-relaxed">
                Govt upload servers automatically reject files larger than 200 KB for identity proof or 50 KB for passport photographs. 
                Use our built-in <strong>In-Browser PDF Suite</strong> to compress or resize without leaving your browser.
              </p>
            </div>
          </div>

          {/* Specs Table */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Document Type</th>
                  <th className="py-3 px-4">Max Size</th>
                  <th className="py-3 px-4">Dimensions</th>
                  <th className="py-3 px-4">Accepted Format</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {documentSpecsGuide.map((spec, index) => (
                  <tr key={index} className="hover:bg-slate-50/70">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      <div>{spec.document}</div>
                      <div className="text-[11px] text-slate-400 font-normal">{spec.targetService}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        &lt; {spec.maxSize}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">
                      {spec.dimensions}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-mono">
                      {spec.format}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recommendations checklist */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Scanning Best Practices:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Scan documents at 150 - 200 DPI for best readability</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Merge Aadhaar Front and Back into a single sheet</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Signatures must be signed in black ink on white paper</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>No flash reflections or cropped identity corners</span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onOpenPdfTools();
            }}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors cursor-pointer"
          >
            Launch PDF Compressor (&lt;200KB)
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
