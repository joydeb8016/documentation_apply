import type { LegalApplication, Product, NotificationItem } from '../types';

export const initialApplications: LegalApplication[] = [
  {
    id: 'PAN-2026-8841',
    documentType: 'PAN Card New',
    applicantName: 'Vikramaditya Sharma',
    submittedDate: '2026-09-18',
    status: 'Approved',
    trackingNumber: 'NSDL-994018291-IN',
    department: 'Income Tax Department (NSDL/Protean)',
    fee: 107,
    estimatedDays: 4,
    uploadedDocuments: ['Aadhaar Card (Proof of Identity)', 'Voter ID (Proof of Address)', 'Passport Photo 350x450px'],
    contactEmail: 'vikram.sharma@gmail.com',
    contactPhone: '+91 98765 43210',
    notes: 'Physical PAN dispatched via Speed Post tracking #EM409823199IN.',
    receiptNumber: 'RCP-PAN-9841'
  },
  {
    id: 'ADH-2026-9912',
    documentType: 'Aadhaar Address Update',
    applicantName: 'Pooja Rajesh Nair',
    submittedDate: '2026-09-20',
    status: 'Govt Verification',
    trackingNumber: 'UIDAI-URN-8820194821',
    department: 'Unique Identification Authority of India (UIDAI)',
    fee: 50,
    estimatedDays: 3,
    uploadedDocuments: ['Electricity Bill (Aug 2026)', 'Rent Agreement Gazetted'],
    contactEmail: 'pooja.nair@outlook.com',
    contactPhone: '+91 98450 11223',
    notes: 'Document under biometric cryptographic cross-check with state server.',
    receiptNumber: 'RCP-ADH-9912'
  },
  {
    id: 'RAT-2026-5501',
    documentType: 'Digital Ration Card',
    applicantName: 'Rameshwar Lal Patel',
    submittedDate: '2026-09-14',
    status: 'Dispatched',
    trackingNumber: 'NFSA-RC-40192841',
    department: 'Department of Food & Public Distribution (NFSA)',
    fee: 30,
    estimatedDays: 7,
    uploadedDocuments: ['Income Certificate 2026', 'Family Head Aadhaar', 'LPG Gas Book Frontpage'],
    contactEmail: 'rameshwar.patel@yahoo.com',
    contactPhone: '+91 97110 54321',
    notes: 'Smart NFC Digital Ration Card dispatched to Tehsil Food Inspector Office.',
    receiptNumber: 'RCP-RAT-5501'
  },
  {
    id: 'VTR-2026-0041',
    documentType: 'Voter ID (EPIC)',
    applicantName: 'Ananya Mehra',
    submittedDate: '2026-09-21',
    status: 'Pending Upload',
    trackingNumber: 'ECI-FORM6-102948',
    department: 'Election Commission of India (ECI)',
    fee: 0,
    estimatedDays: 10,
    uploadedDocuments: ['High School Leaving Certificate'],
    contactEmail: 'ananya.mehra@gmail.com',
    contactPhone: '+91 99201 88472',
    notes: 'Pending upload of attested passport photograph under 50 KB.',
    receiptNumber: 'RCP-VTR-0041'
  },
  {
    id: 'TRD-2026-3109',
    documentType: 'Trade License',
    applicantName: 'TechVibe Solutions LLP',
    submittedDate: '2026-09-17',
    status: 'Govt Verification',
    trackingNumber: 'MCD-TL-2026-9481',
    department: 'Municipal Corporation (Revenue & Licensing Dept)',
    fee: 2500,
    estimatedDays: 5,
    uploadedDocuments: ['Shop Commercial Lease', 'GST Registration Cert', 'NOC Fire Safety'],
    contactEmail: 'compliance@techvibe.in',
    contactPhone: '+91 98100 99881',
    notes: 'Ward Inspector field inspection scheduled for 23rd Sept 2026.',
    receiptNumber: 'RCP-TRD-3109'
  },
  {
    id: 'PAN-2026-7732',
    documentType: 'PAN Card Correction',
    applicantName: 'Kavita Suresh Deshmukh',
    submittedDate: '2026-09-12',
    status: 'Approved',
    trackingNumber: 'UTIITSL-CORR-30918',
    department: 'Income Tax Department (UTIITSL)',
    fee: 107,
    estimatedDays: 3,
    uploadedDocuments: ['Gazette Notification for Surname Change', 'Marriage Certificate', 'Old PAN Copy'],
    contactEmail: 'kavita.deshmukh@gmail.com',
    contactPhone: '+91 96541 22334',
    notes: 'Correction approved. e-PAN generated and delivered to email.',
    receiptNumber: 'RCP-PAN-7732'
  }
];

