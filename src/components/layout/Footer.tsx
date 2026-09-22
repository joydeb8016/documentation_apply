import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  PhoneCall, 
  Mail, 
  HelpCircle, 
  FileText, 
  FileStack, 
  Cpu,
  Globe2
} from 'lucide-react';
import type { ActiveTab } from '../../types';


interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  openChat: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, openChat }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-sm mt-auto">
      
      {/* Security & Compliance Highlights Banner */}
      <div className="border-b border-slate-800/80 bg-slate-950/60 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">256-Bit TLS Encryption</div>
              <div className="text-[11px] text-slate-400">Zero plain-text document storage</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">UIDAI & NSDL Compliant</div>
              <div className="text-[11px] text-slate-400">Strict IT Act 2000 Section 65A adherence</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">100% BIS Genuine Hardware</div>
              <div className="text-[11px] text-slate-400">Tested enterprise compliance certs</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/20">
              <Globe2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">In-Browser Private Processing</div>
              <div className="text-[11px] text-slate-400">PDFs processed 100% on your device</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white">OmniGov & TechNode</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The unified digital public infrastructure gateway bringing citizen identity services, 
              in-browser government document compression, and enterprise electronics marketplace 
              into a single high-availability client portal.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
                <span>Helpline: 1800-180-1961</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>support@omnigov.gov.in</span>
              </div>
            </div>
          </div>

          {/* Citizen Legal Documents */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              Identity Portals
            </div>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button onClick={() => setActiveTab('documents')} className="hover:text-white transition-colors cursor-pointer">
                  New PAN Card (Form 49A)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('documents')} className="hover:text-white transition-colors cursor-pointer">
                  Aadhaar Address Update
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('documents')} className="hover:text-white transition-colors cursor-pointer">
                  NFSA Digital Ration Card
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('documents')} className="hover:text-white transition-colors cursor-pointer">
                  Voter ID (EPIC Card Form 6)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('documents')} className="hover:text-white transition-colors cursor-pointer">
                  Municipal Commercial Trade License
                </button>
              </li>
            </ul>
          </div>

          {/* In-Browser PDF Suite */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <FileStack className="w-3.5 h-3.5 text-indigo-400" />
              PDF & Scan Suite
            </div>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button onClick={() => setActiveTab('pdftools')} className="hover:text-white transition-colors cursor-pointer">
                  Compress Document (&lt;200 KB)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('pdftools')} className="hover:text-white transition-colors cursor-pointer">
                  Merge Aadhaar Front & Back
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('pdftools')} className="hover:text-white transition-colors cursor-pointer">
                  JPG / PNG to PDF Converter
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('pdftools')} className="hover:text-white transition-colors cursor-pointer">
                  Passport Photo Resizer (350x450)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('pdftools')} className="hover:text-white transition-colors cursor-pointer">
                  Signature Scan Resizer (140x60)
                </button>
              </li>
            </ul>
          </div>

          {/* Electronics & Support */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              Certified Tech
            </div>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button onClick={() => setActiveTab('electronics')} className="hover:text-white transition-colors cursor-pointer">
                  Govt Certified Laptops
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('electronics')} className="hover:text-white transition-colors cursor-pointer">
                  Aadhaar Biometric Readers
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('electronics')} className="hover:text-white transition-colors cursor-pointer">
                  Raspberry Pi IoT Kits
                </button>
              </li>
              <li>
                <button onClick={openChat} className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer text-blue-400">
                  <HelpCircle className="w-3 h-3" />
                  <span>Ask AI Seva Assistant</span>
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 py-4 px-4 sm:px-6 lg:px-8 bg-slate-950 text-[11px] text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span>© 2026 OmniGov & TechNode Portal. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-emerald-500 font-medium">SSL 256-Bit SHA-2 Encrypted</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Citizen Charter</span>
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">Grievance Redressal</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
