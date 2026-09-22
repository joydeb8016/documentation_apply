import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileType, 
  Download, 
  CheckCircle2, 
  RefreshCw, 
  Settings2,
  FileCheck
} from 'lucide-react';
import { triggerFileDownload } from '../../utils/pdfHelpers';

export const ConvertTool: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [margin, setMargin] = useState<'none' | 'small' | 'standard'>('small');
  const [isConverting, setIsConverting] = useState(false);
  const [convertedDataUrl, setConvertedDataUrl] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
      setConvertedDataUrl(null);
    }
  };

  const handleConvert = () => {
    if (!file) return;
    setIsConverting(true);

    setTimeout(() => {
      const img = new Image();
      img.onload = () => {
        const isPortrait = orientation === 'portrait';
        const canvas = document.createElement('canvas');
        canvas.width = isPortrait ? 1240 : 1754;
        canvas.height = isPortrait ? 1754 : 1240;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          let marginPx = 0;
          if (margin === 'small') marginPx = 40;
          if (margin === 'standard') marginPx = 80;

          const drawW = canvas.width - marginPx * 2;
          const drawH = canvas.height - marginPx * 2;

          const ratio = Math.min(drawW / img.width, drawH / img.height);
          const finalW = img.width * ratio;
          const finalH = img.height * ratio;
          const finalX = marginPx + (drawW - finalW) / 2;
          const finalY = marginPx + (drawH - finalH) / 2;

          ctx.drawImage(img, finalX, finalY, finalW, finalH);

          const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
          setConvertedDataUrl(dataUrl);
          setIsConverting(false);
        }
      };
      img.src = previewUrl;
    }, 500);
  };

  const handleDownload = () => {
    if (!convertedDataUrl) return;
    const baseName = file?.name.replace(/\.[^/.]+$/, '') || 'converted_document';
    triggerFileDownload(convertedDataUrl, `${baseName}_converted.jpg`);
  };

  return (
    <div className="space-y-6">
      
      <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl flex items-start gap-3">
        <FileType className="w-5 h-5 text-indigo-700 shrink-0 mt-0.5" />
        <div className="text-xs text-indigo-900 space-y-1">
          <span className="font-bold block">Instant JPG / PNG to Document Format Converter</span>
          <p className="text-indigo-800 leading-relaxed">
            Convert standard smartphone camera photos and scanned image files into clean document sheets 
            with customizable page margins and orientation.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Settings & Dropzone */}
        <div className="space-y-4">
          
          <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-6 text-center bg-white hover:bg-blue-50/20 transition-all">
            <UploadCloud className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <div className="text-xs font-bold text-slate-900">
              {file ? file.name : 'Upload JPG, JPEG or PNG Image'}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Supports single or multi-resolution image scans
            </p>
            <div className="mt-3">
              <label className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl cursor-pointer shadow-xs transition-colors inline-block">
                <span>{file ? 'Change Image' : 'Select Image File'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Orientation & Margins */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 space-y-4">
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Settings2 className="w-3.5 h-3.5 text-blue-600" />
              Document Layout Settings
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">Page Orientation</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setOrientation('portrait')}
                  className={`p-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    orientation === 'portrait'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Portrait (Vertical A4)
                </button>
                <button
                  type="button"
                  onClick={() => setOrientation('landscape')}
                  className={`p-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    orientation === 'landscape'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Landscape (Horizontal)
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">Page Margin</label>
              <div className="grid grid-cols-3 gap-2">
                {(['none', 'small', 'standard'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMargin(m)}
                    className={`p-2 rounded-xl text-xs font-semibold capitalize border transition-all cursor-pointer ${
                      margin === m
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleConvert}
              disabled={!file || isConverting}
              className={`w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                !file || isConverting
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20'
              }`}
            >
              {isConverting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Generating Formatted Document...</span>
                </>
              ) : (
                <>
                  <FileType className="w-4 h-4" />
                  <span>Convert to Clean Document</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Right: Output Preview */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 flex flex-col justify-between space-y-4">
          <div>
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              Generated Document Sheet
            </div>

            <div className="relative h-80 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center">
              {convertedDataUrl ? (
                <img
                  src={convertedDataUrl}
                  alt="Converted Document"
                  className="max-h-full max-w-full object-contain p-2 shadow-xs"
                />
              ) : previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Source"
                  className="max-h-full max-w-full object-contain p-2"
                />
              ) : (
                <div className="text-center text-slate-400 text-xs p-4">
                  <FileCheck className="w-8 h-8 mx-auto mb-1.5 text-slate-300" />
                  <span>Image preview will display here</span>
                </div>
              )}

              {convertedDataUrl && (
                <div className="absolute top-2 right-2 px-2.5 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded-full shadow-xs flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>A4 Ready Document</span>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleDownload}
            disabled={!convertedDataUrl}
            className={`w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              !convertedDataUrl
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Download Converted Document (JPEG)</span>
          </button>
        </div>

      </div>

    </div>
  );
};
