import { MassageType, City } from './types';

export const UPI_ID = "poojamahta67-1@okicici";
export const TELEGRAM_HANDLE = "Priyankasupport";
export const FACEBOOK_LINK = "https://www.facebook.com/share/17A5bkCZPC/";

export const MASSAGES: MassageType[] = [
  { id: '1', name: 'Swedish Massage', price: 2000, duration: '60 min', image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=800&auto=format&fit=crop', description: 'Classic relaxation massage to relieve stress.' },
  { id: '2', name: 'Deep Tissue', price: 2500, duration: '60 min', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop', description: 'Targets deep muscle layers to release chronic tension.' },
  { id: '3', name: 'Thai Massage', price: 3000, duration: '90 min', image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=800&auto=format&fit=crop', description: 'Ancient healing system combining acupressure and yoga.' },
  { id: '4', name: 'Aromatherapy', price: 2800, duration: '60 min', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop', description: 'Massage with essential oils to enhance mood and health.' },
  { id: '5', name: 'Hot Stone', price: 3500, duration: '75 min', image: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?q=80&w=800&auto=format&fit=crop', description: 'Smooth, heated stones placed on the body.' },
  { id: '6', name: 'Sports Massage', price: 2700, duration: '60 min', image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800&auto=format&fit=crop', description: 'Designed for athletes to prevent and treat injuries.' },
  { id: '7', name: 'Shiatsu', price: 3200, duration: '60 min', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop', description: 'Japanese finger pressure technique.' },
  { id: '8', name: 'Foot Reflexology', price: 800, duration: '30 min', image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800&auto=format&fit=crop', description: 'Pressure points on feet and hands.' },
  { id: '9', name: 'Balinese Massage', price: 3100, duration: '60 min', image: 'https://images.unsplash.com/photo-1531855014763-8756c07a3853?q=80&w=800&auto=format&fit=crop', description: 'Gentle stretches, acupressure, and aromatherapy.' },
  { id: '10', name: 'Ayurvedic Potli', price: 3800, duration: '90 min', image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=800&auto=format&fit=crop', description: 'Herbal pouches used to rejuvenate the body.' },
  { id: '11', name: 'Quick Head Massage', price: 500, duration: '20 min', image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop', description: 'Quick relief for upper body tension.' },
  { id: '12', name: 'Four Hands', price: 5000, duration: '60 min', image: 'https://images.unsplash.com/photo-1620733723572-11c52f7c2d82?q=80&w=800&auto=format&fit=crop', description: 'Two therapists working in synchronization.' },
  { id: '13', name: 'Couples Massage', price: 5000, duration: '60 min', image: 'https://images.unsplash.com/photo-1591343395082-e21f175d6978?q=80&w=800&auto=format&fit=crop', description: 'Relaxing experience shared with a partner.' },
  { id: '14', name: 'Lomi Lomi', price: 3300, duration: '60 min', image: 'https://images.unsplash.com/photo-1542848284-8afa78a08ccb?q=80&w=800&auto=format&fit=crop', description: 'Hawaiian massage using long flowing strokes.' },
  { id: '15', name: 'Prenatal Massage', price: 2600, duration: '60 min', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop', description: 'Safe and soothing massage for expectant mothers.' },
];

export const CITIES: City[] = [
  { name: 'Jaipur', address: 'C Scheme, MI Road, Jaipur' },
  { name: 'Jodhpur', address: 'Ratanada, Near Circuit House, Jodhpur' },
  { name: 'Udaipur', address: 'Fatehpura, Near Saheliyon Ki Bari, Udaipur' },
  { name: 'Kota', address: 'Talwandi, Jhalawar Road, Kota' },
  { name: 'Ajmer', address: 'Vaishali Nagar, Near Ana Sagar, Ajmer' },
  { name: 'Bikaner', address: 'Sadul Ganj, Near Museum Circle, Bikaner' },
  { name: 'Bhilwara', address: 'Shastri Nagar, Near Railway Station, Bhilwara' },
  { name: 'Alwar', address: 'Manu Marg, Alwar' },
  { name: 'Bharatpur', address: 'Ranjeet Nagar, Bharatpur' },
  { name: 'Sikar', address: 'Piprali Road, Sikar' },
  { name: 'Pali', address: 'Mandia Road, Pali' },
  { name: 'Sri Ganganagar', address: 'Jawahar Nagar, Sri Ganganagar' },
  { name: 'Chittorgarh', address: 'Pratap Nagar, Chittorgarh' },
  { name: 'Hanumangarh', address: 'Town Junction Road, Hanumangarh' },
  { name: 'Barmer', address: 'Mahaveer Nagar, Barmer' },
  { name: 'Mount Abu', address: 'Nakki Lake Road, Mount Abu' },
  { name: 'Jaisalmer', address: 'Sam Sand Dunes Road, Jaisalmer' },
  { name: 'Pushkar', address: 'Main Market, Pushkar' },
  { name: 'Sawai Madhopur', address: 'Ranthambore Road, Sawai Madhopur' },
  { name: 'Jhunjhunu', address: 'Road No. 2, Jhunjhunu' },
];

export const SUPPORT_AGENTS = [
  { name: 'Riya', role: 'Booking Specialist' },
  { name: 'Neha', role: 'Therapy Consultant' },
  { name: 'Pooja', role: 'Payment Support' },
];
