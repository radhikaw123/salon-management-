export type LoginRole = 'owner' | 'reception' | 'staff';

export type RootStackParamList = {
  Welcome: undefined;
  SignUp: undefined;
  Login: { role?: LoginRole } | undefined;
  StaffTabs: undefined;
};

export type StaffTabParamList = {
  MyCustomers: undefined;
  DailyEarnings: undefined;
};