import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, MapPin, Search, ShoppingCart, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [showClinicsDropdown, setShowClinicsDropdown] = useState(false);
  const { user, signOut } = useAuth();

  const cities = [
    'Gurgaon', 'Delhi', 'Noida', 'Ghaziabad', 'Mumbai', 'Thane',
    'Bengaluru', 'Pune', 'Kolkata', 'Hyderabad'
  ];

  const services = [
    { name: 'Veterinary Consultation', path: '/services/veterinary-consultation' },
    { name: 'Grooming', path: '/services/grooming' },
    { name: 'Pet Food Delivery', path: '/services/pet-food-delivery' },
    { name: 'Diagnostics', path: '/services/diagnostics' },
    { name: 'Surgery', path: '/services/surgery' },
    { name: 'Emergency Care', path: '/services/emergency-care' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">V</span>
            </div>
            <span className="text-2xl font-bold text-text-primary hidden md:block">
              V-Care Pet Polyclinic
            </span>
            <span className="text-xl font-bold text-text-primary md:hidden">
              V-Care
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            <div
              className="relative"
              onMouseEnter={() => setShowServicesDropdown(true)}
              onMouseLeave={() => setShowServicesDropdown(false)}
            >
              <button className="flex items-center space-x-1 text-text-primary hover:text-primary transition">
                <span className="font-medium">Services</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {showServicesDropdown && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-xl rounded-lg py-2 border border-gray-100">
                  {services.map((service) => (
                    <Link
                      key={service.path}
                      to={service.path}
                      className="block px-4 py-3 hover:bg-gray-50 text-text-secondary hover:text-primary transition"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div
              className="relative"
              onMouseEnter={() => setShowClinicsDropdown(true)}
              onMouseLeave={() => setShowClinicsDropdown(false)}
            >
              <button className="flex items-center space-x-1 text-text-primary hover:text-primary transition">
                <span className="font-medium">Clinics</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {showClinicsDropdown && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-xl rounded-lg py-2 border border-gray-100 max-h-96 overflow-y-auto">
                  {cities.map((city) => (
                    <Link
                      key={city}
                      to={`/clinics?city=${city.toLowerCase()}`}
                      className="block px-4 py-3 hover:bg-gray-50 text-text-secondary hover:text-primary transition"
                    >
                      {city}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/shop" className="text-text-primary hover:text-primary transition font-medium">
              Shop
            </Link>
            <Link to="/about" className="text-text-primary hover:text-primary transition font-medium">
              About Us
            </Link>
            <Link to="/blog" className="text-text-primary hover:text-primary transition font-medium">
              Blog
            </Link>
            <Link to="/contact" className="text-text-primary hover:text-primary transition font-medium">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="hidden md:flex items-center space-x-2 text-text-secondary hover:text-primary transition">
              <MapPin className="w-5 h-5" />
              <span className="text-sm font-medium">Select City</span>
            </button>

            <button className="p-2 hover:bg-gray-100 rounded-full transition">
              <Search className="w-5 h-5 text-text-secondary" />
            </button>

            <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full transition relative">
              <ShoppingCart className="w-5 h-5 text-text-secondary" />
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>
            </Link>

            {user ? (
              <div className="relative group">
                <button className="p-2 hover:bg-gray-100 rounded-full transition">
                  <User className="w-5 h-5 text-text-secondary" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-lg py-2 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link to="/account/dashboard" className="block px-4 py-2 hover:bg-gray-50 text-text-secondary hover:text-primary">
                    Dashboard
                  </Link>
                  <Link to="/account/pets" className="block px-4 py-2 hover:bg-gray-50 text-text-secondary hover:text-primary">
                    My Pets
                  </Link>
                  <Link to="/account/appointments" className="block px-4 py-2 hover:bg-gray-50 text-text-secondary hover:text-primary">
                    Appointments
                  </Link>
                  <Link to="/account/orders" className="block px-4 py-2 hover:bg-gray-50 text-text-secondary hover:text-primary">
                    Orders
                  </Link>
                  <button
                    onClick={signOut}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-text-secondary hover:text-primary"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="hidden md:block btn-primary text-sm">
                Login
              </Link>
            )}

            <Link to="/book-appointment" className="hidden lg:block btn-primary">
              Book Appointment
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link to="/services" className="text-text-primary hover:text-primary transition font-medium">
                Services
              </Link>
              <Link to="/clinics" className="text-text-primary hover:text-primary transition font-medium">
                Clinics
              </Link>
              <Link to="/shop" className="text-text-primary hover:text-primary transition font-medium">
                Shop
              </Link>
              <Link to="/about" className="text-text-primary hover:text-primary transition font-medium">
                About Us
              </Link>
              <Link to="/blog" className="text-text-primary hover:text-primary transition font-medium">
                Blog
              </Link>
              <Link to="/contact" className="text-text-primary hover:text-primary transition font-medium">
                Contact
              </Link>
              <Link to="/book-appointment" className="btn-primary inline-block text-center">
                Book Appointment
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
