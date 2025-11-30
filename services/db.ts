import { Booking } from '../types';

const LOCAL_STORAGE_KEY = 'spa_bookings';

export const saveBooking = async (booking: Booking): Promise<boolean> => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // LOCAL STORAGE FALLBACK
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
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const existingData = localStorage.getItem(LOCAL_STORAGE_KEY);
  return existingData ? JSON.parse(existingData).reverse() : [];
};

export const updateBookingStatus = async (id: string, status: 'Confirmed'): Promise<boolean> => {
  try {
    const existingData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!existingData) return false;

    const bookings: Booking[] = JSON.parse(existingData);
    const updatedBookings = bookings.map(b => 
      b.id === id ? { ...b, status } : b
    );

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedBookings));
    return true;
  } catch (error) {
    console.error("Error updating booking:", error);
    return false;
  }
};
