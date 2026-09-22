import React, { useState } from 'react';
import { 
  X, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  UploadCloud, 
  CheckCircle2, 
  FileCheck, 
  AlertCircle,
  FileText,
  ShieldAlert,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { LegalApplication, DocumentServiceType } from '../../types';

import { documentCatalogInfo } from '../../data/mockData';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddApplication: (app: LegalApplication) => void;
  initialServiceType?: DocumentServiceType;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({
  isOpen,
  onClose,
  onAddApplication,
  initialServiceType = 'PAN Card New'
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<DocumentServiceType>(initialServiceType);
  
  // Step 1: Applicant Details
  const [applicantName, setApplicantName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [stateName, setStateName] = useState('Maharashtra');

  // Step 2: Specific Data
  const [fatherName, setFatherName] = useState('');
  const [dob, setDob] = useState('1995-05-14');
  const [address, setAddress] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [existingIdNumber, setExistingIdNumber] = useState('');

  // Step 3: Uploaded Files Mock State
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; sizeKB: number }[]>([
    { name: 'Aadhaar_Card_Front_Back.pdf', sizeKB: 168 },
    { name: 'Applicant_Passport_Photo.jpg', sizeKB: 42 }
  ]);
  const [isUploading, setIsUploading] = useState(false);

  // Completed application state for step 4
  const [createdApplication, setCreatedApplication] = useState<LegalApplication | null>(null);

  if (!isOpen) return null;

  const currentServiceInfo = documentCatalogInfo.find(s => s.type === selectedService) || documentCatalogInfo[0];

  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);
      const file = e.target.files[0];
      setTimeout(() => {
        const sizeKB = Math.round(file.size / 1024) || 120;
        setUploadedFiles(prev => [...prev, { name: file.name, sizeKB }]);
        setIsUploading(false);
      }, 600);
    }
  };

  const handleFinalSubmit = () => {
    // Generate IDs
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const prefix = selectedService.includes('PAN') 
      ? 'PAN' 
      : selectedService.includes('Aadhaar') 
      ? 'ADH' 
      : selectedService.includes('Ration') 
      ? 'RAT' 
      : selectedService.includes('Voter') 
      ? 'VTR' 
      : 'TRD';

    const newApp: LegalApplication = {
      id: `${prefix}-2026-${randomNum}`,
      documentType: selectedService,
      applicantName: applicantName || 'Citizen Applicant',
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'Govt Verification',
      trackingNumber: `TRACK-${prefix}-${Math.floor(100000 + Math.random() * 900000)}`,
      department: currentServiceInfo.govtAuthority,
      fee: parseInt(currentServiceInfo.officialFee.replace(/[^0-9]/g, '')) || 0,
      estimatedDays: parseInt(currentServiceInfo.sla) || 5,
      uploadedDocuments: uploadedFiles.map(f => `${f.name} (${f.sizeKB} KB)`),
      contactEmail: email || 'citizen@portal.gov.in',
      contactPhone: phone || '+91 98000 00000',
      notes: `Application lodged via DigiGov Portal. Biometrics verified.`,
      receiptNumber: `RCP-${prefix}-${randomNum}`
    };

    onAddApplication(newApp);
    setCreatedApplication(newApp);
    setStep(4);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }
  };

  const handleResetAndClose = () => {
    setStep(1);
    setApplicantName('');
    setPhone('');
    setEmail('');
    setCreatedApplication(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col animate-in zoom-in-95 duration-150">
        
        {/* Modal Top Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">New Government Document Application</h3>
              <p className="text-[11px] text-slate-500">Official Self-Service Citizen Application Wizard</p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="px-6 py-3 bg-white border-b border-slate-100 flex items-center justify-between">
          {[
            { num: 1, label: 'Service & KYC' },
            { num: 2, label: 'Form Particulars' },
            { num: 3, label: 'Doc Upload' },
            { num: 4, label: 'Confirmation' },
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-colors ${
                step > s.num 
                  ? 'bg-emerald-600 text-white' 
                  : step === s.num 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'bg-slate-100 text-slate-400'
              }`}>
                {step > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
              </div>
              <span className={`text-xs hidden sm:inline font-medium ${step === s.num ? 'text-slate-900 font-bold' : 'text-slate-400'}`}>
                {s.label}
              </span>
              {s.num < 4 && <ChevronRight className="w-3.5 h-3.5 text-slate-300 hidden sm:inline" />}
            </div>
          ))}
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          
          {/* STEP 1: Select Service & Applicant KYC */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Government Document Service
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {documentCatalogInfo.map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() => setSelectedService(cat.type as DocumentServiceType)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        selectedService === cat.type
                          ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">{cat.title}</span>
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-semibold">
                          {cat.officialFee}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{cat.govtAuthority}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Applicant Full Name (as on Aadhaar) *
                  </label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="e.g. Ramesh Chandra Verma"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Phone (for OTP Validation) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Registered Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="citizen.name@gmail.com"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    State / Union Territory
                  </label>
                  <select
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-hidden bg-white"
                  >
                    <option>Maharashtra</option>
                    <option>Delhi NCR</option>
                    <option>Karnataka</option>
                    <option>Gujarat</option>
                    <option>Tamil Nadu</option>
                    <option>Uttar Pradesh</option>
                    <option>West Bengal</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Particulars & Form Specifics */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-xl text-xs text-blue-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Entering particulars for <strong>{selectedService}</strong> ({currentServiceInfo.formNo})</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Father's / Spouse's Full Name *
                  </label>
                  <input
                    type="text"
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                    placeholder="e.g. Surendra Nath Verma"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Date of Birth (DD/MM/YYYY) *
                  </label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-hidden"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Permanent Residential Address (with Flat/House No, Street) *
                  </label>
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Flat 402, Shanti Heights, M.G. Road, Sector 14"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Postal PIN Code *
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    placeholder="400001"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Existing ID Number (Aadhaar / Old PAN if applicable)
                  </label>
                  <input
                    type="text"
                    value={existingIdNumber}
                    onChange={(e) => setExistingIdNumber(e.target.value)}
                    placeholder="e.g. 5412-9910-8471"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-hidden"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Document Upload with Size Limit Guard */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Government Upload Limit: Maximum 200 KB per document</span>
                  <p className="text-amber-800 text-[11px] mt-0.5">
                    Files exceeding 200 KB will be flagged. You can use our built-in PDF Compressor before uploading.
                  </p>
                </div>
              </div>

              {/* Drag and Drop Zone */}
              <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-6 text-center bg-slate-50/50 hover:bg-blue-50/20 transition-colors">
                <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <div className="text-xs font-bold text-slate-800">
                  Upload Supporting Citizen Documents
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Upload Identity Proof, Address Proof or Passport Photo (PDF, JPG, PNG)
                </p>
                <label className="mt-3 inline-block px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors">
                  <span>Browse Files</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleSimulatedFileUpload}
                  />
                </label>
                {isUploading && (
                  <div className="text-xs text-blue-600 font-semibold mt-2 animate-pulse">
                    Encrypting and uploading file...
                  </div>
                )}
              </div>

              {/* Uploaded Documents List */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Attached Verified Documents ({uploadedFiles.length})
                </div>
                {uploadedFiles.map((file, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <div>
                        <div className="text-xs font-semibold text-slate-900">{file.name}</div>
                        <div className="text-[10px] text-slate-400">
                          {file.sizeKB} KB • Validated &lt;200 KB Government Rule
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      Ready for Portal
                    </span>
                  </div>
                ))}
              </div>

              {/* Summary of Fees */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500 block">Applicable Statutory Fee:</span>
                  <span className="font-bold text-slate-900 text-sm">{currentServiceInfo.officialFee}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 block">SLA Resolution:</span>
                  <span className="font-semibold text-blue-700">{currentServiceInfo.sla}</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Confirmation & Instant Receipt */}
          {step === 4 && createdApplication && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md shadow-emerald-500/20">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900">Application Submitted Successfully!</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Your application has been cryptographically lodged with {createdApplication.department}.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-md mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Application ID:</span>
                  <span className="font-mono font-bold text-blue-600">{createdApplication.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tracking Number:</span>
                  <span className="font-mono font-bold text-slate-800">{createdApplication.trackingNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Applicant:</span>
                  <span className="font-semibold text-slate-800">{createdApplication.applicantName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status:</span>
                  <span className="font-bold text-amber-600">{createdApplication.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Official Fee:</span>
                  <span className="font-bold text-slate-900">₹{createdApplication.fee} (Paid)</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400">
                SMS & email updates will be dispatched to {createdApplication.contactPhone}.
              </p>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          {step > 1 && step < 4 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
          ) : (
            <div />
          )}

          {step < 3 && (
            <button
              onClick={() => {
                if (step === 1 && !applicantName) {
                  setApplicantName('Sunil Kumar Verma');
                }
                setStep(step + 1);
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Continue to Next Step</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {step === 3 && (
            <button
              onClick={handleFinalSubmit}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FileCheck className="w-4 h-4" />
              <span>Confirm & Pay Fee</span>
            </button>
          )}

          {step === 4 && (
            <button
              onClick={handleResetAndClose}
              className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer ml-auto"
            >
              Done & Close
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
