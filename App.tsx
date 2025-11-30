import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { MapPin, Phone, User, Calendar, Menu, X, Facebook, Send, CheckCircle, Upload, MessageCircle, Star, Sparkles, Lock, Eye, Check } from 'lucide-react';
import { MASSAGES, UPI_ID, TELEGRAM_HANDLE, FACEBOOK_LINK, CITIES, SUPPORT_AGENTS } from './constants';
import { MassageType, Booking } from './types';
import { saveBooking, getBookings, updateBookingStatus } from './services/db';
import ChatSupport from './components/ChatSupport';

// --- COMPONENTS ---

// Navbar Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 shadow-lg sticky top-0 z-40 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
              <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-pink-600 font-bold text-2xl shadow-md group-hover:scale-110 transition-transform">P</div>
              <span className="font-bold text-2xl tracking-tight text-white drop-shadow-md">Priyanka<span className="text-yellow-300">Spa</span></span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`font-medium hover:text-yellow-300 transition-colors ${location.pathname === '/' ? 'text-yellow-300 border-b-2 border-yellow-300' : 'text-white'}`}>Home</Link>
            <Link to="/#services" className="text-white hover:text-yellow-300 font-medium transition-colors">Services</Link>
            <Link to="/my-bookings" className={`font-medium hover:text-yellow-300 transition-colors ${location.pathname === '/my-bookings' ? 'text-yellow-300 border-b-2 border-yellow-300' : 'text-white'}`}>My Bookings</Link>
            <a href={`https://t.me/${TELEGRAM_HANDLE}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full font-medium transition-all">
              <Send size={18} /> Support
            </a>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-yellow-200 p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-purple-800 border-t border-purple-600">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-white hover:bg-purple-700">Home</Link>
            <Link to="/my-bookings" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-white hover:bg-purple-700">My Bookings</Link>
            <a href={`https://t.me/${TELEGRAM_HANDLE}`} className="block px-3 py-2 text-base font-medium text-yellow-300">Telegram Support</a>
          </div>
        </div>
      )}
    </nav>
  );
};