export const documentCatalogInfo = [
  {
    id: 'pan',
    type: 'PAN Card New',
    title: 'New PAN Card Registration',
    formNo: 'Form 49A / 49AA',
    govtAuthority: 'Income Tax Dept (NSDL / UTIITSL)',
    sla: '3-5 Working Days',
    officialFee: '₹107',
    iconName: 'FileCheck',
    color: 'from-blue-600 to-indigo-700',
    description: 'Instant 10-digit Permanent Account Number issuance with biometric Aadhaar e-KYC or physical paper dispatch.',
    requiredDocs: ['Aadhaar Card / Voter ID (Identity)', 'Bank Statement / Electricity Bill (Address)', 'Passport Photo (3.5x4.5cm, <50KB)'],
    badge: 'High Demand'
  },
  {
    id: 'pan-corr',
    type: 'PAN Card Correction',
    title: 'PAN Correction & Name Update',
    formNo: 'Form 49A Correction',
    govtAuthority: 'NSDL Protean e-Gov',
    sla: '4-7 Working Days',
    officialFee: '₹107',
    iconName: 'FileEdit',
    color: 'from-sky-600 to-blue-700',
    description: 'Update misspelling in applicant name, father’s name, date of birth, or signature on your existing PAN Card.',
    requiredDocs: ['Existing PAN Copy', 'Gazette / Marriage Cert (Name Change)', 'Updated Aadhaar Proof'],
    badge: 'Quick e-Sign'
  },
  {
    id: 'aadhaar',
    type: 'Aadhaar Address Update',
    title: 'Aadhaar Address & Phone Update',
    formNo: 'UIDAI Online Self-Service',
    govtAuthority: 'UIDAI (Govt of India)',
    sla: '24-48 Hours',
    officialFee: '₹50',
    iconName: 'ShieldCheck',
    color: 'from-emerald-600 to-teal-700',
    description: 'Update residential address, mobile phone linkage, and biometric update using valid gazetted residential proof.',
    requiredDocs: ['Valid Address Proof (Rent Agreement, Utility Bill)', 'Mobile OTP Linkage', 'Self-attested scan (<200KB)'],
    badge: 'Fastest SLA'
  },
  {
    id: 'ration',
    type: 'Digital Ration Card',
    title: 'Digital Smart Ration Card',
    formNo: 'NFSA Form II',
    govtAuthority: 'Dept of Food & Public Distribution',
    sla: '7-10 Working Days',
    officialFee: '₹30',
    iconName: 'Building2',
    color: 'from-amber-600 to-yellow-700',
    description: 'Apply for National Food Security Act (NFSA) subsidized digital ration card with family member biometric integration.',
    requiredDocs: ['Family Head Aadhaar Card', 'Annual Income Certificate', 'Recent Group Family Photo (<100KB)'],
    badge: 'Govt Subsidy'
  },
  {
    id: 'voter',
    type: 'Voter ID (EPIC)',
    title: 'Digital Voter ID (EPIC Card)',
    formNo: 'ECI Form 6',
    govtAuthority: 'Election Commission of India',
    sla: '10-15 Working Days',
    officialFee: 'Free (₹0)',
    iconName: 'Award',
    color: 'from-purple-600 to-indigo-700',
    description: 'Register as new elector in parliamentary constituency. Instant digital e-EPIC card download with color QR code.',
    requiredDocs: ['Age Proof (Birth Certificate / 10th Marksheet)', 'Address Proof (Passport, Driving License)', 'Passport Photo (<50KB)'],
    badge: '100% Free'
  },
  {
    id: 'trade',
    type: 'Trade License',
    title: 'Municipal Commercial Trade License',
    formNo: 'Schedule IV / Section 421',
    govtAuthority: 'State Municipal Corporation',
    sla: '5-7 Working Days',
    officialFee: '₹2,500',
    iconName: 'Store',
    color: 'from-rose-600 to-pink-700',
    description: 'Statutory commercial trade permission for operating IT hardware cafes, electronics shops, and cyber kiosks.',
    requiredDocs: ['Shop Ownership / Lease Deed', 'GST Registration', 'Fire Dept NOC / Electric Load Letter'],
    badge: 'Commercial'
  }
];

