export interface Booking {
  id?: string;
  vehicle: string;
  driver: string;
  status: string;
  approver1: string;
  approver2: string;
  approver1Approved: boolean;
  approver2Approved: boolean;
  startDate: string;
  endDate: string;
  timestamp: string;
}
