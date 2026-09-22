import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  PlusCircle, 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  HelpCircle, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  FileCheck,
  Building2,
  FileEdit,
  Award,
  Store,
  ChevronRight,
  Eye
} from 'lucide-react';
import type { LegalApplication, DocumentStatus, DocumentServiceType } from '../../types';

import { documentCatalogInfo } from '../../data/mockData';

interface DocumentHubProps {
  applications: LegalApplication[];
  openApplyModalWithService: (service: DocumentServiceType) => void;
  openSpecsGuide: () => void;
  onViewReceipt: (app: LegalApplication) => void;
}

export const DocumentHub: React.FC<DocumentHubProps> = ({
  applications,
  openApplyModalWithService,
  openSpecsGuide,
  onViewReceipt
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');

  // Filtered applications
  const filteredApps = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch = 
        app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.contactPhone.includes(searchTerm);

      const matchesStatus = selectedStatus === 'All' || app.status === selectedStatus;
      const matchesType = selectedType === 'All' || app.documentType === selectedType;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [applications, searchTerm, selectedStatus, selectedType]);

  const statuses: (DocumentStatus | 'All')[] = [
    'All',
    'Pending Upload',
    'Govt Verification',
    'Dispatched',
    'Approved'
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Top Section: Header & Specifications Guide Alert Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Government Identity & Legal Document Services
            </h1>
            <span className="text-xs bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full border border-blue-200">
              Official Portal
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Official citizen application catalog, real-time status tracker, and government document upload gateway.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openSpecsGuide}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span>Document Size & DPI Guide</span>
          </button>
          <button
            onClick={() => openApplyModalWithService('PAN Card New')}
            className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Apply For New Document</span>
          </button>
        </div>
      </div>

      {/* Official Government Size Rule Callout Banner */}
      <div className="p-4 bg-linear-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0 border border-blue-400/30">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <span>Statutory Compliance: Max 200 KB per Document Scan</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded">
                Strict Limit
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Ensure all Aadhaar, PAN, and address scans are under 200 KB before submitting to avoid NSDL/UIDAI server rejection.
            </p>
          </div>
        </div>
        <button
          onClick={openSpecsGuide}
          className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg border border-white/20 shrink-0 transition-colors cursor-pointer"
        >
          View Dimension Specs
        </button>
      </div>

      {/* 1. APPLICATION CATALOG GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            Citizen Application Catalog (Direct Apply)
          </h2>
          <span className="text-xs text-slate-500">5 Verified Services Available</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {documentCatalogInfo.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden group"
            >
              {/* Card Top Strip */}
              <div className="p-5 flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {service.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <div className="text-[11px] text-slate-400 font-medium">
                    {service.formNo} • {service.govtAuthority}
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Required Docs Mini List */}
                <div className="pt-2 border-t border-slate-100 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Required Uploads:
                  </span>
                  {service.requiredDocs.map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span className="truncate">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer with SLA & Fee */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Govt Fee / SLA</span>
                  <div className="text-xs font-bold text-slate-900">
                    {service.officialFee} <span className="text-slate-400 font-normal">• {service.sla}</span>
                  </div>
                </div>
                <button
                  onClick={() => openApplyModalWithService(service.type as DocumentServiceType)}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Apply Now</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. ACTIVE SUBMISSIONS TRACKER TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden space-y-4">
        
        {/* Table Controls & Filter Bar */}
        <div className="p-5 border-b border-slate-100 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-bold text-base text-slate-900">
                Active Submissions Tracker
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time status updates synced with Income Tax (NSDL/Protean), UIDAI, and Municipal databases
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Applicant, ID, or Tracking #"
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-hidden transition-all"
              />
            </div>
          </div>

          {/* Status Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs text-slate-400 font-semibold shrink-0 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Status:
            </span>
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  selectedStatus === st
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-5">Application ID</th>
                <th className="py-3.5 px-4">Document Type</th>
                <th className="py-3.5 px-4">Applicant Name</th>
                <th className="py-3.5 px-4">Submitted Date</th>
                <th className="py-3.5 px-4">Current Status</th>
                <th className="py-3.5 px-4">Download Receipt</th>
                <th className="py-3.5 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-500">
                    No applications matched your search filters.
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* ID */}
                    <td className="py-4 px-5">
                      <div className="font-mono font-bold text-blue-600 text-xs">{app.id}</div>
                      <div className="font-mono text-[10px] text-slate-400">{app.trackingNumber}</div>
                    </td>

                    {/* Document Type */}
                    <td className="py-4 px-4 font-semibold text-slate-800">
                      <div>{app.documentType}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{app.department}</div>
                    </td>

                    {/* Applicant */}
                    <td className="py-4 px-4">
                      <div className="font-medium text-slate-900">{app.applicantName}</div>
                      <div className="text-[10px] text-slate-500">{app.contactPhone}</div>
                    </td>

                    {/* Submitted Date */}
                    <td className="py-4 px-4 text-slate-600">
                      <div>{app.submittedDate}</div>
                      <div className="text-[10px] text-slate-400">SLA: {app.estimatedDays} Days</div>
                    </td>

                    {/* Status Pill */}
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${
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

                    {/* Receipt */}
                    <td className="py-4 px-4">
                      <button
                        onClick={() => onViewReceipt(app)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Slip</span>
                      </button>
                    </td>

                    {/* Action Button */}
                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={() => onViewReceipt(app)}
                        className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
                        title="View Full Application Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Showing {filteredApps.length} of {applications.length} citizen applications</span>
          <span className="text-[11px]">Synced with NSDL & UIDAI Servers</span>
        </div>

      </div>

    </div>
  );
};
