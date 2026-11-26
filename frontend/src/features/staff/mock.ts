// Temporary mock data. Replace with API calls when the backend is ready.
import { formatDate } from './format';

export type ServiceCategory = 'Hair color' | 'Hair care' | 'Styling';

export interface PreviousService {
  name: string;
  date: string;
}

export interface StaffCustomer {
  id: string;
  name: string;
  initials: string;
  phone: string;
  email: string;
  lastVisit: string;
  lastVisitDate: string; // ISO, used for sorting
  totalVisits: number;
  favoriteService: string;
  preference: string;
  nextAppointment: string;
  previousServices: PreviousService[];
}

export interface HistoryItem {
  id: string;
  customerId: string;
  service: string;
  category: ServiceCategory;
  completedAt: string; // ISO
  durationMin: number;
  price: number;
  commissionPct: number;
  notes: string;
}

export interface UpcomingAppointment {
  id: string;
  day: 'today' | 'tomorrow';
  time: string;
  name: string;
  initials: string;
  service: string;
}

export const staffSummary = {
  staffName: 'Maya Ellis',
  initials: 'ME',
  employeeId: 'STF-0042',
  assignedCount: 48,
  todaysCustomers: 48,
  upcoming: 16,
  totalCustomers: 22,
  completedServices: 126,
  avgCommissionPct: 40,
};

export const paymentSummary = {
  totalEarnedMonth: 58400,
  paid: 44600,
  pending: 13800,
  lastPayment: 'Nov 13, 2026',
};

// Relative bar heights (0 to 1) for the history card
export const weeklyTrend = [0.3, 0.45, 0.38, 0.62, 0.55, 0.78, 1];

// name, phone, total visits, last visit, favorite service, preference, next appointment
type CustomerRow = [string, string, number, string, string, string, string];
const customerRows: CustomerRow[] = [
  ['Amelia Hart', '+91 98200 11234', 18, '2026-11-12T12:00:00', 'Signature Balayage', 'Soft, low-maintenance finishes', 'Dec 3 · 10:00 AM'],
  ['Olivia Chen', '+91 98200 33456', 7, '2026-10-22T12:00:00', 'Cut & Treatment', 'Layered cuts, gentle treatments', 'Today · 2:15 PM'],
  ['Mia Thompson', '+91 98200 44567', 4, '2026-09-30T12:00:00', 'Event Styling', 'Updos with long-lasting hold', 'Not booked'],
  ['Sophia Reed', '+91 98200 55678', 11, '2026-11-18T12:00:00', 'Gloss & Blowout', 'Smooth, glossy finishes', 'Today · 4:00 PM'],
  ['Isabella Rossi', '+91 98200 66789', 3, '2026-11-05T12:00:00', 'Hair Spa', 'Fragrance-free products', 'Not booked'],
  ['Charlotte Evans', '+91 98200 77890', 9, '2026-11-20T12:00:00', 'Haircut & Styling', 'Short, textured cuts', 'Dec 8 · 11:30 AM'],
  ['Priya Nair', '+91 98200 88901', 14, '2026-11-15T12:00:00', 'Keratin Treatment', 'Smooth, frizz-free results', 'Dec 1 · 3:00 PM'],
  ['Ananya Rao', '+91 98200 99012', 6, '2026-10-28T12:00:00', 'Root Touch-up', 'Natural dark shades', 'Not booked'],
  ['Kavya Menon', '+91 98200 10123', 2, '2026-08-14T12:00:00', 'Blow-dry & Style', 'Soft waves', 'Not booked'],
  ['Riya Kapoor', '+91 98200 21234', 12, '2026-11-22T12:00:00', 'Highlights', 'Subtle honey tones', 'Dec 5 · 1:00 PM'],
  ['Neha Joshi', '+91 98200 32345', 5, '2026-10-09T12:00:00', 'Scalp Treatment', 'Sensitive scalp care', 'Not booked'],
  ['Sara Khan', '+91 98200 43456', 8, '2026-09-18T12:00:00', 'Bridal Styling', 'Classic updos', 'Dec 12 · 9:00 AM'],
];

