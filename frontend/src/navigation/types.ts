export type LoginRole = 'owner' | 'reception' | 'staff';

export type RootStackParamList = {
  Welcome: undefined;
  SignUp: undefined;
  Login: { role?: LoginRole } | undefined;
  StaffTabs: undefined;
  OwnerTabs: undefined;
  CustomerVisits: { customerId: string };
};

export type StaffTabParamList = {
  MyCustomers: undefined;
  DailyEarnings: undefined;
};