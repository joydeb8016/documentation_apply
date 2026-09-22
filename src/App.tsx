import React, { useState } from 'react';
import type { 
  LegalApplication, 
  Product, 
  CartItem, 
  NotificationItem, 
  ActiveTab, 
  DocumentServiceType,
  SupportTicket
} from './types';

import { 
  initialApplications, 
  initialProducts, 
  initialNotifications 
} from './data/mockData';

// Layout
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';

// Views
import { DashboardOverview } from './components/overview/DashboardOverview';
import { DocumentHub } from './components/legal/DocumentHub';
import { PdfTools } from './components/pdf/PdfTools';
import { ElectronicsShop } from './components/electronics/ElectronicsShop';

// Modals & Drawers
import { ApplyModal } from './components/legal/ApplyModal';
import { SpecsGuideModal } from './components/legal/SpecsGuideModal';
import { ReceiptModal } from './components/legal/ReceiptModal';
import { AddProductModal } from './components/electronics/AddProductModal';
import { CartDrawer } from './components/electronics/CartDrawer';
import { ChatbotWidget } from './components/support/ChatbotWidget';
import { SupportTicketModal } from './components/support/SupportTicketModal';

export function App() {
  // Navigation & Layout
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  // Data Collections
  const [applications, setApplications] = useState<LegalApplication[]>(initialApplications);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [_tickets, setTickets] = useState<SupportTicket[]>([]);

  // Modals & Drawers State
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applyServiceType, setApplyServiceType] = useState<DocumentServiceType>('PAN Card New');
  const [isSpecsGuideOpen, setIsSpecsGuideOpen] = useState(false);
  const [receiptApp, setReceiptApp] = useState<LegalApplication | null>(null);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [ticketInquiry, setTicketInquiry] = useState<string | null>(null);

  // Toast / notification feedback banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Handlers for Applications
  const handleAddApplication = (newApp: LegalApplication) => {
    setApplications(prev => [newApp, ...prev]);
    showToast(`Application ${newApp.id} lodged successfully with ${newApp.department}!`);

    // Add notification
    const newNotif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: `New ${newApp.documentType} Submitted`,
      message: `Application ${newApp.id} for ${newApp.applicantName} registered. Tracking ID: ${newApp.trackingNumber}`,
      time: 'Just now',
      type: 'document',
      unread: true,
      linkTab: 'documents'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleOpenApplyModalWithService = (service: DocumentServiceType) => {
    setApplyServiceType(service);
    setIsApplyModalOpen(true);
  };

  // Handlers for Cart
  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`Added "${product.title.slice(0, 30)}..." to Procurement Cart!`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Handlers for Products
  const handleAddProduct = (newProd: Product) => {
    setProducts(prev => [newProd, ...prev]);
    showToast(`New Hardware "${newProd.title}" listed in catalog with BIS approval!`);
  };

  // Handlers for Tickets
  const handleTicketCreated = (ticket: SupportTicket) => {
    setTickets(prev => [ticket, ...prev]);
    showToast(`Support Ticket ${ticket.id} registered! An officer will call within 4 hours.`);
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const cartTotalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
      
      {/* Toast Alert Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2.5 animate-in fade-in slide-in-from-top-2 duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartTotalCount}
        openCart={() => setIsCartOpen(true)}
        openApplyModal={() => setIsApplyModalOpen(true)}
        notifications={notifications}
        markNotificationsAsRead={markNotificationsAsRead}
        products={products}
        applications={applications}
      />

      {/* Main Layout Container */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Collapsible Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          applicationsCount={applications.length}
          productsCount={products.length}
          openChat={() => setIsChatbotOpen(true)}
        />

        {/* Scrollable Center Body Area */}
        <main className="flex-1 overflow-y-auto flex flex-col">
          <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex-1">
            
            {activeTab === 'overview' && (
              <DashboardOverview
                applications={applications}
                products={products}
                setActiveTab={setActiveTab}
                openApplyModal={() => setIsApplyModalOpen(true)}
                onDownloadReceipt={(app) => setReceiptApp(app)}
              />
            )}

            {activeTab === 'documents' && (
              <DocumentHub
                applications={applications}
                openApplyModalWithService={handleOpenApplyModalWithService}
                openSpecsGuide={() => setIsSpecsGuideOpen(true)}
                onViewReceipt={(app) => setReceiptApp(app)}
              />
            )}

            {activeTab === 'pdftools' && (
              <PdfTools />
            )}

            {activeTab === 'electronics' && (
              <ElectronicsShop
                products={products}
                onAddToCart={handleAddToCart}
                openAddProductModal={() => setIsAddProductModalOpen(true)}
              />
            )}

          </div>

          {/* Proper Rich Enterprise & Government Footer */}
          <Footer
            setActiveTab={setActiveTab}
            openChat={() => setIsChatbotOpen(true)}
          />
        </main>

      </div>

      {/* Interactive Modals */}
      <ApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        onAddApplication={handleAddApplication}
        initialServiceType={applyServiceType}
      />

      <SpecsGuideModal
        isOpen={isSpecsGuideOpen}
        onClose={() => setIsSpecsGuideOpen(false)}
        onOpenPdfTools={() => {
          setIsSpecsGuideOpen(false);
          setActiveTab('pdftools');
        }}
      />

      <ReceiptModal
        application={receiptApp}
        onClose={() => setReceiptApp(null)}
      />

      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onAddProduct={handleAddProduct}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      <SupportTicketModal
        isOpen={ticketInquiry !== null}
        onClose={() => setTicketInquiry(null)}
        initialInquiry={ticketInquiry || ''}
        onTicketCreated={handleTicketCreated}
      />

      {/* Floating Hybrid Support Chatbot Widget */}
      <ChatbotWidget
        isOpen={isChatbotOpen}
        setIsOpen={setIsChatbotOpen}
        setActiveTab={setActiveTab}
        onAddToCart={handleAddToCart}
        onOpenTicketModal={(inquiryText) => {
          setIsChatbotOpen(false);
          setTicketInquiry(inquiryText);
        }}
        applications={applications}
        products={products}
      />

    </div>
  );
}

export default App;
