import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileStack, 
  Trash2, 
  Download, 
  CheckCircle2, 
  RefreshCw, 
  ShieldCheck,
  ArrowUpDown
} from 'lucide-react';
import { mergeImagesToSingleSheet, triggerFileDownload } from '../../utils/pdfHelpers';

export const MergeTool: React.FC = () => {
  const [files, setFiles] = useState<{ id: string; file: File; preview: string; name: string }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mergedResult, setMergedResult] = useState<{
    blob: Blob;
    dataUrl: string;
    sizeKB: number;
  } | null>(null);

  const handleAddFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((f) => ({
        id: Math.random().toString(36).substring(2, 9),
        file: f,
        preview: URL.createObjectURL(f),
        name: f.name
      }));
      setFiles(prev => [...prev, ...newFiles]);
      setMergedResult(null);
    }
  };

  const handleRemoveFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    setMergedResult(null);
  };

  const handleMoveFile = (index: number, direction: 'up' | 'down') => {
    const newArr = [...files];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx >= 0 && targetIdx < newArr.length) {
      const temp = newArr[index];
      newArr[index] = newArr[targetIdx];
      newArr[targetIdx] = temp;
      setFiles(newArr);
      setMergedResult(null);
    }
  };

  const handleMerge = async () => {
    if (files.length < 2) return;
    setIsProcessing(true);

    try {
      setTimeout(async () => {
        try {
          const rawFiles = files.map(f => f.file);
          const res = await mergeImagesToSingleSheet(rawFiles, 'CONSOLIDATED AADHAAR / IDENTITY PROOF');
          setMergedResult(res);
        } catch (err) {
          console.error('Merge failed:', err);
        } finally {
          setIsProcessing(false);
        }
      }, 600);
    } catch {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!mergedResult) return;
    triggerFileDownload(mergedResult.blob, 'Consolidated_Aadhaar_Front_Back.jpg');
  };

  return (
    <div className="space-y-6">
      
      {/* Aadhaar Merger Banner */}
      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div className="text-xs text-emerald-900 space-y-1">
          <span className="font-bold block">Aadhaar Front + Back Single Sheet Consolidation</span>
          <p className="text-emerald-800 leading-relaxed">
            Many government portals require both front (photo/QR) and back (address) sides of Aadhaar or Voter ID combined on a single page. 
            Upload both sides here to generate a verified, consolidated document ready for upload.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: File Uploader & Reordering */}
        <div className="space-y-4">
          
          <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-6 text-center bg-white hover:bg-blue-50/20 transition-all">
            <FileStack className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <div className="text-xs font-bold text-slate-900">
              Select Front & Back ID Scans
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Select 2 or more images (Aadhaar Front, Aadhaar Back, Signature)
            </p>
            <div className="mt-3">
              <label className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl cursor-pointer shadow-xs transition-colors inline-block">
                <span>Add Documents</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleAddFiles}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* List of Loaded Documents */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
              <span>Document Order ({files.length})</span>
              <span className="text-[10px] text-slate-400 font-normal">Reorder to arrange page layout</span>
            </div>

            {files.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400">
                No documents added yet. Please select Front & Back scans.
              </div>
            ) : (
              <div className="space-y-2">
                {files.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.preview}
                        alt="Thumb"
                        className="w-10 h-10 object-cover rounded-lg border border-slate-200 bg-white"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-900">
                          {idx === 0 ? 'Page 1 (e.g. Front Side)' : `Page ${idx + 1} (e.g. Back Side)`}
                        </span>
                        <div className="text-[10px] text-slate-500 truncate max-w-48">{item.name}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {idx > 0 && (
                        <button
                          onClick={() => handleMoveFile(idx, 'up')}
                          className="p-1 hover:bg-slate-200 rounded text-slate-600 cursor-pointer"
                          title="Move Up"
                        >
                          <ArrowUpDown className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => handleRemoveFile(item.id)}
                        className="p-1 hover:bg-rose-100 rounded text-rose-600 cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={handleMerge}
              disabled={files.length < 2 || isProcessing}
              className={`w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                files.length < 2 || isProcessing
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20'
              }`}
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Merging Documents into Consolidated Sheet...</span>
                </>
              ) : (
                <>
                  <FileStack className="w-4 h-4" />
                  <span>Merge into Single Identity Sheet</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Right: Merged Consolidated Preview */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 flex flex-col justify-between space-y-4">
          <div>
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              Consolidated Identity Preview
            </div>

            <div className="relative h-80 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center">
              {mergedResult?.dataUrl ? (
                <img
                  src={mergedResult.dataUrl}
                  alt="Merged Sheet"
                  className="max-h-full max-w-full object-contain p-2 shadow-xs"
                />
              ) : (
                <div className="text-center text-slate-400 text-xs p-4">
                  <FileStack className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                  <span>Upload Front & Back scans and click Merge</span>
                </div>
              )}

              {mergedResult && (
                <div className="absolute top-2 right-2 px-2.5 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-full shadow-xs flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Consolidated A4 Sheet ({mergedResult.sizeKB} KB)</span>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleDownload}
            disabled={!mergedResult}
            className={`w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              !mergedResult
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Download Merged Identity Sheet (JPEG)</span>
          </button>
        </div>

      </div>

    </div>
  );
};
