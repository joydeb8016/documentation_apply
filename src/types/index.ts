export type DocumentStatus = 'Pending Upload' | 'Govt Verification' | 'Dispatched' | 'Approved';

export type DocumentServiceType = 
  | 'PAN Card New'
  | 'PAN Card Correction'
  | 'Aadhaar Address Update'
  | 'Aadhaar Biometric'
  | 'Digital Ration Card'
  | 'Voter ID (EPIC)'
  | 'Trade License';

export interface LegalApplication {
  id: string;
  documentType: DocumentServiceType;
  applicantName: string;
  submittedDate: string;
  status: DocumentStatus;
  trackingNumber: string;
  department: string;
  fee: number;
  estimatedDays: number;
  uploadedDocuments: string[];
  contactEmail: string;
  contactPhone: string;
  notes?: string;
  receiptNumber: string;
}

export type ProductCategory = 'Laptops' | 'Mobile Devices' | 'Components' | 'Wearables';

export interface Product {
  id: string;
  title: string;
  category: ProductCategory;
  price: number;
  originalPrice: number;
  stock: number;
  rating: number;
  reviewsCount: number;
  sku: string;
  image: string;
  verifiedGenuine: boolean;
  complianceBadges: string[];
  specs: Record<string, string>;
  warranty: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  cardType?: 'application_status' | 'product_card' | 'tool_shortcut' | 'support_escalation' | 'specs_guide';
  data?: any;
}

export interface SupportTicket {
  id: string;
  citizenName: string;
  email: string;
  phone: string;
  category: 'Document Verification' | 'Electronics Order' | 'PDF Utility' | 'Grievance';
  priority: 'Normal' | 'Urgent' | 'Critical';
  inquiry: string;
  createdAt: string;
  status: 'Open' | 'In Progress' | 'Resolved';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'document' | 'order' | 'system';
  unread: boolean;
  linkTab?: string;
}

export type ActiveTab = 'overview' | 'documents' | 'pdftools' | 'electronics';

export const TYPES_VERSION = '1.0.0';
