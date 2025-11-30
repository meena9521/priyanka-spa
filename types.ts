export interface MassageType {
  id: string;
  name: string;
  price: number;
  duration: string;
  image: string;
  description: string;
}

export interface City {
  name: string;
  address: string;
}

export interface Booking {
  id: string;
  customerName: string;
  phone: string;
  date: string;
  time: string;
  massageId: string;
  city: string;
  therapistGender: 'Male' | 'Female';
  referralApplied: boolean;
  totalAmount: number;
  advancePaid: number;
  utrNumber: string;
  paymentScreenshot?: string;
  status: 'Pending' | 'Confirmed';
  timestamp: number;
}