export const mockStaffCustomers: StaffCustomer[] = customerRows.map(
  ([name, phone, totalVisits, last, favoriteService, preference, nextAppointment], i) => {
    const [first, surname] = name.split(' ');
    const lastVisit = formatDate(last);
    return {
      id: String(i + 1),
      name,
      initials: first[0] + surname[0],
      phone,
      email: `${first.toLowerCase()}.${surname[0].toLowerCase()}@example.com`,
      lastVisit,
      lastVisitDate: last,
      totalVisits,
      favoriteService,
      preference,
      nextAppointment,
      previousServices: [
        { name: favoriteService, date: lastVisit },
        ...(totalVisits >= 10 ? [{ name: 'Consultation & finish', date: 'Sep 03, 2026' }] : []),
      ],
    };
  },
);

// Dates are relative to today so the week / month filters always have data
const at = (daysAgo: number, hour: number, minute: number) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
};

const NOTES: Record<ServiceCategory, string> = {
  'Hair color': 'Colour applied as consulted. Client confirmed the shade and received aftercare tips.',
  'Hair care': 'Treatment completed. Home-care routine discussed with the client.',
  Styling: 'Styled as requested. Client was happy with the finish.',
};

// customer id, service, category, days ago, hour, minute, duration (min), price
type HistoryRow = [string, string, ServiceCategory, number, number, number, number, number];
const historyRows: HistoryRow[] = [
  ['1', 'Signature Balayage', 'Hair color', 0, 9, 30, 148, 3800],
  ['2', 'Cut & Treatment', 'Hair care', 1, 14, 15, 95, 2400],
  ['7', 'Keratin Treatment', 'Hair care', 1, 11, 0, 130, 5200],
  ['4', 'Gloss & Blowout', 'Hair care', 2, 12, 30, 75, 1300],
  ['10', 'Highlights', 'Hair color', 2, 10, 0, 120, 4200],
  ['6', 'Haircut & Styling', 'Styling', 2, 16, 0, 60, 1500],
  ['3', 'Event Styling', 'Styling', 4, 16, 0, 75, 2800],
  ['8', 'Root Touch-up', 'Hair color', 5, 10, 15, 90, 2200],
  ['11', 'Scalp Treatment', 'Hair care', 6, 15, 30, 45, 1200],
  ['9', 'Blow-dry & Style', 'Styling', 9, 13, 0, 45, 1100],
  ['4', 'Hair Spa', 'Hair care', 11, 11, 30, 60, 1800],
  ['1', 'Signature Balayage', 'Hair color', 14, 10, 0, 150, 3800],
  ['12', 'Bridal Styling', 'Styling', 17, 9, 0, 180, 6500],
  ['6', 'Gloss & Blowout', 'Hair care', 20, 14, 0, 75, 1300],
  ['2', 'Cut & Treatment', 'Hair care', 24, 12, 0, 95, 2400],
  ['5', 'Root Touch-up', 'Hair color', 30, 10, 30, 90, 2200],
  ['7', 'Highlights', 'Hair color', 38, 11, 0, 120, 4200],
  ['10', 'Haircut & Styling', 'Styling', 45, 15, 0, 60, 1500],
  ['3', 'Event Styling', 'Styling', 58, 16, 30, 75, 2800],
  ['1', 'Consultation & finish', 'Hair care', 70, 10, 0, 40, 900],
];

export const mockHistory: HistoryItem[] = historyRows.map(
  ([customerId, service, category, ago, hour, minute, durationMin, price], i) => ({
    id: `h${i + 1}`,
    customerId,
    service,
    category,
    completedAt: at(ago, hour, minute),
    durationMin,
    price,
    commissionPct: 40,
    notes: NOTES[category],
  }),
);

export const mockAppointments: UpcomingAppointment[] = [
  { id: 'a1', day: 'today', time: '2:15 PM', name: 'Olivia Chen', initials: 'OC', service: 'Cut & Treatment' },
  { id: 'a2', day: 'today', time: '4:00 PM', name: 'Sophia Reed', initials: 'SR', service: 'Gloss & Blowout' },
  { id: 'a3', day: 'tomorrow', time: '10:00 AM', name: 'Amelia Hart', initials: 'AH', service: 'Signature Balayage' },
  { id: 'a4', day: 'tomorrow', time: '1:30 PM', name: 'Mia Thompson', initials: 'MT', service: 'Event Styling' },
];