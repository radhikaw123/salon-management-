export const mockStaffUser = {
  _id: 'staff_101',
  salonId: 'salon_001',
  role: 'STAFF' as const,
  name: 'Alex Stylist',
  phone: '+919876543210',
  isActive: true,
  commission: { servicePct: 20, retailPct: 10 },
};

export const mockOwnerUser = {
  _id: 'owner_001',
  salonId: 'salon_001',
  role: 'OWNER' as const,
  name: 'Sophia Owner',
  phone: '+919988776655',
  isActive: true,
};

export const mockReceptionUser = {
  _id: 'reception_001',
  salonId: 'salon_001',
  role: 'RECEPTION' as const,
  name: 'Elena FrontDesk',
  phone: '+919123456780',
  isActive: true,
};
