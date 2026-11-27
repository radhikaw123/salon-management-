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
    serviceCount: 10,
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
    serviceCount: 4,
    imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'cat_4',
    name: 'Makeup',
    serviceCount: 3,
    imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'cat_5',
    name: 'Lashes & Brows',
    serviceCount: 3,
    imageUrl: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'cat_6',
    name: 'Spa & Body',
    serviceCount: 2,
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&auto=format&fit=crop&q=60',
  },
];

export const mockServicesList: ServiceItem[] = [
  // 10 Hair Services
  { id: 'srv_h1', name: 'Signature Balayage', category: 'Hair', duration: '2h 30m', price: 3800, popular: true },
  { id: 'srv_h2', name: 'Relaxing Head Spa', category: 'Hair', duration: '50m', price: 1800, popular: true },
  { id: 'srv_h3', name: 'Keratin Smoothening Treatment', category: 'Hair', duration: '2h', price: 4500, popular: true },
  { id: 'srv_h4', name: "Classic Women's Haircut & Blowdry", category: 'Hair', duration: '45m', price: 1200, popular: true },
  { id: 'srv_h5', name: 'Global Hair Colour & Gloss', category: 'Hair', duration: '1h 45m', price: 3200, popular: false },
  { id: 'srv_h6', name: "Men's Executive Fade & Styling", category: 'Hair', duration: '30m', price: 650, popular: false },
  { id: 'srv_h7', name: 'Olaplex Deep Conditioning Ritual', category: 'Hair', duration: '45m', price: 2100, popular: false },
  { id: 'srv_h8', name: 'Root Touch-up & Refresh', category: 'Hair', duration: '1h', price: 1600, popular: false },
  { id: 'srv_h9', name: 'Moroccan Oil Intense Hydration', category: 'Hair', duration: '1h', price: 2400, popular: false },
  { id: 'srv_h10', name: 'Brazilian Blowout Anti-Frizz', category: 'Hair', duration: '2h 30m', price: 5000, popular: false },

  // 12 Skin & Facial Services
  { id: 'srv_s1', name: 'Hydra-glow Facial', category: 'Skin & Facial', duration: '1h 15m', price: 2600, popular: true },
  { id: 'srv_s2', name: '24K Gold Radiance Treatment', category: 'Skin & Facial', duration: '1h 30m', price: 3500, popular: true },
  { id: 'srv_s3', name: 'Deep Pore Charcoal Detox', category: 'Skin & Facial', duration: '50m', price: 1800, popular: false },
  { id: 'srv_s4', name: 'Vitamin C Collagen Boost Facial', category: 'Skin & Facial', duration: '1h 15m', price: 2800, popular: false },
  { id: 'srv_s5', name: 'Oxygen Infusion Therapy', category: 'Skin & Facial', duration: '1h', price: 3200, popular: false },
  { id: 'srv_s6', name: 'Anti-Aging Peptide Lifting Ritual', category: 'Skin & Facial', duration: '1h 30m', price: 4200, popular: true },
  { id: 'srv_s7', name: 'Organic Fruit Cleanse & Glow', category: 'Skin & Facial', duration: '45m', price: 1400, popular: false },
  { id: 'srv_s8', name: 'Derma Brightening Peel', category: 'Skin & Facial', duration: '1h', price: 2900, popular: false },
  { id: 'srv_s9', name: 'Rose Quartz Calming Facial', category: 'Skin & Facial', duration: '1h', price: 2200, popular: false },
  { id: 'srv_s10', name: 'Korean Glass Skin Facial', category: 'Skin & Facial', duration: '1h 20m', price: 3800, popular: true },
  { id: 'srv_s11', name: "Men's Energizing Skin Revitalizer", category: 'Skin & Facial', duration: '45m', price: 1900, popular: false },
  { id: 'srv_s12', name: 'Acne Defense & Calming Treatment', category: 'Skin & Facial', duration: '1h', price: 2500, popular: false },

  // Nails
  { id: 'srv_n1', name: 'Gel Manicure', category: 'Nails', duration: '45m', price: 1100, popular: true },
  { id: 'srv_n2', name: 'Acrylic Nail Extensions', category: 'Nails', duration: '1h 30m', price: 2500, popular: true },
  { id: 'srv_n3', name: 'Classic Spa Pedicure', category: 'Nails', duration: '1h', price: 1400, popular: false },
  { id: 'srv_n4', name: 'Chrome Mirror Finish Art', category: 'Nails', duration: '30m', price: 800, popular: false },

  // Makeup
  { id: 'srv_m1', name: 'Bridal Makeup', category: 'Makeup', duration: '2h', price: 5500, popular: true },
  { id: 'srv_m2', name: 'Airbrush Party Makeup', category: 'Makeup', duration: '1h 15m', price: 3200, popular: true },
  { id: 'srv_m3', name: 'Subtle Day Glam & Hairstyling', category: 'Makeup', duration: '1h', price: 2200, popular: false },

  // Lashes & Brows
  { id: 'srv_l1', name: 'Lash Lift & Tint', category: 'Lashes & Brows', duration: '1h', price: 1700, popular: true },
  { id: 'srv_l2', name: 'Microblading Brow Sculpt', category: 'Lashes & Brows', duration: '1h 45m', price: 4800, popular: false },
  { id: 'srv_l3', name: 'Russian Volume Lash Extensions', category: 'Lashes & Brows', duration: '1h 30m', price: 3400, popular: false },

  // Spa & Body
  { id: 'srv_b1', name: 'Aromatherapy Full Body Massage', category: 'Spa & Body', duration: '1h 15m', price: 2800, popular: true },
  { id: 'srv_b2', name: 'Swedish Muscle Relief Therapy', category: 'Spa & Body', duration: '1h', price: 2400, popular: false },
];

