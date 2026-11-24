export interface BusinessPulse {
  revenueThisMonth: number;
  revenueChangePct: number;
  ownerIncome: number;
  paidTickets: number;
  paidCollected: number;
  unpaidTickets: number;
  unpaidOutstanding: number;
  activeClients: number;
  activeClientsChangePct: number;
  totalStaff: number;
  staffActiveToday: number;
}

export interface LiveAppointment {
  id: string;
  time: string;
  clientName: string;
  serviceName: string;
  staffName: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  serviceCount: number;
  imageUrl: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  duration: string;
  price: number;
  popular?: boolean;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  bookingsThisMonth: number;
  initials: string;
}

export interface DayShift {
  day: string;
  hours: string;
  clients: number;
}

export const mockBusinessPulse: BusinessPulse = {
  revenueThisMonth: 486200,
  revenueChangePct: 12.4,
  ownerIncome: 168400,
  paidTickets: 142,
  paidCollected: 418000,
  unpaidTickets: 6,
  unpaidOutstanding: 67400,
  activeClients: 1284,
  activeClientsChangePct: 2.3,
  totalStaff: 12,
  staffActiveToday: 8,
};

export const mockLiveSchedule: LiveAppointment[] = [
  {
    id: 'app_1',
    time: '10:30 AM',
    clientName: 'Ariadna Hurt',
    serviceName: 'Balayage & Blow Dry',
    staffName: 'Maya Ellis',
  },
  {
    id: 'app_2',
    time: '11:45 AM',
    clientName: 'Elena Rostova',
    serviceName: 'Hydra-glow Facial',
    staffName: 'Nora James',
  },
  {
    id: 'app_3',
    time: '01:15 PM',
    clientName: 'Pooja Verma',
    serviceName: 'Bridal Makeup Trial',
    staffName: 'Priya Sharma',
  },
];

export const mockCategories: ServiceCategory[] = [
  {
    id: 'cat_1',
    name: 'Hair',
    serviceCount: 18,
    imageUrl: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'cat_2',
    name: 'Skin & Facial',
    serviceCount: 12,
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'cat_3',
    name: 'Nails',
    serviceCount: 14,
    imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'cat_4',
    name: 'Makeup',
    serviceCount: 8,
    imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'cat_5',
    name: 'Lashes & Brows',
    serviceCount: 9,
    imageUrl: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'cat_6',
    name: 'Spa & Body',
    serviceCount: 6,
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&auto=format&fit=crop&q=60',
  },
];

export const mockServicesList: ServiceItem[] = [
  { id: 'srv_1', name: 'Signature Balayage', category: 'Hair', duration: '2h 30m', price: 3800, popular: true },
  { id: 'srv_2', name: 'Hydra-glow Facial', category: 'Skin & Facial', duration: '1h 15m', price: 2600, popular: true },
  { id: 'srv_3', name: 'Gel Manicure', category: 'Nails', duration: '45m', price: 1100, popular: false },
  { id: 'srv_4', name: 'Bridal Makeup', category: 'Makeup', duration: '2h', price: 5500, popular: true },
  { id: 'srv_5', name: 'Lash Lift & Tint', category: 'Lashes & Brows', duration: '1h', price: 1700, popular: false },
  { id: 'srv_6', name: 'Relaxing Head Spa', category: 'Hair', duration: '50m', price: 1800, popular: true },
];

export const mockStaffDirectory: StaffMember[] = [
  { id: 'st_1', name: 'Maya Ellis', role: 'Senior Stylist', bookingsThisMonth: 28, initials: 'ME' },
  { id: 'st_2', name: 'Nora James', role: 'Skin Specialist', bookingsThisMonth: 24, initials: 'NJ' },
  { id: 'st_3', name: 'Leah Stone', role: 'Nail Artist', bookingsThisMonth: 31, initials: 'LS' },
  { id: 'st_4', name: 'Ava Morgan', role: 'Stylist', bookingsThisMonth: 19, initials: 'AM' },
  { id: 'st_5', name: 'Priya Sharma', role: 'Master Makeup Artist', bookingsThisMonth: 34, initials: 'PS' },
];

export const mockMayaSchedule: DayShift[] = [
  { day: 'Mon', hours: '9:00 AM to 5:00 PM', clients: 3 },
  { day: 'Tue', hours: '9:00 AM to 5:00 PM', clients: 4 },
  { day: 'Wed', hours: '9:00 AM to 5:00 PM', clients: 5 },
  { day: 'Thu', hours: '9:00 AM to 5:00 PM', clients: 3 },
  { day: 'Fri', hours: '9:00 AM to 6:00 PM', clients: 6 },
  { day: 'Sat', hours: '9:00 AM to 6:00 PM', clients: 5 },
];

export const formatRupee = (val: number): string => {
  return '₹' + val.toLocaleString('en-IN');
};
