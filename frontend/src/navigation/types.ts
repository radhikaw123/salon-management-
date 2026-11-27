export type LoginRole = 'owner' | 'reception' | 'staff';

export type RootStackParamList = {
  OwnerTabs: undefined;
  Welcome: undefined;
  SignUp: undefined;
  Login: { role?: LoginRole } | undefined;
  StaffTabs: undefined;
  CustomerVisits: { customerId: string };
  StaffBookingsDetail: {
    staffId: string;
    staffName: string;
    staffRole: string;
    initials: string;
    totalBookings: number;
  };
};

export type StaffTabParamList = {
  MyCustomers: undefined;
  DailyEarnings: undefined;
  Profile: undefined;
};

export type ReceptionTabParamList = {
  MasterCalendar: undefined;
  WalkInQueue: undefined;
  PosCheckout: undefined;
  ClientDirectory: undefined;
};