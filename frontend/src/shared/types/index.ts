export type UserRole = 'OWNER' | 'RECEPTION' | 'STAFF';

export type AppointmentStatus =
  | 'BOOKED'
  | 'CHECKED_IN'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'NO_SHOW'
  | 'CANCELLED';

export type BookingSource = 'WALK_IN' | 'PHONE' | 'APP';

export type PaymentMethod = 'CASH' | 'UPI' | 'CARD';

export type InvoiceStatus = 'PAID' | 'VOID';

export interface ShiftSchedule {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // "09:00"
  endTime: string;   // "19:00"
  isWorkingDay: boolean;
  breakStart?: string;
  breakEnd?: string;
}

export interface CommissionConfig {
  servicePct: number;
  retailPct: number;
}

export interface UserProfile {
  _id: string;
  salonId: string;
  role: UserRole;
  name: string;
  phone: string;
  isActive: boolean;
  shiftSchedule?: ShiftSchedule[];
  commission?: CommissionConfig;
}

export interface SalonConfig {
  _id: string;
  name: string;
  address: string;
  timezone: string;
  currency: string;
  taxConfig: {
    gstRate: number;
    gstin?: string;
  };
  discountPolicy: {
    receptionMaxPct: number;
  };
}

export interface Customer {
  _id: string;
  salonId: string;
  name: string;
  phone: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  notes?: string;
  allergies?: string[];
  loyaltyPoints: number;
  lastVisitAt?: string;
  totalVisits: number;
}

export interface ServiceItem {
  _id: string;
  salonId: string;
  category: string;
  name: string;
  durationMins: number;
  bufferMins: number;
  price: number;
  assignedStaffIds: string[];
  isActive: boolean;
}

export interface ServiceSnapshot {
  serviceId: string;
  name: string;
  durationMins: number;
  price: number;
}

export interface Appointment {
  _id: string;
  salonId: string;
  customerId: string;
  staffId: string;
  servicesSnapshot: ServiceSnapshot[];
  startTime: string; // ISO string
  endTime: string;   // ISO string
  status: AppointmentStatus;
  source: BookingSource;
  createdBy: string;
  idempotencyKey?: string;
  notes?: string;
  customer?: Customer;
  staff?: UserProfile;
}

export interface CartLineItem {
  type: 'SERVICE' | 'RETAIL';
  itemId: string;
  name: string;
  price: number;
  quantity: number;
  staffId?: string;
}

export interface PaymentRecord {
  method: PaymentMethod;
  amount: number;
  transactionRef?: string;
}

export interface Invoice {
  _id: string;
  salonId: string;
  invoiceNumber: string;
  appointmentId?: string;
  customerId: string;
  lineItems: CartLineItem[];
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  grandTotal: number;
  payments: PaymentRecord[];
  status: InvoiceStatus;
  createdBy: string;
  createdAt: string;
}
