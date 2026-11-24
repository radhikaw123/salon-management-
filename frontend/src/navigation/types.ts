import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
  OtpVerify: { phone: string };
};

export type OwnerTabParamList = {
  OwnerDashboard: undefined;
  OwnerCalendar: undefined;
  OwnerStaff: undefined;
  OwnerInventory: undefined;
  OwnerReports: undefined;
};

export type ReceptionTabParamList = {
  MasterCalendar: undefined;
  WalkInQueue: undefined;
  PosCheckout: undefined;
  ClientDirectory: undefined;
};

export type StaffTabParamList = {
  MySchedule: undefined;
  ActiveService: undefined;
  MyEarnings: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  OwnerApp: NavigatorScreenParams<OwnerTabParamList>;
  ReceptionApp: NavigatorScreenParams<ReceptionTabParamList>;
  StaffApp: NavigatorScreenParams<StaffTabParamList>;
};
