import React from 'react';
import { 
  FileText, 
  FileStack, 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  ArrowUpRight, 
  ShieldCheck, 
  Download, 
  Zap,
  ArrowRight,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import type { LegalApplication, Product, ActiveTab } from '../../types';


interface DashboardOverviewProps {
  applications: LegalApplication[];
  products: Product[];
  setActiveTab: (tab: ActiveTab) => void;
  openApplyModal: () => void;
  onDownloadReceipt: (app: LegalApplication) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  applications,
  products,
  setActiveTab,
  openApplyModal,
  onDownloadReceipt
}) => {
  const approvedCount = applications.filter(a => a.status === 'Approved').length;
  const inReviewCount = applications.filter(a => a.status === 'Govt Verification').length;
  const dispatchedCount = applications.filter(a => a.status === 'Dispatched').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-slate-900 via-indigo-950 to-blue-900 text-white p-6 sm:p-8 shadow-lg border border-slate-800">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Unified Citizen & Enterprise Portal Active
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, Arun Sharma
            </h1>
            <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
              Manage citizen identity applications (PAN, Aadhaar, Ration, Voter ID), 
              access in-browser document compression under 200KB, and procure BIS-certified hardware.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={openApplyModal}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileCheck className="w-4 h-4" />
              <span>Apply New Document</span>
            </button>
            <button
              onClick={() => setActiveTab('pdftools')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileStack className="w-4 h-4 text-blue-300" />
              <span>Launch PDF Suite</span>
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Citizen Applications</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{applications.length}</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> +100% active
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center gap-2">
            <span className="text-emerald-700 font-medium">{approvedCount} approved</span>
            <span>•</span>
            <span className="text-amber-700 font-medium">{inReviewCount} in review</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Verified Hardware</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{products.length}</span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
              100% Genuine
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Across Laptops, Mobiles, IoT & Readers
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">PDF Optimizations</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <FileStack className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">142</span>
            <span className="text-xs font-semibold text-blue-600">Client-Side</span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Reduced to strictly under 200 KB
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg Processing SLA</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">3.4</span>
            <span className="text-xs font-semibold text-slate-500">Days</span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>98.2% on-time dispatch rate</span>
          </div>
        </div>

      </div>

      {/* Quick Launchpad Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Quick Service Launchpad</h2>
          <span className="text-xs text-slate-500">Direct portal entry points</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div 
            onClick={openApplyModal}
            className="group bg-white p-4 rounded-2xl border border-slate-200/80 hover:border-blue-500/50 shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
              <span>Apply PAN / Aadhaar</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Submit Form 49A or UIDAI address change with instant acknowledgement.
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('pdftools')}
            className="group bg-white p-4 rounded-2xl border border-slate-200/80 hover:border-indigo-500/50 shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center justify-between">
              <span>Compress under 200KB</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Instant in-browser scan compression conforming to government upload rules.
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('pdftools')}
            className="group bg-white p-4 rounded-2xl border border-slate-200/80 hover:border-emerald-500/50 shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <FileStack className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-600 transition-colors flex items-center justify-between">
              <span>Passport Photo Resizer</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Crop scans to exact 350x450px and signature to 140x60px specs.
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('electronics')}
            className="group bg-white p-4 rounded-2xl border border-slate-200/80 hover:border-amber-500/50 shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 group-hover:text-amber-600 transition-colors flex items-center justify-between">
              <span>Certified Electronics</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Browse BIS genuine enterprise laptops, biometric readers and IoT modules.
            </p>
          </div>

        </div>
      </div>

      {/* Active Submissions Tracker Preview */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-bold text-base text-slate-900">Recent Citizen Document Submissions</h2>
            <p className="text-xs text-slate-500 mt-0.5">Live tracking from Income Tax, UIDAI & Municipal Portals</p>
          </div>
          <button
            onClick={() => setActiveTab('documents')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Applications ({applications.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">Application ID</th>
                <th className="py-3 px-4">Document Type</th>
                <th className="py-3 px-4">Applicant</th>
                <th className="py-3 px-4">Submitted</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {applications.slice(0, 4).map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-semibold text-blue-600">
                    {app.id}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">
                    {app.documentType}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">
                    {app.applicantName}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {app.submittedDate}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                      app.status === 'Approved'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : app.status === 'Govt Verification'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : app.status === 'Dispatched'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onDownloadReceipt(app)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                    >
                      <Download className="w-3 h-3" />
                      <span>Receipt</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
