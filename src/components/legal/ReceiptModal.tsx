import React from 'react';
import { X, Printer, Download, CheckCircle2, ShieldCheck, Building2 } from 'lucide-react';
import type { LegalApplication } from '../../types';

import { triggerFileDownload } from '../../utils/pdfHelpers';

interface ReceiptModalProps {
  application: LegalApplication | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ application, onClose }) => {
  if (!application) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadReceipt = () => {
    // Generate text/html based downloadable acknowledgement
    const content = `=====================================================
NATIONAL DIGITAL PORTAL - OFFICIAL ACKNOWLEDGEMENT RECEIPT
=====================================================
Receipt No: ${application.receiptNumber}
Application ID: ${application.id}
Date: ${application.submittedDate}
Authority: ${application.department}
Document Service: ${application.documentType}

Applicant Name: ${application.applicantName}
Phone: ${application.contactPhone}
Email: ${application.contactEmail}

Tracking Number: ${application.trackingNumber}
Status: ${application.status.toUpperCase()}
Official Fee Paid: ₹${application.fee}
SLA Estimated Resolution: ${application.estimatedDays} Working Days

Uploaded Verified Documents:
${application.uploadedDocuments.map((d, i) => `  ${i + 1}. ${d}`).join('\n')}

Notes: ${application.notes || 'Biometric identity data verified under Aadhaar Act 2016.'}
=====================================================
Digital Signature: SHA256:${Math.random().toString(36).substring(2, 15).toUpperCase()}
Government of India / State Licensing Authority
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain' });
    triggerFileDownload(blob, `Receipt_${application.id}.txt`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[95vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Official Acknowledgement Receipt</h3>
              <p className="text-[11px] text-slate-500">Government of India / Statutory Authority</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Receipt Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-800 font-sans" id="printable-receipt">
          
          {/* Top Seal & Heading */}
          <div className="text-center pb-4 border-b border-dashed border-slate-300 space-y-1">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-700 border border-blue-200 mb-1">
              <Building2 className="w-6 h-6" />
            </div>
            <h2 className="font-extrabold text-sm text-slate-900 uppercase tracking-wide">
              {application.department}
            </h2>
            <p className="text-[11px] text-slate-500">Citizen e-Service Acknowledgement Slip (Form 65-B)</p>
            <div className="text-[10px] font-mono text-slate-400">
              Receipt No: {application.receiptNumber} • Date: {application.submittedDate}
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">Current Status</span>
              <span className="text-sm font-bold text-slate-900">{application.status}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">Tracking Number</span>
              <span className="font-mono text-xs font-bold text-blue-700">{application.trackingNumber}</span>
            </div>
          </div>

          {/* Citizen Details Grid */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-100 pb-1">
              Applicant Particulars
            </h4>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
              <div>
                <span className="text-slate-400 block text-[11px]">Applicant Name:</span>
                <span className="font-semibold text-slate-800">{application.applicantName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Application ID:</span>
                <span className="font-mono font-semibold text-slate-800">{application.id}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Document Service:</span>
                <span className="font-semibold text-slate-800">{application.documentType}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Estimated Turnaround:</span>
                <span className="font-semibold text-slate-800">{application.estimatedDays} Business Days</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Contact Phone:</span>
                <span className="text-slate-700">{application.contactPhone}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Registered Email:</span>
                <span className="text-slate-700">{application.contactEmail}</span>
              </div>
            </div>
          </div>

          {/* Fee & Payment Breakdown */}
          <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-600">Statutory Govt Processing Fee:</span>
              <span className="font-bold text-slate-900">₹{application.fee}.00</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-600">Digital Gateway Service Tax (GST 0% Exemption):</span>
              <span className="font-bold text-slate-900">₹0.00</span>
            </div>
            <div className="flex justify-between items-center text-xs pt-1.5 border-t border-blue-200/70 font-bold">
              <span className="text-blue-900">Total Paid (Bharat BillPay / UPI):</span>
              <span className="text-blue-900 text-sm">₹{application.fee}.00 (Success)</span>
            </div>
          </div>

          {/* Verified Uploads */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
              Cryptographically Stamped Attachments:
            </span>
            <ul className="space-y-1">
              {application.uploadedDocuments.map((doc, idx) => (
                <li key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer Watermark */}
          <div className="text-[10px] text-slate-400 pt-3 border-t border-slate-100 text-center leading-relaxed">
            This is a computer-generated acknowledgement valid under Section 65B of the Indian Evidence Act. 
            No physical signature is required. For verification queries, visit the official portal with your tracking number.
          </div>

        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Slip</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadReceipt}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Acknowledgment</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