export const documentSpecsGuide = [
  {
    document: 'Passport Size Photograph',
    targetService: 'PAN, Aadhaar, Voter ID, Passport',
    format: 'JPG, JPEG',
    dimensions: '3.5 cm × 4.5 cm (350 × 450 pixels)',
    dpi: '200 to 300 DPI',
    maxSize: '50 KB',
    guideline: 'Plain white/light background, 80% face coverage, no colored glasses or caps.'
  },
  {
    document: 'Applicant Signature Scan',
    targetService: 'PAN Card, Passport, ECI Voter',
    format: 'JPG, PNG',
    dimensions: '2 cm × 4.5 cm (140 × 60 pixels)',
    dpi: '200 DPI',
    maxSize: '20 KB',
    guideline: 'Signed in dark black ink on plain unlined white paper. Must not touch borders.'
  },
  {
    document: 'Proof of Identity (Aadhaar / Voter / Passport)',
    targetService: 'All Citizen Identity Portals',
    format: 'PDF / JPG',
    dimensions: 'Standard A4 Document (Both Front & Back merged)',
    dpi: '150 to 200 DPI',
    maxSize: '200 KB',
    guideline: 'All 4 corners clearly visible. Must not be blurred or obscured by reflections.'
  },
  {
    document: 'Supporting Address Proof (Electricity / Bank Statement)',
    targetService: 'Aadhaar, Trade License, PAN',
    format: 'PDF (Single or Multi-page)',
    dimensions: 'Standard A4 Size',
    dpi: '150 DPI (Grayscale or Color)',
    maxSize: '500 KB',
    guideline: 'Utility bills must not be older than 3 months. Bank seal or e-statement stamp required.'
  },
  {
    document: 'Commercial Property Lease / GST Certificate',
    targetService: 'Municipal Trade License',
    format: 'PDF',
    dimensions: 'Legal / A4 Size',
    dpi: '200 DPI',
    maxSize: '2 MB',
    guideline: 'Must contain registered notary stamp or official sub-registrar deed watermark.'
  }
];

