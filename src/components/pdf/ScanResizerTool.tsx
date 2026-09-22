import React, { useState } from 'react';
import { 
  UploadCloud, 
  Crop, 
  Download, 
  CheckCircle2, 
  RefreshCw, 
  User, 
  PenTool, 
  CreditCard,
  Maximize2
} from 'lucide-react';
import { resizeImageToExactDimensions, triggerFileDownload } from '../../utils/pdfHelpers';

type PresetType = 'passport' | 'signature' | 'aadhaar' | 'custom';

export const ScanResizerTool: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [preset, setPreset] = useState<PresetType>('passport');
  
  // Dimensions
  const [targetWidth, setTargetWidth] = useState<number>(350);
  const [targetHeight, setTargetHeight] = useState<number>(450);
  const [targetFormat, setTargetFormat] = useState<'image/jpeg' | 'image/png'>('image/jpeg');

  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{
    blob: Blob;
    dataUrl: string;
    sizeKB: number;
  } | null>(null);

  const handleSelectPreset = (p: PresetType) => {
    setPreset(p);
    setResult(null);

    if (p === 'passport') {
      setTargetWidth(350);
      setTargetHeight(450);
      setTargetFormat('image/jpeg');
    } else if (p === 'signature') {
      setTargetWidth(140);
      setTargetHeight(60);
      setTargetFormat('image/jpeg');
    } else if (p === 'aadhaar') {
      setTargetWidth(800);
      setTargetHeight(500);
      setTargetFormat('image/jpeg');
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
      setResult(null);
    }
  };

  const handleResize = async () => {
    if (!file) return;
    setIsProcessing(true);

    setTimeout(async () => {
      try {
        const quality = preset === 'signature' ? 0.85 : 0.9;
        const res = await resizeImageToExactDimensions(
          file,
          targetWidth,
          targetHeight,
          targetFormat,
          quality
        );
        setResult(res);
      } catch (err) {
        console.error('Resize error:', err);
      } finally {
        setIsProcessing(false);
      }
    }, 500);
  };

  const handleDownload = () => {
    if (!result) return;
    const ext = targetFormat === 'image/jpeg' ? 'jpg' : 'png';
    const prefix = preset === 'passport' 
      ? 'passport_photo_350x450' 
      : preset === 'signature' 
      ? 'signature_scan_140x60' 
      : 'resized_scan';
    triggerFileDownload(result.blob, `${prefix}.${ext}`);
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl flex items-start gap-3">
        <Crop className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
        <div className="text-xs text-purple-900 space-y-1">
          <span className="font-bold block">Government Dimension Presets: Passport Photo & Signature</span>
          <p className="text-purple-800 leading-relaxed">
            Automatic pixel aspect scaling ensuring <strong>Passport Photos (350x450px)</strong> and <strong>Signatures (140x60px)</strong> 
            match strict NSDL, UPSC, and SSC online form validation requirements with pure white background padding.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Presets & File Upload */}
        <div className="space-y-4">
          
          <div className="border-2 border-dashed border-slate-300 hover:border-purple-500 rounded-2xl p-6 text-center bg-white hover:bg-purple-50/20 transition-all">
            <UploadCloud className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <div className="text-xs font-bold text-slate-900">
              {file ? file.name : 'Upload Photo or Signature Scan'}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Supports raw smartphone snapshots or scanned images
            </p>
            <div className="mt-3">
              <label className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-xl cursor-pointer shadow-xs transition-colors inline-block">
                <span>{file ? 'Replace File' : 'Select Photo / Signature'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Official Preset Chooser */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 space-y-4">
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Select Official Government Dimension Preset
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              
              <button
                type="button"
                onClick={() => handleSelectPreset('passport')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  preset === 'passport'
                    ? 'border-purple-600 bg-purple-50/60 ring-2 ring-purple-500/20'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-purple-600" />
                  <span className="text-xs font-bold text-slate-900">Passport Photo</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">350 × 450 px (3.5 × 4.5 cm)</div>
                <div className="text-[10px] text-purple-700 font-semibold mt-0.5">PAN / Aadhaar / Passport</div>
              </button>

              <button
                type="button"
                onClick={() => handleSelectPreset('signature')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  preset === 'signature'
                    ? 'border-purple-600 bg-purple-50/60 ring-2 ring-purple-500/20'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <PenTool className="w-4 h-4 text-purple-600" />
                  <span className="text-xs font-bold text-slate-900">Signature Scan</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">140 × 60 px (2 × 4.5 cm)</div>
                <div className="text-[10px] text-purple-700 font-semibold mt-0.5">NSDL & UPSC &lt;20KB</div>
              </button>

              <button
                type="button"
                onClick={() => handleSelectPreset('aadhaar')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  preset === 'aadhaar'
                    ? 'border-purple-600 bg-purple-50/60 ring-2 ring-purple-500/20'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-purple-600" />
                  <span className="text-xs font-bold text-slate-900">Aadhaar Card Scan</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">800 × 500 px</div>
                <div className="text-[10px] text-purple-700 font-semibold mt-0.5">Standard ID Card Ratio</div>
              </button>

              <button
                type="button"
                onClick={() => handleSelectPreset('custom')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  preset === 'custom'
                    ? 'border-purple-600 bg-purple-50/60 ring-2 ring-purple-500/20'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Maximize2 className="w-4 h-4 text-purple-600" />
                  <span className="text-xs font-bold text-slate-900">Custom Dimensions</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Exact W × H in Pixels</div>
                <div className="text-[10px] text-purple-700 font-semibold mt-0.5">Manual Entry</div>
              </button>

            </div>

            {/* Manual Dimensions Input if Custom */}
            {preset === 'custom' && (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Width (px)</label>
                  <input
                    type="number"
                    value={targetWidth}
                    onChange={(e) => setTargetWidth(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-purple-600 outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Height (px)</label>
                  <input
                    type="number"
                    value={targetHeight}
                    onChange={(e) => setTargetHeight(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-purple-600 outline-hidden"
                  />
                </div>
              </div>
            )}

            <button
              onClick={handleResize}
              disabled={!file || isProcessing}
              className={`w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                !file || isProcessing
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                  : 'bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-500/20'
              }`}
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Cropping & Resizing on Canvas...</span>
                </>
              ) : (
                <>
                  <Crop className="w-4 h-4" />
                  <span>Resize to {targetWidth} × {targetHeight} px</span>
                </>
              )}
            </button>

          </div>

        </div>

        {/* Right: Resized Live Canvas Preview */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 flex flex-col justify-between space-y-4">
          <div>
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              Compliant Output Preview ({targetWidth} × {targetHeight} px)
            </div>

            <div className="relative h-80 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center p-4">
              {result?.dataUrl ? (
                <div className="text-center space-y-2">
                  <img
                    src={result.dataUrl}
                    alt="Resized"
                    className="max-h-60 max-w-full object-contain mx-auto shadow-sm border border-slate-200 bg-white"
                  />
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Exact: {targetWidth} × {targetHeight} px • {result.sizeKB} KB</span>
                  </div>
                </div>
              ) : previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Original"
                  className="max-h-full max-w-full object-contain p-2"
                />
              ) : (
                <div className="text-center text-slate-400 text-xs">
                  <User className="w-8 h-8 mx-auto mb-1.5 text-slate-300" />
                  <span>Upload photo/signature to preview crop</span>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleDownload}
            disabled={!result}
            className={`w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              !result
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                : 'bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-500/20'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Download Resized Scan ({targetWidth}×{targetHeight})</span>
          </button>
        </div>

      </div>

    </div>
  );
};
