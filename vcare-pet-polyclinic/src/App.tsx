import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';

import Homepage from './pages/Homepage';
import Services from './pages/Services';
import VeterinaryConsultation from './pages/services/VeterinaryConsultation';
import Grooming from './pages/services/Grooming';
import PetFoodDelivery from './pages/services/PetFoodDelivery';
import Diagnostics from './pages/services/Diagnostics';
import Surgery from './pages/services/Surgery';
import EmergencyCare from './pages/services/EmergencyCare';
import Clinics from './pages/Clinics';
import ClinicDetail from './pages/ClinicDetail';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import BookAppointment from './pages/BookAppointment';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import Contact from './pages/Contact';
import WellnessPlans from './pages/WellnessPlans';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AccountDashboard from './pages/account/Dashboard';
import MyPets from './pages/account/MyPets';
import Appointments from './pages/account/Appointments';
import Orders from './pages/account/Orders';
import MedicalRecords from './pages/account/MedicalRecords';
import AccountSettings from './pages/account/Settings';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import RefundPolicy from './pages/RefundPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import FAQ from './pages/FAQ';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Homepage />} />

              <Route path="/services" element={<Services />} />
              <Route path="/services/veterinary-consultation" element={<VeterinaryConsultation />} />
              <Route path="/services/grooming" element={<Grooming />} />
              <Route path="/services/pet-food-delivery" element={<PetFoodDelivery />} />
              <Route path="/services/diagnostics" element={<Diagnostics />} />
              <Route path="/services/surgery" element={<Surgery />} />
              <Route path="/services/emergency-care" element={<EmergencyCare />} />

              <Route path="/clinics" element={<Clinics />} />
              <Route path="/clinics/:city/:clinicSlug" element={<ClinicDetail />} />

              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/product/:productId" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />

              <Route path="/book-appointment" element={<BookAppointment />} />

              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />

              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/wellness-plans" element={<WellnessPlans />} />

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              <Route path="/account/dashboard" element={<AccountDashboard />} />
              <Route path="/account/pets" element={<MyPets />} />
              <Route path="/account/appointments" element={<Appointments />} />
              <Route path="/account/orders" element={<Orders />} />
              <Route path="/account/medical-records" element={<MedicalRecords />} />
              <Route path="/account/settings" element={<AccountSettings />} />

              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/shipping-policy" element={<ShippingPolicy />} />
              <Route path="/faq" element={<FAQ />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