export const initialProducts: Product[] = [
  {
    id: 'PROD-101',
    title: 'Lenovo ThinkPad E14 Gen 5 (Intel Core i5 13th Gen, 16GB, 512GB SSD)',
    category: 'Laptops',
    price: 58990,
    originalPrice: 79990,
    stock: 14,
    rating: 4.8,
    reviewsCount: 142,
    sku: 'TP-E14-G5-512',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
    verifiedGenuine: true,
    complianceBadges: ['BIS Certified', 'Govt IT Approved', 'Energy Star 8.0'],
    specs: {
      Processor: 'Intel Core i5-1335U (10 Cores, up to 4.6GHz)',
      RAM: '16GB DDR4 3200MHz',
      Storage: '512GB M.2 PCIe Gen4 NVMe SSD',
      Display: '14.0" FHD IPS Anti-Glare (300 nits)',
      OS: 'Windows 11 Pro Genuine'
    },
    warranty: '3 Years Onsite Manufacturer Warranty',
    inStock: true
  },
  {
    id: 'PROD-102',
    title: 'Samsung Galaxy S23 5G Enterprise Edition (8GB RAM, 128GB Storage)',
    category: 'Mobile Devices',
    price: 46999,
    originalPrice: 74999,
    stock: 8,
    rating: 4.7,
    reviewsCount: 230,
    sku: 'SM-S911B-ENT',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80',
    verifiedGenuine: true,
    complianceBadges: ['BIS Certified', 'Samsung Knox Secured', 'WPC Approved'],
    specs: {
      Processor: 'Snapdragon 8 Gen 2 for Galaxy',
      Camera: '50MP + 12MP + 10MP Telephoto with OIS',
      Battery: '3900 mAh Fast Wireless Charging',
      Security: 'Knox Enterprise Hardware Vault & e-SIM'
    },
    warranty: '2 Years Enterprise Warranty & 5Y Security Patches',
    inStock: true
  },
  {
    id: 'PROD-103',
    title: 'Raspberry Pi 5 Official Desktop Starter Kit (8GB RAM, 64GB Extreme SD)',
    category: 'Components',
    price: 9499,
    originalPrice: 12999,
    stock: 26,
    rating: 4.9,
    reviewsCount: 88,
    sku: 'RPI5-8GB-KIT',
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=800&q=80',
    verifiedGenuine: true,
    complianceBadges: ['BIS Certified', 'RoHS Compliant', 'CE / FCC Certified'],
    specs: {
      Processor: 'Broadcom BCM2712 Quad-Core Arm Cortex-A76 @ 2.4GHz',
      RAM: '8GB LPDDR4X-4267 SDRAM',
      Connectivity: 'Dual 4K60p HDMI, PCIe 2.0 interface, Gigabit Ethernet',
      Included: 'Official 27W USB-C PSU, Active Cooler, Heavy-Duty Case'
    },
    warranty: '1 Year Direct Replacement Warranty',
    inStock: true
  },
  {
    id: 'PROD-104',
    title: 'Smart Card & Aadhaar Biometric Dual Contact/Contactless Reader ACR39U',
    category: 'Components',
    price: 2450,
    originalPrice: 3800,
    stock: 45,
    rating: 4.6,
    reviewsCount: 310,
    sku: 'ACR-39U-CSC',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    verifiedGenuine: true,
    complianceBadges: ['UIDAI Tested', 'ISO 7816 Compliant', 'Govt CSC Certified'],
    specs: {
      Interface: 'USB 2.0 Full Speed Plug & Play',
      Standards: 'ISO 7816 Class A, B, and C (5V, 3V, 1.8V)',
      Drivers: 'Windows 10/11, Linux CCID, Android OTG',
      Application: 'CSC VLE Aadhaar eKYC, Digital Signatures (DSC Class 3)'
    },
    warranty: '2 Years Manufacturer Replacement',
    inStock: true
  },
  {
    id: 'PROD-105',
    title: 'HP Pavilion 15 (AMD Ryzen 7 7730U, 16GB, 1TB SSD, AMD Radeon Graphics)',
    category: 'Laptops',
    price: 63490,
    originalPrice: 84900,
    stock: 6,
    rating: 4.7,
    reviewsCount: 94,
    sku: 'HP-15-R7-1TB',
    image: 'https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80',
    verifiedGenuine: true,
    complianceBadges: ['BIS Certified', 'Govt IT Approved', 'EPEAT Silver'],
    specs: {
      Processor: 'AMD Ryzen 7 7730U (8 Cores, 16 Threads, up to 4.5GHz)',
      RAM: '16GB DDR4 3200MHz',
      Storage: '1TB M.2 NVMe PCIe SSD',
      Display: '15.6" FHD Micro-Edge IPS (250 nits)'
    },
    warranty: '1 Year Onsite + 1 Year Accidental Damage Protection',
    inStock: true
  },
  {
    id: 'PROD-106',
    title: 'Samsung Galaxy Watch 6 LTE 44mm (Graphite, Blood Pressure & ECG Monitor)',
    category: 'Wearables',
    price: 19999,
    originalPrice: 33999,
    stock: 12,
    rating: 4.8,
    reviewsCount: 167,
    sku: 'GW6-44-LTE',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    verifiedGenuine: true,
    complianceBadges: ['BIS Certified', 'CDSCO Approved Sensors', 'WPC Wireless'],
    specs: {
      Connectivity: '4G LTE Standalone e-SIM & Bluetooth 5.3',
      Display: '1.5" Super AMOLED Sapphire Crystal Glass',
      Health: 'BioActive Sensor (ECG, Optical Heart Rate, BIA Body Composition)',
      Waterproof: '5ATM + IP68 / MIL-STD-810H Military Spec'
    },
    warranty: '1 Year Samsung India Warranty',
    inStock: true
  },
  {
    id: 'PROD-107',
    title: 'Crucial T500 1TB Gen4 NVMe M.2 SSD with Heatsink (Up to 7400MB/s)',
    category: 'Components',
    price: 8299,
    originalPrice: 11999,
    stock: 31,
    rating: 4.9,
    reviewsCount: 78,
    sku: 'CT-1000-T500',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80',
    verifiedGenuine: true,
    complianceBadges: ['BIS Certified', 'RoHS Compliant', '500TBW Endurance'],
    specs: {
      ReadSpeed: 'Up to 7,400 MB/s Sequential Read',
      WriteSpeed: 'Up to 7,000 MB/s Sequential Write',
      FormFactor: 'M.2 2280 with Integrated Aluminum Heatsink',
      Controller: 'Phison PS5025-E25 with Micron 232-Layer TLC NAND'
    },
    warranty: '5 Years Manufacturer Limited Warranty',
    inStock: true
  },
  {
    id: 'PROD-108',
    title: 'OnePlus Nord CE 4 5G (8GB RAM, 256GB, Celadon Marble, 100W SUPERVOOC)',
    category: 'Mobile Devices',
    price: 24999,
    originalPrice: 26999,
    stock: 19,
    rating: 4.6,
    reviewsCount: 312,
    sku: '1P-NORD-CE4',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    verifiedGenuine: true,
    complianceBadges: ['BIS Certified', 'TUV SUD 48-Month Fluency', 'WPC Approved'],
    specs: {
      Processor: 'Qualcomm Snapdragon 7 Gen 3 (4nm)',
      Charging: '100W SUPERVOOC Fast Charge (1-100% in 29 mins)',
      Camera: '50MP Sony LYT-600 with OIS',
      Battery: '5500 mAh High-Density'
    },
    warranty: '1 Year Brand Warranty',
    inStock: true
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'NOTIF-1',
    title: 'PAN Card #PAN-2026-8841 Approved',
    message: 'Income Tax Department verified digital credentials. Physical card dispatched via India Post.',
    time: '15 mins ago',
    type: 'document',
    unread: true,
    linkTab: 'documents'
  },
  {
    id: 'NOTIF-2',
    title: 'New Hardware Stock: Raspberry Pi 5 8GB',
    message: 'Batch of 30 official starter kits with BIS certified 27W PSU arrived in stock.',
    time: '2 hours ago',
    type: 'order',
    unread: true,
    linkTab: 'electronics'
  },
  {
    id: 'NOTIF-3',
    title: 'Municipal Trade License Field Inspection',
    message: 'Ward inspector assigned for Trade License #TRD-2026-3109 on 23rd Sept.',
    time: '5 hours ago',
    type: 'document',
    unread: false,
    linkTab: 'documents'
  },
  {
    id: 'NOTIF-4',
    title: 'PDF Portal Compression Engine Updated',
    message: 'Govt portal strict <200KB profile optimized for Aadhaar and NSDL file standards.',
    time: '1 day ago',
    type: 'system',
    unread: false,
    linkTab: 'pdftools'
  }
];
