import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileCheck, 
  Download, 
  ShieldAlert, 
  Sparkles, 
  CheckCircle2, 
  Sliders,
  RefreshCw
} from 'lucide-react';
import { compressFileToTargetSize, triggerFileDownload } from '../../utils/pdfHelpers';

export const CompressTool: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [targetMaxKB, setTargetMaxKB] = useState<number>(195); // Strictly under 200KB
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{
    blob: Blob;
    dataUrl: string;
    originalKB: number;
    compressedKB: number;
    reductionPercent: number;
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setResult(null);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const handleCompress = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      // Allow visual animation
      setTimeout(async () => {
        try {
          const res = await compressFileToTargetSize(file, targetMaxKB, 0.75);
          setResult(res);
        } catch (err) {
          console.error(err);
        } finally {
          setIsProcessing(false);
        }
      }, 500);
    } catch {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const baseName = file?.name.replace(/\.[^/.]+$/, '') || 'document';
    triggerFileDownload(result.blob, `${baseName}_under200kb.jpg`);
  };

  return (
    <div className="space-y-6">
      
      {/* Tool Introduction & Strict Limit Banner */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
        <div className="text-xs text-blue-900 space-y-1">
          <span className="font-bold block">Strict Government &lt;200 KB Compression Preset</span>
          <p className="text-blue-800 leading-relaxed">
            NSDL, Protean, and UIDAI reject files over 200 KB. This tool compresses your document locally in your browser 
            while keeping text sharp and readable for official biometric and OCR verification.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Side: Upload Zone & Configuration */}
        <div className="space-y-5">
          
          {/* Drag & Drop Zone */}
          <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-6 text-center bg-white hover:bg-blue-50/20 transition-all">
            <UploadCloud className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <div className="text-xs font-bold text-slate-900">
              {file ? file.name : 'Select or Drop Document / ID Scan'}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Supports PDF scans, JPG, PNG, and camera photos
            </p>
            {file && (
              <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                Original Size: {Math.round(file.size / 1024)} KB
              </div>
            )}
            <div className="mt-3">
              <label className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl cursor-pointer shadow-xs transition-colors inline-block">
                <span>{file ? 'Replace Document' : 'Browse File'}</span>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Compression Level Slider & Presets */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
                <Sliders className="w-3.5 h-3.5 text-blue-600" />
                Target Government Size Limit
              </label>
              <span className="font-bold text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                &lt; {targetMaxKB} KB
              </span>
            </div>

            {/* Quick Preset Buttons */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setTargetMaxKB(195)}
                className={`p-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  targetMaxKB === 195 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs' 
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div>Govt &lt; 200KB</div>
                <div className="text-[9px] opacity-80">Aadhaar / PAN</div>
              </button>
              
              <button
                type="button"
                onClick={() => setTargetMaxKB(95)}
                className={`p-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  targetMaxKB === 95 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs' 
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div>Extreme &lt; 100KB</div>
                <div className="text-[9px] opacity-80">State Portals</div>
              </button>

              <button
                type="button"
                onClick={() => setTargetMaxKB(48)}
                className={`p-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  targetMaxKB === 48 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs' 
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div>Photo &lt; 50KB</div>
                <div className="text-[9px] opacity-80">Passport / Sign</div>
              </button>
            </div>

            {/* Range Slider */}
            <div className="space-y-1">
              <input
                type="range"
                min="30"
                max="500"
                step="10"
                value={targetMaxKB}
                onChange={(e) => setTargetMaxKB(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>30 KB (Compact)</span>
                <span>200 KB (Govt Standard)</span>
                <span>500 KB (Detailed)</span>
              </div>
            </div>

            {/* Trigger Button */}
            <button
              onClick={handleCompress}
              disabled={!file || isProcessing}
              className={`w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer ${
                !file || isProcessing
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
              }`}
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Compressing Document with HTML5 Canvas...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Compress Document Now</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Right Side: Visual Comparison & Download */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 flex flex-col justify-between space-y-4">
          
          <div>
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              Document Preview & Size Comparison
            </div>

            {/* Preview Box */}
            <div className="relative h-64 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center">
              {result?.dataUrl ? (
                <img
                  src={result.dataUrl}
                  alt="Compressed Document"
                  className="max-h-full max-w-full object-contain p-2"
                />
              ) : previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Original Document"
                  className="max-h-full max-w-full object-contain p-2"
                />
              ) : (
                <div className="text-center text-slate-400 text-xs">
                  <FileCheck className="w-8 h-8 mx-auto mb-1.5 text-slate-300" />
                  <span>Document preview will appear here</span>
                </div>
              )}

              {result && (
                <div className="absolute top-2 right-2 px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded-full shadow-xs flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Ready for Govt Upload</span>
                </div>
              )}
            </div>

            {/* Metrics Comparison */}
            {result ? (
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium">Original Size</span>
                  <span className="text-xs font-bold text-slate-700">{result.originalKB} KB</span>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  <span className="text-[10px] text-emerald-700 block font-medium">Compressed Size</span>
                  <span className="text-xs font-bold text-emerald-800">{result.compressedKB} KB</span>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                  <span className="text-[10px] text-blue-700 block font-medium">Space Saved</span>
                  <span className="text-xs font-bold text-blue-800">{result.reductionPercent}%</span>
                </div>
              </div>
            ) : (
              <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-center text-xs text-slate-500">
                Upload a document and press "Compress Document Now" to run in-browser compression.
              </div>
            )}
          </div>

          {/* Download CTA */}
          <button
            onClick={handleDownload}
            disabled={!result}
            className={`w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              !result
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Download &lt;200KB Document (JPEG)</span>
          </button>

        </div>

      </div>

    </div>
  );
};
