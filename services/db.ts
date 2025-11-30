import { Booking } from '../types';

const LOCAL_STORAGE_KEY = 'spa_bookings';

export const saveBooking = async (booking: Booking): Promise<boolean> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));

    const existingData = localStorage.getItem(LOCAL_STORAGE_KEY);
    const bookings: Booking[] = existingData ? JSON.parse(existingData) : [];
    bookings.push(booking);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bookings));
    
    return true;
  } catch (error) {
    console.error("Error saving booking:", error);
    return false;
  }
};

export const getBookings = async (): Promise<Booking[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const existingData = localStorage.getItem(LOCAL_STORAGE_KEY);
  return existingData ? JSON.parse(existingData).reverse() : [];
};