// Home Page Component
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative bg-purple-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-pink-900/80 to-red-900/80 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1920&auto=format&fit=crop')" }}
        ></div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-lg">
            Experience Royal <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">Relaxation</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl text-purple-100 font-light leading-relaxed">
            Premium massage therapy across Rajasthan. Indulge in luxury with our expert female therapists.
          </p>
          <button 
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-purple-900 font-bold py-4 px-12 rounded-full shadow-xl transform transition hover:scale-105 hover:shadow-2xl flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5" /> Book Now
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div id="services" className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">Our Premium Collection</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-600 text-lg">Select a service to begin your journey to tranquility</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {MASSAGES.map((massage) => (
            <div key={massage.id} className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-pink-100 transform hover:-translate-y-1">
              <div className="h-64 overflow-hidden relative">
                <img src={massage.image} alt={massage.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur px-4 py-2 rounded-full text-lg font-bold text-pink-600 shadow-md flex items-center gap-1">
                  <span>₹{massage.price}</span>
                </div>
              </div>
              <div className="p-7">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors">{massage.name}</h3>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">{massage.duration}</span>
                  <div className="flex text-yellow-400">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">{massage.description}</p>
                <button 
                  onClick={() => navigate(`/book/${massage.id}`)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <Calendar size={18} /> Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust & Support Section */}
      <div className="bg-white/80 backdrop-blur-md py-20 border-t border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <h2 className="text-3xl font-bold mb-12 text-gray-800">Our Lovely Support Team</h2>
           <div className="flex flex-wrap justify-center gap-10">
             {SUPPORT_AGENTS.map((agent, idx) => (
                <div key={idx} className="flex flex-col items-center group">
                   <div className="w-24 h-24 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center text-4xl mb-4 shadow-inner group-hover:scale-110 transition-transform">
                     👩‍💼
                   </div>
                   <h4 className="font-bold text-xl text-gray-800">{agent.name}</h4>
                   <p className="text-pink-600 font-medium">{agent.role}</p>
                </div>
             ))}
           </div>
           <div className="flex justify-center mt-12 gap-5 flex-wrap">
              <a href={FACEBOOK_LINK} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#1877F2] text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:bg-[#166fe5] transition transform hover:-translate-y-0.5">
                <Facebook size={22} /> Facebook Profile
              </a>
              <a href={`https://t.me/${TELEGRAM_HANDLE}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#229ED9] text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:bg-[#1f90c5] transition transform hover:-translate-y-0.5">
                <Send size={22} /> Telegram Help
              </a>
           </div>
        </div>
      </div>
    </div>
  );
};

// Booking Page Component
const BookingPage = () => {
  const { id } = useParams();
  
  const navigate = useNavigate();
  // Finding massage from URL params usually needs more setup, let's grab it from pathname for simplicity if params fail
  const massageId = id || window.location.hash.split('/').pop();
  const massage = MASSAGES.find(m => m.id === massageId);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    city: '',
    gender: 'Female' as 'Female' | 'Male', // Therapist gender
    referral: '',
    utr: '',
  });
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!massage) return <div className="p-10 text-center text-2xl font-bold text-red-500">Massage not found</div>;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setScreenshot(ev.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Calculations
  const hasReferral = formData.referral.trim().length > 0;
  const discountAmount = hasReferral ? massage.price * 0.30 : 0;
  const totalAfterDiscount = massage.price - discountAmount;
  const advanceAmount = 500;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      window.scrollTo(0,0);
    } else {
      if (!formData.utr || !screenshot) {
        alert("Please enter UTR and upload screenshot");
        return;
      }
      setLoading(true);
      const booking: Booking = {
        id: Date.now().toString(),
        customerName: formData.name,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        massageId: massage.id,
        city: formData.city,
        therapistGender: formData.gender,
        referralApplied: hasReferral,
        totalAmount: totalAfterDiscount,
        advancePaid: advanceAmount,
        utrNumber: formData.utr,
        paymentScreenshot: screenshot,
        status: 'Pending',
        timestamp: Date.now()
      };

      const success = await saveBooking(booking);
      setLoading(false);
      if (success) {
        alert("Booking Submitted Successfully! Wait for confirmation.");
        navigate('/my-bookings'); // Redirect to Customer Bookings
      } else {
        alert("Error saving booking. Try again.");
      }
    }
  };

  const selectedCityAddress = CITIES.find(c => c.name === formData.city)?.address || "Address will be shared after booking";

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
      <div className="w-full max-w-3xl bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/50">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 px-8 py-6 flex justify-between items-center text-white">
          <div>
            <h2 className="text-2xl font-bold">{massage.name}</h2>
            <p className="text-purple-100 text-sm opacity-90">Complete your reservation</p>
          </div>
          <span className="bg-white/20 backdrop-blur px-4 py-1.5 rounded-full text-sm font-semibold border border-white/30">Step {step} of 2</span>
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-10">
          {step === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full border-2 border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="Your Name" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full border-2 border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="10-digit mobile" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Date</label>
                  <input required type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full border-2 border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all bg-gray-50 focus:bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Time</label>
                  <input required type="time" name="time" value={formData.time} onChange={handleInputChange} className="w-full border-2 border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all bg-gray-50 focus:bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">City (Rajasthan)</label>
                  <select required name="city" value={formData.city} onChange={handleInputChange} className="w-full border-2 border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all bg-gray-50 focus:bg-white">
                    <option value="">Select City</option>
                    {CITIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Therapist Preference</label>
                  <div className="mt-2 flex space-x-4">
                    <label className="inline-flex items-center cursor-pointer p-3 border border-pink-200 rounded-lg hover:bg-pink-50 transition-colors w-1/2">
                      <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleInputChange} className="form-radio text-pink-600 focus:ring-pink-500 h-5 w-5" />
                      <span className="ml-2 font-medium text-gray-700">Female</span>
                    </label>
                    <label className="inline-flex items-center cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-1/2">
                      <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleInputChange} className="form-radio text-gray-600 focus:ring-gray-500 h-5 w-5" />
                      <span className="ml-2 font-medium text-gray-700">Male</span>
                    </label>
                  </div>
                </div>
              </div>

              {formData.city && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl flex items-start gap-4 border border-blue-100 shadow-sm">
                  <div className="bg-white p-2 rounded-full shadow-sm text-blue-500">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-800">Center Location</h4>
                    <p className="text-blue-600 text-sm mt-1">{selectedCityAddress}</p>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Referral Code (Optional)</label>
                <div className="relative rounded-xl shadow-sm">
                   <input type="text" name="referral" value={formData.referral} onChange={handleInputChange} className="block w-full border-2 border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all" placeholder="Enter code for 30% OFF" />
                   {hasReferral && <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                     <span className="text-green-600 font-bold text-sm bg-green-100 px-2 py-1 rounded">30% OFF APPLIED</span>
                   </div>}
                </div>
              </div>

              {/* Price Summary */}
              <div className="bg-gray-50 p-6 rounded-2xl space-y-3 border border-gray-200 shadow-inner">
                <div className="flex justify-between text-gray-600">
                   <span>Base Price</span>
                   <span>₹{massage.price}</span>
                </div>
                {hasReferral && (
                  <div className="flex justify-between text-green-600 font-medium">
                     <span>Referral Discount (30%)</span>
                     <span>- ₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-xl text-gray-900 border-t border-gray-200 pt-3 mt-2">
                   <span>Total Payable</span>
                   <span className="text-pink-600">₹{totalAfterDiscount}</span>
                </div>
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform transition hover:-translate-y-1 text-lg">
                Proceed to Payment
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center space-y-2">
                 <h3 className="text-2xl font-bold text-gray-800">Confirm Your Booking</h3>
                 <p className="text-gray-600">Pay Advance <span className="font-bold text-pink-600">₹{advanceAmount}</span> to confirm slot</p>
              </div>

              <div className="bg-white border-2 border-pink-100 rounded-2xl p-8 flex flex-col items-center shadow-lg relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                 <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${UPI_ID}&pn=PriyankaSpa&am=${advanceAmount}&cu=INR`} alt="Payment QR" className="w-48 h-48 mb-6 border-4 border-white shadow-md rounded-xl" />
                 <p className="font-mono bg-gray-50 px-6 py-2 rounded-lg text-lg select-all border border-gray-200 text-gray-700 mb-6">{UPI_ID}</p>
                 <div className="flex gap-3 w-full max-w-sm">
                    <a href={`upi://pay?pa=${UPI_ID}&pn=PriyankaSpa&am=${advanceAmount}&cu=INR`} className="flex-1 bg-indigo-600 text-white text-center py-2.5 rounded-lg hover:bg-indigo-700 font-medium shadow transition">PhonePe</a>
                    <a href={`upi://pay?pa=${UPI_ID}&pn=PriyankaSpa&am=${advanceAmount}&cu=INR`} className="flex-1 bg-blue-600 text-white text-center py-2.5 rounded-lg hover:bg-blue-700 font-medium shadow transition">GPay</a>
                    <a href={`upi://pay?pa=${UPI_ID}&pn=PriyankaSpa&am=${advanceAmount}&cu=INR`} className="flex-1 bg-sky-500 text-white text-center py-2.5 rounded-lg hover:bg-sky-600 font-medium shadow transition">Paytm</a>
                 </div>
              </div>

              <div className="space-y-5">
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Enter UTR / Transaction ID (Required)</label>
                    <input required type="text" name="utr" value={formData.utr} onChange={handleInputChange} className="w-full border-2 border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none" placeholder="e.g., 3456789012" />
                 </div>
                 
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Upload Payment Screenshot</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:bg-pink-50 hover:border-pink-300 cursor-pointer relative transition-colors bg-white">
                       <input type="file" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
                       <div className="space-y-1 text-center">
                          {screenshot ? (
                            <div className="flex flex-col items-center animate-bounce-in">
                               <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                               <span className="text-green-600 font-medium mt-2">Screenshot Uploaded!</span>
                            </div>
                          ) : (
                            <>
                              <Upload className="mx-auto h-12 w-12 text-gray-400" />
                              <div className="flex text-sm text-gray-600 mt-2">
                                <span className="font-semibold text-pink-600">Click to upload</span>
                              </div>
                            </>
                          )}
                       </div>
                    </div>
                 </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setStep(1)} className="w-1/3 bg-gray-100 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-200 transition">Back</button>
                <button disabled={loading} type="submit" className="w-2/3 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex justify-center items-center">
                   {loading ? "Verifying Payment..." : "Submit & Confirm Booking"}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

// Customer View - Status Only
const CustomerBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  
  useEffect(() => {
    getBookings().then(setBookings);
  }, []);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
       <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-8 text-gray-800 drop-shadow-sm">My Bookings Status</h2>
          
          <div className="bg-white/90 backdrop-blur-md shadow-xl overflow-hidden sm:rounded-2xl border border-white/50">
             <ul className="divide-y divide-gray-100">
                {bookings.length === 0 ? (
                  <li className="p-12 text-center text-gray-500 text-lg">You haven't made any bookings yet.</li>
                ) : (
                  bookings.map((booking) => (
                    <li key={booking.id} className="p-6 hover:bg-purple-50 transition-colors">
                       <div className="flex items-center justify-between flex-wrap gap-6">
                          <div>
                             <p className="text-xs font-bold uppercase tracking-wide text-pink-500 mb-1">{booking.date} • {booking.time}</p>
                             <p className="text-xl font-bold text-gray-900">{booking.massageId}</p>
                             <p className="text-gray-600">{booking.customerName}</p>
                          </div>
                          <div className="text-right bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                             <span className={`px-4 py-1.5 inline-flex text-xs leading-5 font-bold rounded-full uppercase tracking-wider ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {booking.status}
                             </span>
                             <p className="mt-2 text-xs text-gray-500">Booked on: {new Date(booking.timestamp).toLocaleDateString()}</p>
                          </div>
                       </div>
                    </li>
                  ))
                )}
             </ul>
          </div>
       </div>
    </div>
  );
};

// Admin View - Password Protected & Full Control
const AdminDashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);
  
  useEffect(() => {
    if (isAuthenticated) {
      getBookings().then(setBookings);
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'meena@951') {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect Password!");
    }
  };

  const handleApprove = async (id: string) => {
    const success = await updateBookingStatus(id, 'Confirmed');
    if (success) {
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'Confirmed' } : b));
      alert("Booking Approved!");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full border border-pink-100">
          <div className="text-center mb-6">
            <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="text-pink-600 w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>
            <p className="text-gray-500">Enter password to manage bookings</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all"
              placeholder="Enter Password"
            />
            <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 rounded-xl shadow-lg">
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
       <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
             <h2 className="text-3xl font-extrabold text-gray-800 drop-shadow-sm">Admin Dashboard</h2>
             <button onClick={() => setIsAuthenticated(false)} className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-gray-700 font-medium">Logout</button>
          </div>
          
          <div className="bg-white/90 backdrop-blur-md shadow-xl overflow-hidden sm:rounded-2xl border border-white/50">
             <ul className="divide-y divide-gray-100">
                {bookings.length === 0 ? (
                  <li className="p-12 text-center text-gray-500 text-lg">No bookings found in database.</li>
                ) : (
                  bookings.map((booking) => (
                    <li key={booking.id} className="p-6 hover:bg-purple-50 transition-colors">
                       <div className="flex items-center justify-between flex-wrap gap-6">
                          <div>
                             <div className="flex items-center gap-2 mb-1">
                                <span className={`w-2.5 h-2.5 rounded-full ${booking.status === 'Confirmed' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                                <p className="text-xs font-bold uppercase tracking-wide text-pink-500">{booking.date} • {booking.time}</p>
                             </div>
                             <p className="text-xl font-bold text-gray-900">{booking.massageId}</p>
                             <p className="text-gray-600 font-medium">{booking.customerName}</p>
                             <p className="text-gray-500 text-sm">{booking.phone} • {booking.city}</p>
                             <div className="flex items-center gap-2 mt-2">
                               <span className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-600">Pref: {booking.therapistGender}</span>
                               <span className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-600 font-mono">UTR: {booking.utrNumber}</span>
                             </div>
                          </div>
                          
                          <div className="flex flex-col items-end gap-3">
                             <div className="text-right">
                                <p className="text-sm font-medium text-gray-600">Paid: <span className="text-green-600 font-bold">₹{booking.advancePaid}</span></p>
                                <p className="text-sm font-medium text-gray-600">Due: <span className="text-red-500 font-bold">₹{booking.totalAmount - booking.advancePaid}</span></p>
                             </div>
                             
                             <div className="flex gap-2">
                               {booking.paymentScreenshot && (
                                 <button 
                                   onClick={() => setSelectedScreenshot(booking.paymentScreenshot!)}
                                   className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-200 transition-colors text-sm font-semibold"
                                 >
                                   <Eye size={16} /> View Proof
                                 </button>
                               )}
                               
                               {booking.status === 'Pending' ? (
                                 <button 
                                   onClick={() => handleApprove(booking.id)}
                                   className="flex items-center gap-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 shadow-md transition-all text-sm font-bold"
                                 >
                                   <Check size={16} /> Approve
                                 </button>
                               ) : (
                                 <span className="flex items-center gap-1 bg-green-100 text-green-800 px-4 py-2 rounded-lg font-bold text-sm border border-green-200">
                                   <CheckCircle size={16} /> Confirmed
                                 </span>
                               )}
                             </div>
                          </div>
                       </div>
                    </li>
                  ))
                )}
             </ul>
          </div>
       </div>

       {/* Screenshot Modal */}
       {selectedScreenshot && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setSelectedScreenshot(null)}>
           <div className="relative max-w-lg w-full bg-white p-2 rounded-2xl shadow-2xl animate-fade-in-up" onClick={e => e.stopPropagation()}>
             <button 
               onClick={() => setSelectedScreenshot(null)}
               className="absolute -top-4 -right-4 bg-white text-gray-900 p-2 rounded-full shadow-lg hover:bg-gray-100"
             >
               <X size={20} />
             </button>
             <img src={selectedScreenshot} alt="Payment Proof" className="w-full rounded-xl" />
             <div className="text-center p-4">
                <p className="font-bold text-gray-700">Payment Screenshot</p>
             </div>
           </div>
         </div>
       )}
    </div>
  );
};

// Main App Layout
const Layout = () => {
  const [showSupport, setShowSupport] = useState(false);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookingPage />} />
        <Route path="/my-bookings" element={<CustomerBookings />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      {/* Persistent Chat Support Button */}
      <div className="fixed bottom-6 right-6 z-50">
         {!showSupport ? (
           <button 
             onClick={() => setShowSupport(true)}
             className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 animate-bounce border-2 border-white"
           >
             <MessageCircle size={28} />
             <span className="font-bold hidden md:inline">Chat With Riya</span>
           </button>
         ) : (
           <ChatSupport onClose={() => setShowSupport(false)} />
         )}
      </div>
    </>
  );
};

export default function App() {
  return (
    <HashRouter>
      <Layout />
    </HashRouter>
  );
              }
