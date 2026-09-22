import React, { useState } from 'react';
import { X, Headphones, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import type { SupportTicket } from '../../types';


interface SupportTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialInquiry?: string;
  onTicketCreated: (ticket: SupportTicket) => void;
}

export const SupportTicketModal: React.FC<SupportTicketModalProps> = ({
  isOpen,
  onClose,
  initialInquiry = '',
  onTicketCreated
}) => {
  const [citizenName, setCitizenName] = useState('Arun Sharma');
  const [email, setEmail] = useState('arun.sharma@gmail.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [category, setCategory] = useState<'Document Verification' | 'Electronics Order' | 'PDF Utility' | 'Grievance'>('Document Verification');
  const [priority, setPriority] = useState<'Normal' | 'Urgent' | 'Critical'>('Urgent');
  const [inquiry, setInquiry] = useState(initialInquiry || '');
  const [submittedTicketId, setSubmittedTicketId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ticketId = `TICK-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newTicket: SupportTicket = {
      id: ticketId,
      citizenName,
      email,
      phone,
      category,
      priority,
      inquiry,
      createdAt: new Date().toISOString(),
      status: 'Open'
    };

    onTicketCreated(newTicket);
    setSubmittedTicketId(ticketId);
  };

  const handleDone = () => {
    setSubmittedTicketId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Contact Human Support Desk</h3>
              <p className="text-[11px] text-slate-500">Escalate Inquiry to Government Grievance Officer</p>
            </div>
          </div>
          <button
            onClick={handleDone}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {submittedTicketId ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900">Support Ticket Registered!</h4>
              <p className="text-xs font-mono font-bold text-blue-600 mt-1">
                {submittedTicketId}
              </p>
            </div>
            <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
              Your inquiry has been logged in the National Grievance Portal. A duty officer will respond via email or call within 4 working hours.
            </p>
            <div className="pt-2">
              <button
                onClick={handleDone}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
            
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-blue-900 text-[11px]">
              Our AI couldn't resolve your specific query. Please verify the inquiry details below to connect directly with an officer.
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Citizen Full Name *</label>
                <input
                  type="text"
                  required
                  value={citizenName}
                  onChange={(e) => setCitizenName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-blue-600 outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Phone *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-blue-600 outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-blue-600 outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category *</label>
                <select
                  value={category}
                  onChange={(e: any) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-blue-600 outline-hidden bg-white"
                >
                  <option value="Document Verification">Document Verification</option>
                  <option value="Electronics Order">Electronics Order</option>
                  <option value="PDF Utility">PDF Utility</option>
                  <option value="Grievance">Citizen Grievance</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={(e: any) => setPriority(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-blue-600 outline-hidden bg-white"
                >
                  <option value="Normal">Normal (24h)</option>
                  <option value="Urgent">Urgent (4h)</option>
                  <option value="Critical">Critical (1h)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Inquiry Details *</label>
              <textarea
                rows={3}
                required
                value={inquiry}
                onChange={(e) => setInquiry(e.target.value)}
                placeholder="Describe your issue or question in detail..."
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-blue-600 outline-hidden"
              />
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={handleDone}
                className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded-xl border border-slate-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Ticket</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