export const mockStaffDirectory: StaffMember[] = [
  { id: 'st_1', name: 'Maya Ellis', role: 'Senior Stylist', bookingsThisMonth: 5, initials: 'ME' },
  { id: 'st_2', name: 'Nora James', role: 'Skin Specialist', bookingsThisMonth: 4, initials: 'NJ' },
  { id: 'st_3', name: 'Leah Stone', role: 'Nail Artist', bookingsThisMonth: 4, initials: 'LS' },
  { id: 'st_4', name: 'Ava Morgan', role: 'Stylist', bookingsThisMonth: 3, initials: 'AM' },
  { id: 'st_5', name: 'Priya Sharma', role: 'Master Makeup Artist', bookingsThisMonth: 3, initials: 'PS' },
];

export const mockMayaSchedule: DayShift[] = [
  { day: 'Mon', hours: '9:00 AM to 5:00 PM', clients: 3 },
  { day: 'Tue', hours: '9:00 AM to 5:00 PM', clients: 4 },
  { day: 'Wed', hours: '9:00 AM to 5:00 PM', clients: 5 },
  { day: 'Thu', hours: '9:00 AM to 5:00 PM', clients: 3 },
  { day: 'Fri', hours: '9:00 AM to 6:00 PM', clients: 6 },
  { day: 'Sat', hours: '9:00 AM to 6:00 PM', clients: 5 },
];

export interface StaffBookingItem {
  id: string;
  clientName: string;
  serviceName: string;
  time: string;
  duration: string;
  price: number;
  status: 'Completed' | 'In Progress' | 'Upcoming';
}

export const mockStaffBookingsMap: Record<string, StaffBookingItem[]> = {
  st_1: [
    { id: 'b_1', clientName: 'Ariadna Hurt', serviceName: 'Signature Balayage', time: '10:30 AM', duration: '2h 30m', price: 3800, status: 'Completed' },
    { id: 'b_2', clientName: 'Elena Rostova', serviceName: 'Keratin Smoothening', time: '01:15 PM', duration: '2h', price: 4500, status: 'In Progress' },
    { id: 'b_3', clientName: 'Ananya Roy', serviceName: "Classic Women's Haircut", time: '03:45 PM', duration: '45m', price: 1200, status: 'Upcoming' },
    { id: 'b_4', clientName: 'Simran Patel', serviceName: 'Relaxing Head Spa', time: '04:45 PM', duration: '50m', price: 1800, status: 'Upcoming' },
    { id: 'b_5', clientName: 'Pooja Verma', serviceName: 'Global Hair Colour & Gloss', time: '06:00 PM', duration: '1h 45m', price: 3200, status: 'Upcoming' },
  ],
  st_2: [
    { id: 'b_6', clientName: 'Elena Rostova', serviceName: 'Hydra-glow Facial', time: '11:00 AM', duration: '1h 15m', price: 2400, status: 'Completed' },
    { id: 'b_7', clientName: 'Natasha Mehra', serviceName: '24K Gold Radiance Treatment', time: '01:30 PM', duration: '1h 30m', price: 3500, status: 'In Progress' },
    { id: 'b_8', clientName: 'Ritika Sen', serviceName: 'Korean Glass Skin Facial', time: '03:30 PM', duration: '1h 20m', price: 3800, status: 'Upcoming' },
    { id: 'b_9', clientName: 'Diya Kapoor', serviceName: 'Deep Pore Charcoal Detox', time: '05:15 PM', duration: '50m', price: 1800, status: 'Upcoming' },
  ],
  st_3: [
    { id: 'b_10', clientName: 'Kavita Reddy', serviceName: 'Gel Manicure', time: '10:00 AM', duration: '45m', price: 1100, status: 'Completed' },
    { id: 'b_11', clientName: 'Meera Nair', serviceName: 'Acrylic Nail Extensions', time: '12:30 PM', duration: '1h 30m', price: 2500, status: 'In Progress' },
    { id: 'b_12', clientName: 'Zoya Khan', serviceName: 'Classic Spa Pedicure', time: '03:00 PM', duration: '1h', price: 1400, status: 'Upcoming' },
    { id: 'b_13', clientName: 'Tanya Joshi', serviceName: 'Chrome Mirror Finish Art', time: '04:30 PM', duration: '30m', price: 800, status: 'Upcoming' },
  ],
  st_4: [
    { id: 'b_14', clientName: 'Rahul Sharma', serviceName: "Men's Executive Fade & Styling", time: '11:00 AM', duration: '30m', price: 650, status: 'Completed' },
    { id: 'b_15', clientName: 'Tanvi Deshmukh', serviceName: 'Root Touch-up & Refresh', time: '02:00 PM', duration: '1h', price: 1600, status: 'In Progress' },
    { id: 'b_16', clientName: 'Neha Singh', serviceName: 'Moroccan Oil Intense Hydration', time: '04:00 PM', duration: '1h', price: 2400, status: 'Upcoming' },
  ],
  st_5: [
    { id: 'b_17', clientName: 'Pooja Verma', serviceName: 'Bridal Makeup', time: '11:30 AM', duration: '2h', price: 9500, status: 'Completed' },
    { id: 'b_18', clientName: 'Sunita Kapoor', serviceName: 'Airbrush Party Makeup', time: '03:30 PM', duration: '1h 15m', price: 3200, status: 'Upcoming' },
    { id: 'b_19', clientName: 'Radhika Mehta', serviceName: 'Subtle Day Glam & Hairstyling', time: '05:30 PM', duration: '1h', price: 2200, status: 'Upcoming' },
  ],
};

export const formatRupee = (val: number): string => {
  return '₹' + val.toLocaleString('en-IN');
};
